import BaseScene from '@/scenes/BaseScene'
import { mergeLeft } from 'ramda'
import { EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'
import { MAP_KEY as START_MENU_SCENE } from '@/scenes/menus/StartMenuScene'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_FONT } from '@/utils/config'
import { centerHorizontallyInCanvas, centerHorizontallyInContainer } from '@/utils/position'

export const MAP_KEY = 'CreditsScene'

const TWEEN_SPEED = 1

export default class CreditsScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    preload () {
        super.preload()

        if (!this.textures.exists('nhb_logo')) {
            this.load.image('nhb_logo', 'assets/images/nhb_logo.png')
        }

        if (!this.textures.exists('phaser_logo')) {
            this.load.image('phaser_logo', 'assets/images/phaser_logo.png')
        }
    }

    create () {
        super.create()

        this.gameMusic.play()

        this.contentContainer = this._createContentContainer()

        // Now scroll the content
        this.tweens.timeScale = TWEEN_SPEED
        this.tweens.add({
            targets: this.contentContainer,
            y: -1200,
            ease: 'Power0',
            duration: 16000,
            delay: 100,
            onComplete: () => {
                setTimeout(() => this._exit(), 2500)
            },
        })

        // Events
        this.events.once(EVENT_INTERACT, this._exit, this)
    }

    _exit () {
        this.tweens.add({
            targets: this.gameMusic,
            volume: 0,
            duration: 2000,
            onComplete: () => {
                this.gameMusic.stop()
                this.scene.start(START_MENU_SCENE)
            },
        })
    }

    _createContentContainer () {
        const contentContainer = this.add.container(0, 0)
        contentContainer.width = CANVAS_WIDTH / 1.5

        const padding = 80

        const contentItems = [
            { type: 'text', text: 'Idea by\nKiraCaelum & Nick Böcker' },
            { type: 'text', text: 'Game Development\nNick Böcker' },
            { type: 'text', text: '16x16 Dog\nby Elska\nhttps://elska.itch.io/16x16-dog' },
            { type: 'text', text: 'Dog bark sound effect\nby mixkit.co\nhttps://mixkit.co' },
            { type: 'text', text: 'Button sound effect\nby Royalty Free Sound FX\non YouTube' },
            { type: 'text', text: 'Music: "8 Bit Love"\nby HeatleyBros\nhttps://youtu.be/8_5m4Q4rL1Q' },
            { type: 'text', text: 'Powered by PhaserJS', padding: 20 },
            { type: 'image', spriteId: 'phaser_logo' },
            { type: 'image', spriteId: 'nhb_logo' },
        ]

        for (let i = 0; i < contentItems.length; i += 1) {
            const y = i === 0 ? 100 : contentItems[i - 1].element.getBottomCenter().y + (contentItems[i - 1]?.padding || padding)

            if (contentItems[i].type === 'text') {
                contentItems[i].element = this.add.text(0, y, contentItems[i].text, this._getTextStyle()).setResolution(10) // @TODO cpu
            } else if (contentItems[i].type === 'image') {
                contentItems[i].element = this.add.image(0, y, contentItems[i].spriteId)
                contentItems[i].element.setOrigin(0, 0)
                contentItems[i].element.setScale(0.5)
            }

            centerHorizontallyInContainer(contentItems[i].element, contentContainer)

            contentContainer.add(contentItems[i].element)
        }

        const headline = this.add.text(0, 0, 'CREDITS', mergeLeft({ fontSize: 30 }, this._getTextStyle())).setResolution(10)
        centerHorizontallyInContainer(headline, contentContainer)
        contentContainer.add(headline)

        contentContainer.setY(CANVAS_HEIGHT)
        centerHorizontallyInCanvas(contentContainer)

        return contentContainer
    }

    _getTextStyle () {
        return {
            fontSize: 16,
            lineSpacing: 20,
            fontFamily: DEFAULT_FONT,
            width: CANVAS_WIDTH / 1.5,
            align: 'center',
        }
    }
}
