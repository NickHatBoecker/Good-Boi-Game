import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/utils/config'

/**
 * Center an element horizontally and vertically in canvas window.
 * Element has to have `height` and `width` attribute.
 *
 * @param element
 */
export const centerInCanvas = (element) => {
    element.setPosition(
        (CANVAS_WIDTH / 2) - (element.width / 2),
        (CANVAS_HEIGHT / 2) - (element.height / 2),
    )
}

/**
 * Center an element horizontally in canvas window.
 * Element has to have `height` and `width` attribute.
 *
 * @param element
 */
export const centerHorizontallyInCanvas = (element) => {
    element.setX((CANVAS_WIDTH / 2) - (element.width / 2))
}
