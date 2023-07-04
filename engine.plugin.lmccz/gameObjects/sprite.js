import Vector2 from "../utils/math/vector2.js";
import GameObject from "./gameObject.js";


export default class Sprite extends GameObject
{
    frameHeight = 0;
    frameWidth = 0;
    frameUVs = [];
    repeat = -1;
    currentFrame = 0;
    currentTime = 0;
    frameTime = 16;
    isPlaying = true;

    constructor(scene, x, y, z, animKey)
    {
        const { texture, frameWidth, frameHeight, repeat, frameTime, frameUVs } = scene.game.cache.get(animKey);

        super(scene, x, y, z, texture);

        this.width = frameWidth;
        this.height = frameHeight;
        this.frameUVs = [...frameUVs];
        this.repeat = repeat;
        this.frameTime = frameTime;

        this.calculateVertices();
        this.preUpdate();
    }

    preUpdate(time, delta)
    {
        if (!this.isPlaying) return;

        this.currentTime += delta;

        if (this.currentTime < this.frameTime) return;

        this.currentTime = 0;

        this.currentFrame += 1;
        if (this.currentFrame >= this.frameUVs.length) this.currentFrame = 0;

        this.vertices[0].texCoords.copyFrom(this.frameUVs[this.currentFrame].min);
        this.vertices[1].texCoords = new Vector2(this.frameUVs[this.currentFrame].min.x, this.frameUVs[this.currentFrame].max.y);
        this.vertices[2].texCoords.copyFrom(this.frameUVs[this.currentFrame].max);
        this.vertices[3].texCoords.copyFrom(this.frameUVs[this.currentFrame].max);
        this.vertices[4].texCoords = new Vector2(this.frameUVs[this.currentFrame].max.x, this.frameUVs[this.currentFrame].min.y);
        this.vertices[5].texCoords.copyFrom(this.frameUVs[this.currentFrame].min);

        this.buffer.clearData();

        for (let i = 0; i < this.vertices.length; i++)
        {
            this.buffer.pushBackData(this.vertices[i].toArray());
        }

        this.buffer.upload();
        this.buffer.unbind();
    }
}