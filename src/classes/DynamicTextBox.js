import Phaser from 'phaser'
import { mergeLeft } from 'ramda'
import { DEFAULT_FONT, TILE_SIZE } from '@/utils/config'

const ID = 'dynamicBox'

export default class DynamicTextBox extends Phaser.GameObjects.Container {
    constructor ({ scene, x, y, width, text, textStyle, minHeight }) {
        super(scene, 0, 0, [])

        this.backgroundColor = 0x101010
        this.textPadding = 20
        this.textStyle = textStyle || {}

        // Init text first, so box can adapt to its height
        this._initText(width, text)

        let height = this.textElement.height + (this.textPadding * 2)
        if ((minHeight || null) && height < minHeight) {
            height = minHeight
        }

        this._initBox(height, width)
        this._alignText(width)

        // Add text after box, so its on the box
        this.add(this.textElement)

        this.setPosition(x, y)
        this.setSize(width, height)

        scene.add.existing(this)
    }

    _initBox (height, width) {
        const background = this.scene.add.rectangle(0, 0, width, height, this.backgroundColor).setOrigin(0, 0)
        this.add(background)

        // Init corners
        const topLeft = this._addSprite(0, 0, 0)
        const topRight = this._addSprite(width - TILE_SIZE, 0, 2)
        const bottomLeft = this._addSprite(0, height - TILE_SIZE, 6)
        const bottomRight = this._addSprite(width - TILE_SIZE, height - TILE_SIZE, 8)

        // Init middle parts

        // Init top middle
        this._addSprite(topLeft.getRightCenter().x, 0, 1, topRight.x - TILE_SIZE)

        // Init middle left
        this._addSprite(0, topLeft.getBottomCenter().y, 3, null, bottomLeft.y - TILE_SIZE)

        // Init middle right
        this._addSprite(topRight.x, topRight.getBottomCenter().y, 5, null, bottomRight.y - TILE_SIZE)

        // Init bottom middle
        this._addSprite(bottomLeft.getRightCenter().x, bottomLeft.y, 7, bottomRight.x - TILE_SIZE)
    }

    _addSprite (x, y, frame, width, height) {
        const sprite = this.scene.add.sprite(x, y, ID, frame).setOrigin(0, 0)

        if (typeof width !== 'undefined' && width !== null) {
            sprite.displayWidth = width
        }

        if (typeof height !== 'undefined' && height !== null) {
            sprite.displayHeight = height
        }

        this.add(sprite)

        return sprite
    }

    _initText (width, text) {
        const textWidth = width - (this.textPadding * 2)

        this.textElement = this.scene.add.text(this.textPadding, this.textPadding, text, this._getTextStyle(textWidth))
        this.textElement.setResolution(10) // @TODO high cpu
    }

    _alignText (width) {
        if (this._getTextStyle().align === 'left') return

        if (this._getTextStyle().align === 'center') {
            this.textElement.setX((width / 2) - (this.textElement.width / 2))
        }
    }

    _getTextStyle (width) {
        return mergeLeft(this.textStyle, {
            fontFamily: DEFAULT_FONT,
            fontSize: 18,
            lineSpacing: 10,
            wordWrap: { width },
            align: 'left',
        })
    }
}
