import Animations from "../animations/animations.js";
import Cache from "../cache/cache.js";
import GameObjectFactory from "../gameObjects/factory.js";
import Loader from "../loader/loader.js";
import WebGLRender from "../renderer/renderer.js";
import SceneManager from "../scene/sceneManage.js";
import EventEmitter from "../utils/eventEmitter/EventEmitter.js";
import TimeStep from "./timeStep.js";


export default class Plugins
{
    static Global = [
        { key: 'timeStep', plugin: TimeStep },
        { key: 'scenes', plugin: SceneManager },
        { key: 'cache', plugin: Cache },
        { key: 'render', plugin: WebGLRender },
        { key: 'anims', plugin: Animations },
    ];

    static Scene = [
        { key: 'events', plugin: EventEmitter },
        { key: 'load', plugin: Loader },
        { key: 'add', plugin: GameObjectFactory }
    ];

    static register(type = 'Scene', key, plugin)
    {
        Plugins[type].push({ key, plugin });
    }
}