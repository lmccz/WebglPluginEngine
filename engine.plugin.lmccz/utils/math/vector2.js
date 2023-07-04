import Vector3 from "./vector3.js";


export default class Vector2
{
    x = 0;
    y = 0;

    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    static get zero() 
    {
        return new Vector2();
    }

    static get one() 
    {
        return new Vector2(1, 1);
    }

    static distance(a, b) 
    {
        let diff = a.clone().subtract(b);
        return Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    }

    copyFrom(v) 
    {
        this.x = v.x;
        this.y = v.y;
    }

    toArray() 
    {
        return [this.x, this.y];
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toArray());
    }

    toVector3() 
    {
        return new Vector3(this.x, this.y, 0);
    }

    set(x, y) 
    {
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
    }

    setFromJson(json) 
    {
        if (json.x !== undefined) this.x = Number(json.x);
        if (json.y !== undefined) this.y = Number(json.y);
    }

    add(v) 
    {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v)   
    {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(v)   
    {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    divide(v)   
    {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    scale(scale)  
    {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    clone() 
    {
        return new Vector2(this.x, this.y);
    }
}