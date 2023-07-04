import Vector2 from "./vector2.js";


export default class Vector3
{
    x = 0;
    y = 0;
    z = 0;

    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static get zero()
    {
        return new Vector3();
    }

    static get one()
    {
        return new Vector3(1, 1, 1);
    }

    static distance(a, b)
    {
        const diff = a.subtract(b);
        return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
    }

    set(x, y, z)
    {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
        if (z !== undefined) this.z = z;
    }

    equals(v)
    {
        return (this.x === v.x && this.y === v.y && this.z === v.z);
    }

    toArray()
    {
        return [this.x, this.y, this.z];
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toArray());
    }

    copyFrom(vector)
    {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }

    setFromJson(json)
    {
        if (json.x !== undefined) this.x = Number(json.x);
        if (json.y !== undefined) this.y = Number(json.y);
        if (json.z !== undefined) this.z = Number(json.z);
    }

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    subtract(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    multiply(v) 
    {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    divide(v) 
    {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }

    clone() 
    {
        return new Vector3(this.x, this.y, this.z);
    }

    toVector2()
    {
        return new Vector2(this.x, this.y);
    }
}