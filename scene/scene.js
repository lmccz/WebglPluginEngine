export default class Scene
{
    game = undefined;
    key = '';
    active = false;
    events = undefined;
    children = [];

    constructor(game)
    {
        this.game = game;
    }

    update()
    {

    }

    render(gl, shader)
    {
        for (let c of this.children)
        {
            // console.log(1)
            c.render(gl, shader, c.matrix);
        }
    }
}