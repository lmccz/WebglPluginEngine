import Game from "./game.js";


export default class TimeStep
{
    events = undefined;
    previousTime = 0;
    isRuning = false;

    constructor(game)
    {
        this.events = game.events;
        this.events.on(Game.START, this.start, this);
    }

    start()
    {
        if (this.isRuning) return false;
        this.isRuning = true;
        this.step();
    }

    step()
    {
        const delta = performance.now() - this.previousTime;

        this.events.emit(Game.PREUPDATE, this.previousTime, delta);
        this.events.emit(Game.UPDATE, this.previousTime, delta);
        this.events.emit(Game.POSTUPDATE, this.previousTime, delta);

        this.previousTime = performance.now();

        window.requestAnimationFrame(this.step.bind(this));
    }
}

