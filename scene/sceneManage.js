import Game from "../core/game.js";


export default class SceneManager
{
    static LOAD = 'load';
    static CREATE = 'create';
    static PREUPDATE = 'preupdate';
    static UPDATE = 'update';
    static POSTUPDATE = 'postupdate';

    game = undefined;
    scenes = [];

    constructor(game)
    {
        this.game = game;

        this.game.events.on(Game.BOOT, this.boot, this);
        this.game.events.on(Game.START, this.start, this);
        // this.game.events.on(Game.PREUPDATE, this.preUpdate, this);
        this.game.events.on(Game.UPDATE, this.update, this);
        this.game.events.on(Game.UPDATE, this.render, this);
    }

    boot()
    {
        this.game.config.scenes.forEach(scene =>
        {
            this.scenes.push(new scene(this.game));
        });

        this.game.events.emit(Game.INIT, this.scenes);

        // 省点内存?
        this.game.config.scenes = undefined;
    }

    start(key)
    {
        const scene = this.scenes.find(s => s.key === key);

        if (!scene) throw new Error('no has scene for key:', key);
        if (scene.init) scene.init();

        if (scene.preload)
        {
            scene.preload();
            scene.events.emit(SceneManager.LOAD);
            scene.events.once(SceneManager.CREATE, this.create, this);
            return;
        }

        this.create(key);
    }

    create(key)
    {
        const scene = this.scenes.find(s => s.key === key);

        if (!scene) throw new Error('no has scene for key:', key);
        if (scene.create) scene.create();

        scene.active = true;
    }

    update(time, delta)
    {
        for (let i = 0; i < this.scenes.length; i++)
        {
            if (this.scenes[i].active)
            {
                this.scenes[i].update(time, delta);
            }
        }
    }

    render()
    {
        for (let i = 0; i < this.scenes.length; i++)
        {
            if (this.scenes[i].active)
            {
                this.scenes[i].render(this.game.render.gl, this.game.render.basicShader);
            }
        }
    }
}