import UVInfo from "../utils/math/UVInfo.js";
import Vector2 from "../utils/math/vector2.js";


export default class Animations 
{
    game = undefined;

    constructor(game)
    {
        this.game = game;
    }

    spritesheet(config)
    {
        if (this.game.cache.has(config.key)) throw new Error('animsKey has:', config.key);

        const { texture, frameWidth, frameHeight } = config;
        const { width, height } = this.game.cache.get(texture);
        const frameCount = width / frameWidth >> 0;
        const frameUVs = [];

        let totalWidth = 0;
        let yValue = 0;

        for (let i = 0; i < frameCount; ++i)
        {
            totalWidth += frameWidth;

            if (totalWidth > width)
            {
                yValue++;
                totalWidth = 0;
            }

            const u = (i * frameWidth) / width;
            const v = (yValue * frameHeight) / height;
            const min = new Vector2(u, v);

            const uMax = ((i * frameWidth) + frameWidth) / width;
            const vMax = ((yValue * frameHeight) + frameHeight) / height;
            const max = new Vector2(uMax, vMax);

            frameUVs.push(new UVInfo(min, max));
        }

        this.game.events.emit('addcache', config.key, { ...config, frameUVs });
    }

}