import Phaser from 'phaser'

export default class Dog {
    constructor () {
        const dogPath = 'assets/images/animals/dog'

        this.spriteSheets = [
            { id: 'animal_idle', path: `${dogPath}/Dog_Pose_Idle_sw.png` },
            { id: 'animal_run', path: `${dogPath}/Dog_Run_sw.png` },
            { id: 'animal_sit_idle', path: `${dogPath}/Dog_Sit_Idle.png` },
            { id: 'animal_stand_idle', path: `${dogPath}/Dog_Stand_Idle.png` },
        ]
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
