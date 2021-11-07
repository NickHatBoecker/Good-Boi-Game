import { centerHorizontallyInCanvas } from '@/utils/position'

export default class AnimalSpawnEvent {
    constructor (scene, options) {
        if (typeof this.animal === 'undefined' || !this.animal) {
            scene.animal = scene.add.sprite(100, 100, options.spriteId, 0).setScale(10)
            scene.animal.play('animal_idle', false)

            centerHorizontallyInCanvas(scene.animal)

            setTimeout(() => {
                scene.sound.add('animal_sound').play()
            }, 800)
        }

        setTimeout(() => {
            scene.events.emit('doNextEvent')
        }, 500)
    }
}
