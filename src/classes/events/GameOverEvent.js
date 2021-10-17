import { MAP_KEY as GAME_OVER_SCENE } from '@/scenes/GameOverScene'
import { wait } from '@/utils/utils'

export default class GameOverEvent {
    constructor (scene) {
        // Wait a little bit before starting game over scene
        setTimeout(async () => {
            scene.cameras.main.fadeOut(500, 0, 0, 0)
            await wait(1500)

            scene.scene.start(GAME_OVER_SCENE)
            scene.reset()
        }, 500)
    }
}
