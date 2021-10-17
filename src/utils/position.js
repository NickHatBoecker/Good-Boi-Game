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

/**
 * Center an element horizontally in a container.
 * Element has to have `displayWidth` attribute.
 *
 * @param element
 */
export const centerHorizontallyInContainer = (element, container) => {
    element.setX((container.displayWidth / 2) - (element.displayWidth / 2))
}
