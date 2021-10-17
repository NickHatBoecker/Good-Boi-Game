import Phaser from 'phaser'
import FontLoader from '@/assets/fonts/FontLoader'
import { DEFAULT_FONT, TILE_SIZE } from '@/utils/config'

export default class BaseScene extends Phaser.Scene {
    constructor (key) {
        super({
            active: false,
            visible: false,
            key,
        })
    }

    preload () {
        this.load.addFile(new FontLoader(this.load, DEFAULT_FONT))

        // Preload dynamic box sprites
        if (!this.textures.exists('dynamicBox')) {
            this.load.spritesheet('dynamicBox', 'assets/images/window-frame.png', {
                frameWidth: TILE_SIZE,
                frameHeight: TILE_SIZE,
            })
        }
    }

    update () {
        this.controls.update()
    }
}
