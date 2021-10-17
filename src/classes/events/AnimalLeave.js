export default class AnimalLeave {
    constructor (scene) {
        if (typeof scene.animal !== 'undefined' && scene.animal) {
            scene.animal.play('animal_run', true)

            const timer = scene.time.addEvent({
                delay: 50,
                callback: () => {
                    scene.animal.setX(scene.animal.x + 4)
                    scene.animal.setAlpha(scene.animal.alpha - 0.02)

                    if (timer.repeatCount === 0) {
                        scene.animal.setAlpha(0)
                    }
                },
                repeat: 50,
            })

            setTimeout(() => {
                scene.events.emit('doNextEvent')
            }, 100)
        }
    }
}
