import DynamicTextBox from '@/classes/DynamicTextBox'
import { CANVAS_HEIGHT } from '@/utils/config'
import { EVENT_INTERACT } from '@/plugins/NhbControlsPlugin'

export default class TyperTextBox extends DynamicTextBox {
    constructor (options) {
        super({ ...options, minHeight: 150 })

        // Set box to bottom of canvas
        this.y = CANVAS_HEIGHT - this.height

        this.typer = null

        this.scene.events.on(EVENT_INTERACT, this._onInteract, this)
    }

    _initText (width, text) {
        const textWidth = width - (this.textPadding * 2)

        this.textElement = this.scene.add.text(this.textPadding, this.textPadding, '', this._getTextStyle(textWidth))
        this.textElement.setResolution(10) // @TODO high cpu

        this.typer = this.scene.textTyper.add(this.textElement, { wrap: true })
        this.typer.once('complete', () => {
            this.textElement.animationHasFinished = true
        })
        this.typer.start(text, 35)
    }

    _onInteract () {
        if (!this.textElement.animationHasFinished) return

        this.scene.events.off(EVENT_INTERACT, this._onInteract, this)

        // We need this timeout, otherwise the scene is no longer available
        setTimeout(() => {
            this.scene.events.emit('onTextboxClose')
            this.destroy()
        }, 100)
    }
}
