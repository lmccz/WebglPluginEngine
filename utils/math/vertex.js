import Vector2 from "./vector2.js";
import Vector3 from "./vector3.js";


export default class Vertex
{
    position = Vector3.zero;
    texCoords = Vector2.zero;

    constructor(x = 0, y = 0, z = 0, tu = 0, tv = 0)
    {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.texCoords.x = tu;
        this.texCoords.y = tv;
    }

    toArray() 
    {
        const array = [];

        // array = array.concat(this.position.toArray());
        // array = array.concat(this.texCoords.toArray());
        array.push(...this.position.toArray());
        array.push(...this.texCoords.toArray());

        return array;
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toArray());
    }
}