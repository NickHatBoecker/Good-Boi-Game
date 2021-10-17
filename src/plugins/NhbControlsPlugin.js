import Phaser from 'phaser'

export const EVENT_UP = 'CONTROL_UP'
export const EVENT_RIGHT = 'CONTROL_RIGHT'
export const EVENT_DOWN = 'CONTROL_DOWN'
export const EVENT_LEFT = 'CONTROL_LEFT'
export const EVENT_INTERACT = 'CONTROL_INTERACT'

export default class NhbControlsPlugin extends Phaser.Plugins.ScenePlugin {
    constructor (scene, pluginManager) {
        super(scene, pluginManager)

        this.keys = {
            up: ['UP', Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.W],
            right: ['RIGHT', Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.D],
            down: ['DOWN', Phaser.Input.Keyboard.KeyCodes.DOWN, Phaser.Input.Keyboard.KeyCodes.S],
            left: ['LEFT', Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.A],
            interact: [Phaser.Input.Keyboard.KeyCodes.ENTER, Phaser.Input.Keyboard.KeyCodes.SPACE],
        }

        // Prevent default browser behavior
        scene.input.keyboard.addCapture('ESC,SPACE,ENTER')
    }

    update () {
        this._emitKeyEvent({ keys: this.keys.up, eventName: EVENT_UP })
        this._emitKeyEvent({ keys: this.keys.right, eventName: EVENT_RIGHT })
        this._emitKeyEvent({ keys: this.keys.down, eventName: EVENT_DOWN })
        this._emitKeyEvent({ keys: this.keys.left, eventName: EVENT_LEFT })
        this._emitKeyEvent({ keys: this.keys.interact, eventName: EVENT_INTERACT })
    }

    _emitKeyEvent ({ keys, eventName }) {
        keys.forEach(key => {
            const keyObj = this.scene.input.keyboard.addKey(key)
            if (Phaser.Input.Keyboard.JustDown(keyObj)) {
                this.scene.events.emit(eventName, this.scene)
            }
        })
    }
}
