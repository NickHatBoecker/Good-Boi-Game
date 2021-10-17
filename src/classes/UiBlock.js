import { last } from 'ramda'

/**
 * Model from https://phasergames.com/ui-blocks-a-lightweight-alternate-to-containers/
 */
export default class UIBlock {
    constructor (scene, x, y) {
        this.scene = scene

        this.x = x
        this.y = y

        this._oldX = x
        this._oldY = y

        this.visible = true

        // Needs to be set by developer
        this.displayWidth = 0
        this.displayHeight = 0

        this.children = []
        this.childIndex = -1

        // Used to identify this as a UIBlock to another UIBlock
        this.isPosBlock = true
    }

    setX (value) {
        this._oldX = this.x
        this.x = value
        this.updatePositions()
    }

    setY (value) {
        this._oldY = this.y
        this.y = value
        this.updatePositions()
    }

    setPosition (x, y) {
        this.setX(x)
        this.setY(y)
    }

    getX () {
        return this.x
    }

    getY () {
        return this.y
    }

    add (child) {
        this.childIndex++

        child.childIndex = this.childIndex
        this.children.push(child)

        this.scene.add.existing(child)

        this.buildList()
    }

    buildList () {
        const length = this.children.length
        if (length > 1) {
            for (let i = 1; i < length; i++) {
                // Set the current child to the previous child's nextChild property
                this.children[i - 1].nextChild = this.children[i]
            }
        }
        this.children[length - 1].nextChild = null
    }

    getDisplayWidth () {
        return this.displayWidth
    }

    getDisplayHeight () {
        return this.displayHeight
    }

    setDisplayHeight (height) {
        this.displayHeight = height
    }

    setDisplayWidth (width) {
        this.displayWidth = width
    }

    setVisible (value) {
        if (this.visible !== value) {
            this.visible = value
            if (this.children.length > 0) {
                // Send the first child to the updateChildVisible function
                this.updateChildVisible(this.children[0], value)
            }
        }
    }

    getVisible () {
        return this.visible
    }

    updateChildVisible (child, visible) {
        child.visible = visible
        if (child.isPosBlock === true) {
            child.visible = visible
        }
        if (child.nextChild != null) {
            // If the child has a nextChild call this function recursively
            this.updateChildVisible(child.nextChild, visible)
        }
    }

    updateChildPos (child) {
        child.x = child.x - this._oldX + this.x
        child.y = child.y - this._oldY + this.y

        if (child.isPosBlock === true) {
            child.updatePositions()
        }

        if (child.nextChild != null) {
            // If the child has a nextChild call this function recursively
            this.updateChildPos(child.nextChild)
        }

        // Set the old values to the new
        this._oldX = this.x
        this._oldY = this.y
    }

    updatePositions () {
        if (this.children.length > 0) {
            // Send the first child to the updateChildPos function
            this.updateChildPos(this.children[0])
        }
    }

    getPosition () {
        return { x: this.getX(), y: this.getY() }
    }

    destroy () {
        this.children.forEach(child => child.destroy())
    }

    getAlpha () {
        const lastChild = last(this.children)

        if (typeof lastChild.getAlpha !== 'undefined') {
            return lastChild.getAlpha()
        }

        return lastChild.alpha
    }

    setAlpha (alpha) {
        this.children.forEach(child => {
            if (typeof child.setAlpha !== 'undefined') {
                child.setAlpha(alpha)
            } else {
                child.alpha = alpha
            }
        })
    }
}
