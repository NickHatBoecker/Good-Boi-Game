import BaseScene from '@/scenes/BaseScene'
import { EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'
import { MAP_KEY as START_MENU_SCENE } from '@/scenes/menus/StartMenuScene'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_FONT } from '@/utils/config'
import { centerInCanvas } from '@/utils/position'

export const MAP_KEY = 'GameOverScene'

export default class GameOverScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    create () {
        this.add.rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0x000000).setOrigin(0, 0)

        const text = this.add.text(200, 200, 'Thanks for playing!', {
            fontSize: 30,
            lineSpacing: 10,
            fontFamily: DEFAULT_FONT,
        }).setResolution(10)

        centerInCanvas(text)

        this.events.once(EVENT_INTERACT, () => {
            this.scene.start(START_MENU_SCENE)
        })
    }
}
