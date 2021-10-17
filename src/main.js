import Phaser from 'phaser'
import plugins from '@/plugins/index'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/utils/config'

import StartMenuScene from '@/scenes/menus/StartMenuScene'
import ChooseNameScene from '@/scenes/menus/ChooseNameScene'
import CreditsScene from '@/scenes/CreditsScene'
import GameScene from '@/scenes/GameScene'

const gameConfig = {
    title: 'Good boi',
    render: {
        pixelArt: true,
    },
    type: Phaser.AUTO,
    scene: [
        StartMenuScene,
        ChooseNameScene,
        CreditsScene,
        GameScene,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    backgroundColor: '#000',
    input: {
        gamepad: true,
    },
    plugins,
}

export const game = new Phaser.Game(gameConfig)
