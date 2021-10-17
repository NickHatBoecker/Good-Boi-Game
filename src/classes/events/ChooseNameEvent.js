import { MAP_KEY as CHOOSE_NAME_SCENE } from '@/scenes/menus/ChooseNameScene'
import { MAP_KEY as GAME_SCENE } from '@/scenes/GameScene'
import { comprehensiveEventEmitter } from '@/utils/comprehensive-event-emitter'

export default class ChooseNameEvent {
    constructor (scene) {
        scene.scene.sleep(GAME_SCENE)
        scene.scene.launch(CHOOSE_NAME_SCENE)

        comprehensiveEventEmitter.once('onNameChosen', () => {
            scene.scene.stop(CHOOSE_NAME_SCENE)
            scene.scene.run(GAME_SCENE)
            // Do not emit 'doNextEvent' here. It will be emitted in GameScene's create()
        })
    }
}
