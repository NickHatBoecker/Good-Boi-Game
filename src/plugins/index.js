import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js'
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js'
import TextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js'

import NhbControlsPlugin from './NhbControlsPlugin'

export default {
    global: [
        {
            key: 'rexOutlinePipeline',
            plugin: OutlinePipelinePlugin,
            start: true,
            mapping: 'outline',
        },
        {
            key: 'rexBBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true,
        },
        {
            key: 'rexTextTyping',
            plugin: TextTypingPlugin,
            start: true,
            mapping: 'textTyper',
        },
    ],

    scene: [
        {
            key: 'NHBControlsPlugin',
            plugin: NhbControlsPlugin,
            mapping: 'controls',
        },
    ],
}
