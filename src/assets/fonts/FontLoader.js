import Phaser from 'phaser'
import WebFontLoader from 'webfontloader'

export default class FontLoader extends Phaser.Loader.File {
    /**
     * @param {Phaser.Loader.LoaderPlugin} loader
     * @param {string | string[]} fontNames
     */
    constructor (loader, fontNames) {
        super(loader, {
            type: 'webfont',
            key: fontNames.toString()
        })

        this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames]
    }

    load () {
        WebFontLoader.load({
            custom: {
                families: this.fontNames,
                urls: ['assets/fonts/fonts.css'],
            },
            active: () => {
                this.loader.nextFile(this, true)
            }
        })
    }
}
