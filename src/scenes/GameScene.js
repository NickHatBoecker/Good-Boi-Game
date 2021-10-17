import Phaser from 'phaser'
import BaseScene from '@/scenes/BaseScene'
import TyperTextBox from '@/classes/TyperTextBox'
import { CANVAS_WIDTH, TILE_SIZE } from '@/utils/config'
import { centerHorizontallyInCanvas } from '@/utils/position'
import { MAP_KEY as CHOOSE_NAME_SCENE } from '@/scenes/menus/ChooseNameScene'

export const MAP_KEY = 'GameScene'

export default class GameScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    preload () {
        super.preload()

        if (!this.textures.exists('dog_idle')) {
            const dogPath = 'assets/images/animals/dog'

            const spriteSheets = [
                { id: 'animal_idle', path: `${dogPath}/Dog_Pose_Idle_sw.png` },
                { id: 'animal_run', path: `${dogPath}/Dog_Run.png` },
                { id: 'animal_sit_idle', path: `${dogPath}/Dog_Sit_Idle.png` },
                { id: 'animal_stand_idle', path: `${dogPath}/Dog_Stand_Idle.png` },
            ]

            spriteSheets.forEach(({ id, path }) => {
                this.load.spritesheet(id, path, {
                    frameWidth: TILE_SIZE,
                    frameHeight: TILE_SIZE,
                })
            })
        }
    }

    create () {
        this._initAnimalAnimations()

        new TyperTextBox({
            scene: this,
            x: 0,
            y: 0,
            width: CANVAS_WIDTH,
            text: 'Well hello there and welcome to this pet store! I bet you want to adopt one of our adorable puppies, huh?',
        })

        this.events.once('onTextboxClose', () => {
            new TyperTextBox({
                scene: this,
                x: 0,
                y: 0,
                width: CANVAS_WIDTH,
                text: 'Dogs are a hooman\'s best friend. So you have to take good care of them. But I\'m pretty sure that you\'re just the right person to adopt a dog.',
            })

            this.events.once('onTextboxClose', () => {
                new TyperTextBox({
                    scene: this,
                    x: 0,
                    y: 0,
                    width: CANVAS_WIDTH,
                    text: 'Ready to meet your forever friend? Here they come!',
                })

                this.events.once('onTextboxClose', () => {
                    const animal = this.add.sprite(100, 100, 'animal_idle', 0).setScale(10)
                    animal.play('animal_idle', true)
                    centerHorizontallyInCanvas(animal)

                    setTimeout(() => {
                        new TyperTextBox({
                            scene: this,
                            x: 0,
                            y: 0,
                            width: CANVAS_WIDTH,
                            text: 'Look at him! Such a good boi, searching for a cozy place, he can call his home. Would you like to give him a name?',
                        })

                        this.events.once('onTextboxClose', () => {
                            this.scene.launch(CHOOSE_NAME_SCENE)
                        })
                    }, 1000)
                })
            })
        })
    }

    _initAnimalAnimations () {
        this.anims.create({
            key: 'animal_idle',
            frames: this.anims.generateFrameNumbers('animal_idle', { start: 0, end: 15 }),
            frameRate: 6,
            repeat: Phaser.FOREVER,
            yoyo: true, // Reverse on finish
        })
    }
}
