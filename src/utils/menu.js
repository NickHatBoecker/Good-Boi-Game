export const getNextOrFirstIndex = (list, currentItemIndex) => {
    let index = currentItemIndex + 1
    if (list.length === index) {
        index = 0
    }

    return index
}

export const getNextOrReturnIndex = (list, currentItemIndex) => {
    const index = currentItemIndex + 1

    return (list.length === index) ? currentItemIndex : index
}

export const getPreviousOrLastIndex = (list, currentItemIndex) => {
    let index = currentItemIndex - 1
    if (index < 0) {
        index = (list.length - 1)
    }

    return index
}

export const getPreviousOrReturnIndex = (list, currentItemIndex) => {
    const index = currentItemIndex - 1

    return (index < 0) ? currentItemIndex : index
}

export const getPreviousOrLastItem = (list, currentItem) => {
    const currentIndex = list.findIndex(x => x === currentItem)
    const newIndex = getPreviousOrLastIndex(list, currentIndex)

    return list[newIndex]
}

export const updateOutline = (scene, list, currentItemIndex) => {
    // Reset all outlines first
    list.forEach(x => scene.plugins.get('rexOutlinePipeline').remove(x.element))

    const activeItem = list[currentItemIndex]
    if (!activeItem) return

    scene.plugins.get('rexOutlinePipeline').add(activeItem.element, {
        thickness: 6,
        outlineColor: 0xeeeeee,
    })
}
