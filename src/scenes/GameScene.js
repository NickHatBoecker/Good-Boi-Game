import BaseScene from '@/scenes/BaseScene'
import TyperTextBox from '@/classes/TyperTextBox'
import { CANVAS_WIDTH } from '@/utils/config'

export const MAP_KEY = 'GameScene'

export default class GameScene extends BaseScene {
    constructor () {
        super(MAP_KEY)
    }

    create () {
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
                    // @TODO spawn doggo
                })
            })
        })
    }
}
