import EventEmitter from "../utils/eventEmitter/EventEmitter.js";
import InitConfig from "./init.js";
import Plugins from "./plugins.js";


export default class Game
{
    static BOOT = 'boot';
    static INIT = 'init';
    static START = 'start';

    static PREUPDATE = 'preupdate';
    static UPDATE = 'update';
    static POSTUPDATE = 'postupdate';

    config = Object.create(null);
    events = new EventEmitter;

    domContainer = undefined;
    canvas = [];
    context = undefined;

    constructor(config)
    {
        InitConfig(this, config);

        this.events.on(Game.INIT, this.initScenePlugin, this);

        this.initGlobalPlugin();
    }

    initGlobalPlugin()
    {
        Plugins.Global.forEach(e =>
        {
            this[e.key] = new e.plugin(this);
        });

        this.events.emit(Game.BOOT);
    }

    initScenePlugin(scenes)
    {
        scenes.forEach(scene =>
        {
            Plugins.Scene.forEach(e =>
            {
                scene[e.key] = new e.plugin(scene);
            });

            scene.events.emit(Game.INIT);
        });

        this.events.emit(Game.START, scenes[0].key);
    }
}