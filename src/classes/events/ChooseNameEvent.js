import { MAP_KEY as CHOOSE_NAME_SCENE } from '@/scenes/menus/ChooseNameScene'
import { MAP_KEY as GAME_SCENE } from '@/scenes/GameScene'
import { comprehensiveEventEmitter } from '@/utils/comprehensive-event-emitter'

export default class ChooseNameEvent {
    constructor (scene) {
        scene.scene.pause(GAME_SCENE)
        scene.scene.launch(CHOOSE_NAME_SCENE)

        comprehensiveEventEmitter.once('onNameChosen', (petName) => {
            // We have to get the right scene here, because gameScene cannot wake itself up
            const chooseNameScene = scene.game.scene.getScene(CHOOSE_NAME_SCENE)

            chooseNameScene.scene.run(GAME_SCENE, petName)
            chooseNameScene.scene.stop(CHOOSE_NAME_SCENE)
            // Do not emit 'doNextEvent' here. It will be emitted in GameScene's create()
        })
    }
}
