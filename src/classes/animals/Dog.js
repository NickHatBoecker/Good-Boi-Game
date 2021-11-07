import Phaser from 'phaser'
import { TILE_SIZE } from '@/utils/config'

export default class Dog {
    preload (scene) {
        const dogPath = 'assets/images/animals/dog'

        const spriteSheets = [
            { id: 'animal_idle', path: `${dogPath}/Dog_Pose_Idle_sw.png` },
            { id: 'animal_run', path: `${dogPath}/Dog_Run_sw.png` },
        ]

        spriteSheets.forEach(({ id, path }) => {
            scene.load.spritesheet(id, path, {
                frameWidth: TILE_SIZE,
                frameHeight: TILE_SIZE,
            })
        })

        scene.load.audio('animal_sound', 'assets/audio/dog-bark.wav')
    }

    initAnimalAnimations (scene) {
        scene.anims.create({
            key: 'animal_idle',
            frames: scene.anims.generateFrameNumbers('animal_idle', { start: 0, end: 15 }),
            frameRate: 6,
            repeat: Phaser.FOREVER,
            yoyo: true, // Reverse on finish
        })

        scene.anims.create({
            key: 'animal_run',
            frames: scene.anims.generateFrameNumbers('animal_run', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: Phaser.FOREVER,
            yoyo: true, // Reverse on finish
        })
    }
}
