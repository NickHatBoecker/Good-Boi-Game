import BaseScene from '@/scenes/BaseScene'
import { propOr } from 'ramda'
import { TILE_SIZE } from '@/utils/config'
import { comprehensiveEventEmitter } from '@/utils/comprehensive-event-emitter'
import Dog from '@/classes/animals/Dog'

// Events
import TextboxEvent from '@/classes/events/TextboxEvent'
import ChooseNameEvent from '@/classes/events/ChooseNameEvent'
import AnimalSpawnEvent from '@/classes/events/AnimalSpawnEvent'
import GameOverEvent from '@/classes/events/GameOverEvent'
import AnimalLeave from '@/classes/events/AnimalLeave'

export const MAP_KEY = 'GameScene'

const DOG = new Dog()

export default class GameScene extends BaseScene {
    constructor () {
        super(MAP_KEY)

        this.currentEventIndex = null
    }

    preload () {
        super.preload()

        if (!this.textures.exists('dog_idle')) {
            DOG.spriteSheets.forEach(({ id, path }) => {
                this.load.spritesheet(id, path, {
                    frameWidth: TILE_SIZE,
                    frameHeight: TILE_SIZE,
                })
            })
        }

        if (typeof this.animalName === 'undefined' || !this.animalName) {
            this.animalName = ''
        }
    }

    create () {
        comprehensiveEventEmitter.once('onNameChosen', (petName) => {
            if (!petName) return

            this.animalName = petName
            this.events.emit('doNextEvent')
        })

        if (this.currentEventIndex !== null) return

        DOG.initAnimalAnimations(this)

        this._initGame()
    }

    reset () {
        this.currentEventIndex = null
        this.animal = null
        this.animalName = null
        this.nextEvent = null
        this.events.off('doNextEvent')
    }

    _initGame () {
        DOG.initAnimalAnimations(this)

        this.eventChain = [
            { type: 'textbox', options: { text: 'Well hello there and welcome to this pet store! I bet you want to adopt one of our adorable puppies, huh?' } },
            { type: 'textbox', options: { text: 'Dogs are a human\'s best friend. So you have to take good care of them. But I\'m pretty sure that you\'re just the right person to adopt a dog.' } },
            { type: 'textbox', options: { text: 'Ready to meet your forever friend? Here he comes.' } },
            { type: 'spawnAnimal', options: { spriteId: 'animal_idle' } },
            { type: 'textbox', options: { text: 'Look at him! Such a good boi, searching for a cozy place, he can call his home. Would you like to give him a name?' } },
            { type: 'chooseName', options: {} },
            { type: 'textbox', options: { text: '{ANIMAL_NAME}? What a lovely name! He\'s so happy to meet someone, who has some love to spare. Two souls - matching perfectly together.' } },
            { type: 'textbox', options: { text: 'But now you have to say goodbye to {ANIMAL_NAME}.' } },
            { type: 'textbox', options: { text: 'Because we found a nice family for him and they just arrived in time to bring him home.' } },
            { type: 'animalLeave', options: {} },
            { type: 'textbox', options: { text: 'Bye bye {ANIMAL_NAME}! We\'ll miss you.' } },
            { type: 'gameOver', options: {} },
        ]

        this._doEvent(this.eventChain[0])
    }

    _doEvent (event) {
        if (!event) {
            console.log('No event left')

            return
        }

        if (this.currentEventIndex === null) {
            this.currentEventIndex = 0
        } else {
            this.currentEventIndex = this.eventChain.findIndex(x => x === event)
        }

        if (this.currentEventIndex === -1) {
            return
        }

        this.nextEvent = propOr(null, (this.currentEventIndex + 1), this.eventChain)

        this._triggerEventByType(event.type, event.options)

        this.events.once('doNextEvent', () => {
            this._doEvent(this.nextEvent)
        })
    }

    _triggerEventByType (type, options) {
        switch (type) {
        case 'textbox':
            new TextboxEvent(this, { ...options, animalName: this.animalName })
            break
        case 'chooseName':
            new ChooseNameEvent(this)
            break
        case 'spawnAnimal':
            new AnimalSpawnEvent(this, options)
            break
        case 'gameOver':
            new GameOverEvent(this)
            break
        case 'animalLeave':
            new AnimalLeave(this)
            break
        default:
            console.error(`ERROR: Event type "${type}" is unknown.`)
            break
        }
    }
}
