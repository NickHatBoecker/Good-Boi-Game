import BaseScene from '@/scenes/BaseScene'
import { EVENT_UP, EVENT_DOWN, EVENT_LEFT, EVENT_RIGHT, EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'
import { MAP_KEY as GAME_SCENE } from '@/scenes/GameScene'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_FONT } from '@/utils/config'
import comprehensiveEventEmitter from '@/utils/comprehensive-event-emitter'

export const MAP_KEY = 'ChooseNameScene'

const DUMMY_CHAR = '_'
const MAX_NAME_LENGTH = 5

const CHAR_HIGHLIGHT_X_STEP = 52
const CHAR_HIGHLIGHT_Y_STEP = 64

export default class ChooseNameScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    preload () {
        super.preload()

        this.load.image('block', 'assets/images/chooseName/block.png')
        this.load.image('back', 'assets/images/chooseName/back.png')
        this.load.image('ok', 'assets/images/chooseName/ok.png')
    }

    create () {
        this.add.rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0x000000).setOrigin(0, 0)

        this.useUppercase = true
        this.charObjects = []
        this.charsPerRow = 10
        const charsPerColumn = 3
        const charSize = 48

        this.chars = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', '<-', 'ok'],
        ]
        this.cursor = { x: 0, y: 0 }

        this.inputChars = this._addChars()
        this.add.image(this.inputChars.x + ((this.charsPerRow - 3) * charSize), this.inputChars.y + (charsPerColumn * charSize), 'back')
        this.add.image(this.inputChars.x + ((this.charsPerRow - 2) * charSize), this.inputChars.y + (charsPerColumn * charSize), 'ok')

        this.petName = ''
        this.petNameText = this.add.text(this.inputChars.x, this.inputChars.y + 250, this._calculateElementText(), this._getTextStyle()).setTint(0xffffff).setResolution(10) // @TODO very CPU intensive
        this.charHighlight = this.add.image(this.inputChars.x - 10, this.inputChars.y, 'block').setOrigin(0)

        setTimeout(() => {
            // We need this timeout otherwise the ENTER from startMenuScene triggers an A here
            this.events.on(EVENT_UP, this._onUp, this)
            this.events.on(EVENT_RIGHT, this._onRight, this)
            this.events.on(EVENT_DOWN, this._onDown, this)
            this.events.on(EVENT_LEFT, this._onLeft, this)
            this.events.on(EVENT_INTERACT, this._onEnter, this)
        }, 500)

        this.events.once('shutdown', () => {
            this.events.off(EVENT_UP, this._onUp, this)
            this.events.off(EVENT_RIGHT, this._onRight, this)
            this.events.off(EVENT_DOWN, this._onDown, this)
            this.events.off(EVENT_LEFT, this._onLeft, this)
            this.events.off(EVENT_INTERACT, this._onInteract, this)
        })
    }

    /**
     * Because normal text (instead of BitmapText) does not support letter spacing
     * we have to work around it here
     *
     * @returns {Phaser.GameObjects.Container}
     * @private
     */
    _addChars () {
        this.charObjects = []
        const letterSpacingX = 22
        const letterSpacingY = 33

        let charString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (!this.useUppercase) {
            charString = 'abcdefghijklmnopqrstuvwxyz'
        }

        let letter
        let nextLetterX

        for (let i = 0; i < charString.length; i += 1) {
            const x = (letter && nextLetterX && (i % this.charsPerRow !== 0)) ? nextLetterX : 0

            let y = letter ? letter.y : 5
            const startNewLine = (i % this.charsPerRow) === 0
            if (letter && startNewLine) {
                y = letter.y + letter.height + letterSpacingY
            }

            letter = this.add.text(x, y, charString[i], this._getTextStyle())
            letter.setResolution(10) // @TODO very CPU intensive
            nextLetterX = letter.x + letter.width + letterSpacingX

            this.charObjects.push(letter)
        }

        return this.add.container(130, 50, this.charObjects)
    }

    _toggleUppercase () {
        this.useUppercase = !this.useUppercase

        this.charObjects.forEach((char, i) => {
            if (this.useUppercase) {
                this.charObjects[i].text = char.text.toUpperCase()
            } else {
                this.charObjects[i].text = char.text.toLowerCase()
            }
        })
    }

    _savePetName (petName) {
        comprehensiveEventEmitter.emit('onNameChosen', petName)
    }

    _getTextStyle () {
        return {
            fontSize: 30,
            lineSpacing: 10,
            fontFamily: DEFAULT_FONT,
        }
    }

    _onUp () {
        if (this.cursor.y <= 0) return

        this.cursor.y--
        this.charHighlight.y -= CHAR_HIGHLIGHT_Y_STEP
    }

    _onRight () {
        if (this.cursor.x >= 9 || (this.cursor.y === 2 && this.cursor.x >= 7)) return

        this.cursor.x++
        this.charHighlight.x += CHAR_HIGHLIGHT_X_STEP
    }

    _onDown () {
        if (this.cursor.y >= 2) return

        this.cursor.y++
        this.charHighlight.y += CHAR_HIGHLIGHT_Y_STEP

        if (this.cursor.y >= 2 && this.cursor.x > 7) {
            for (let i = 0; i < (this.cursor.x - 7); i += 1) { // eslint-disable-line
                this.charHighlight.x -= CHAR_HIGHLIGHT_X_STEP
            }
            this.cursor.x = 7
        }
    }

    _onLeft () {
        if (this.cursor.x <= 0) return

        this.cursor.x--
        this.charHighlight.x -= CHAR_HIGHLIGHT_X_STEP
    }

    _calculateElementText () {
        let text = this.petName

        for (let i = 0; i < MAX_NAME_LENGTH; i += 1) {
            if (typeof this.petName[i] === 'undefined') {
                text = text.concat(DUMMY_CHAR)
            }
        }

        return text
    }

    async _onEnter () {
        const isBack = this.cursor.x === 6 && this.cursor.y === 2
        const isOk = this.cursor.x === 7 && this.cursor.y === 2

        if (isOk) {
            if (this.petName.length > 0) {
                this._savePetName(this.petName)
                this.scene.start(GAME_SCENE)
            }
        } else if (isBack) {
            if (this.petName.length > 0) {
                if (this.petName.length === 1) {
                    this._toggleUppercase()
                }

                this.petName = this.petName.substr(0, this.petName.length - 1)
                this.petNameText.text = this._calculateElementText()
            }
        } else if (this.petName.length < MAX_NAME_LENGTH) {
            // Add
            let char = this.chars[this.cursor.y][this.cursor.x]
            if (!this.useUppercase) {
                char = char.toLowerCase()
            }

            if (this.petName.length === 0) {
                this._toggleUppercase()
            }

            this.petName = this.petName.concat(char)
            this.petNameText.text = this._calculateElementText()
        }
    }
}
