import TyperTextBox from '@/classes/TyperTextBox'
import { CANVAS_WIDTH } from '@/utils/config'

export default class TextboxEvent {
    constructor (scene, options) {
        new TyperTextBox({
            scene: scene,
            x: 0,
            y: 0,
            width: CANVAS_WIDTH,
            text: this._replaceTextVariables(options),
        })

        scene.events.once('onTextboxClose', () => {
            // @TODO play sound effect
            scene.events.emit('doNextEvent')
        })
    }

    _replaceTextVariables ({ text, animalName }) {
        let newText = text

        if (typeof animalName !== 'undefined' && animalName) {
            newText = text.replace('{ANIMAL_NAME}', animalName)
        }

        return newText
    }
}
