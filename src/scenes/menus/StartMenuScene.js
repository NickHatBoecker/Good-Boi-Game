import BaseScene from '@/scenes/BaseScene'
import DynamicTextBox from '@/classes/DynamicTextBox'
import { MAP_KEY as GAME_SCENE } from '@/scenes/GameScene'
import { MAP_KEY as CREDITS_SCENE } from '@/scenes/CreditsScene'
import { centerHorizontallyInCanvas } from '@/utils/position'
import { getNextOrReturnIndex, getPreviousOrReturnIndex, updateOutline } from '@/utils/menu'
import { EVENT_UP, EVENT_DOWN, EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'
import { CANVAS_HEIGHT } from '@/utils/config'

export const MAP_KEY = 'StartMenuScene'

export default class StartMenuScene extends BaseScene {
    constructor () {
        super(MAP_KEY)

        this.buttons = []
        this.activeButtonIndex = 0
    }

    create () {
        super.create()

        this.buttons = this._initButtons()
        updateOutline(this, this.buttons, this.activeButtonIndex)

        this._initControlInstruction()

        // Events
        this.events.on(EVENT_UP, this._selectPreviousButton, this)
        this.events.on(EVENT_DOWN, this._selectNextButton, this)
        this.events.once(EVENT_INTERACT, this._onInteract, this)

        this.events.once('shutdown', () => {
            this.events.off(EVENT_UP, this._selectPreviousButton, this)
            this.events.off(EVENT_UP, this._selectNextButton, this)
            this.events.off(EVENT_INTERACT, this._onInteract, this)
        })
    }

    _initControlInstruction () {
        const fontStyle = { fontSize: 8, fontFamily: 'PressStart2P', lineSpacing: 10 }
        const text = this.add.text(0, 0, 'CONTROLS:\nENTER: Interaction\nWASD/cursors: Navigation', fontStyle)
            .setResolution(10)
            .setAlign('center')
            .setAlpha(0.7)
        text.setY(CANVAS_HEIGHT - text.displayHeight - 20)

        centerHorizontallyInCanvas(text)
    }

    _onInteract () {
        this.clickSound.play()
        this.buttons[this.activeButtonIndex].onInteract.bind(this)()
    }

    _initButtons () {
        const textStyle = { fontSize: 20, align: 'center' }
        const startButton = new DynamicTextBox({
            scene: this,
            x: 0,
            y: 100,
            width: 350,
            text: 'START GAME',
            textStyle,
        })

        const creditsButton = new DynamicTextBox({
            scene: this,
            x: startButton.x,
            y: startButton.y + startButton.displayHeight + 30,
            width: startButton.width,
            text: 'CREDITS',
            textStyle,
        })

        centerHorizontallyInCanvas(startButton)
        centerHorizontallyInCanvas(creditsButton)

        return [
            { element: startButton, onInteract: this._onStart },
            { element: creditsButton, onInteract: this._onCredits },
        ]
    }

    _onStart () {
        this.scene.start(GAME_SCENE)
    }

    _onCredits () {
        this.scene.start(CREDITS_SCENE)
    }

    _selectPreviousButton () {
        this.clickSound.play()
        this.activeButtonIndex = getPreviousOrReturnIndex(this.buttons, this.activeButtonIndex)
        updateOutline(this, this.buttons, this.activeButtonIndex)
    }

    _selectNextButton () {
        this.clickSound.play()
        this.activeButtonIndex = getNextOrReturnIndex(this.buttons, this.activeButtonIndex)
        updateOutline(this, this.buttons, this.activeButtonIndex)
    }
}
