import GameObject from "./gameObject.js";
import Sprite from "./sprite.js";


class GameObjectFactory
{
    scene = undefined

    constructor(scene)
    {
        this.scene = scene;
    }

    static register(factoryType, factoryFunction)
    {
        GameObjectFactory.prototype[factoryType] = factoryFunction;
    }

    existing(obj)
    {
        this.scene.children.push(obj);
    }
}


GameObjectFactory.register('image', function (x, y, z, texture)  
{
    const image = new GameObject(this.scene, x, y, z, texture);

    this.existing(image);

    return image;
});


GameObjectFactory.register('sprite', function (x, y, z, animsKey)  
{
    const sprite = new Sprite(this.scene, x, y, z, animsKey);

    this.existing(sprite);

    return sprite;
});


export default GameObjectFactory;