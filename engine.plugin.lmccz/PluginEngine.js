import Game from "./core/game.js";
import EventEmitter from "./utils/eventEmitter/EventEmitter.js";
import Scene from "./scene/scene.js";


const PluginEngine = Object.create(null);


PluginEngine.Game = Game;
PluginEngine.Scene = Scene;
PluginEngine.EventEmitter = EventEmitter;


export default PluginEngine;