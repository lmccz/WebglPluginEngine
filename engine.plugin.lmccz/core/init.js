const InitConfig = (game, data) =>
{
    game.config.width = data.width || 320;
    game.config.height = data.height || 160;
    game.config.backgroundColor = data.backgroundColor
    game.config.fps = 60;
    game.config.scenes = data.scenes;

    const mainCanvas = document.createElement("canvas");
    document.body.appendChild(mainCanvas);
    game.canvas.push({ name: "main", canvas: mainCanvas });

    mainCanvas.width = game.config.width;
    mainCanvas.height = game.config.height;

    game.context = mainCanvas.getContext("webgl");
    if (!game.context)
    {
        game.context = mainCanvas.getContext("experimental-webgl");
        if (!game.context) throw new Error("Unable to initialize WebGL!");
    }
};


export default InitConfig;