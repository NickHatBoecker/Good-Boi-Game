import BaseScene from '@/scenes/BaseScene'
import { EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'
import { MAP_KEY as START_MENU_SCENE } from '@/scenes/menus/StartMenuScene'
import { DEFAULT_FONT } from '@/utils/config'

export const MAP_KEY = 'CreditsScene'

export default class CreditsScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    create () {
        // @TODO doggo credits - https://elska.itch.io/16x16-dog

        this.add.text(200, 200, '@TODO CREDITS', {
            fontSize: 30,
            lineSpacing: 10,
            fontFamily: DEFAULT_FONT,
        }).setResolution(10)

        this.events.once(EVENT_INTERACT, () => {
            this.scene.start(START_MENU_SCENE)
        })
    }
}
