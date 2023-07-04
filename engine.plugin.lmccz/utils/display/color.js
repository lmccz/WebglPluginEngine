export default class Color
{
    _r = 255;
    _g = 255;
    _b = 255;
    _a = 255;

    constructor(r = 255, g = 255, b = 255, a = 255)
    {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    get r()
    {
        return this._r;
    }

    get rFloat()
    {
        return this._r / 255.0;
    }

    set r(value)
    {
        this._r = value;
    }

    get g()
    {
        return this._g;
    }

    get gFloat()
    {
        return this._g / 255.0;
    }

    set g(value)
    {
        this._g = value;
    }

    get b()
    {
        return this._b;
    }

    get bFloat()
    {
        return this._b / 255.0;
    }

    set b(value)
    {
        this._b = value;
    }

    get a()
    {
        return this._r;
    }

    get aFloat()
    {
        return this._a / 255.0;
    }

    set a(value)
    {
        this._a = value;
    }

    setTo(r = 255, g = 255, b = 255, a = 255)
    {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    toArray()
    {
        return [this._r, this._g, this._b, this._a];
    }

    toFloatArray()
    {
        return [this._r / 255.0, this._g / 255.0, this._b / 255.0, this._a / 255.0];
    }

    toFloat32Array()
    {
        return new Float32Array(this.toFloatArray());
    }

    static white()
    {
        return new Color(255, 255, 255, 255);
    }

    static black()
    {
        return new Color(0, 0, 0, 255);
    }

    static red()
    {
        return new Color(255, 0, 0, 255);
    }

    static green()
    {
        return new Color(0, 255, 0, 255);
    }

    static blue()
    {
        return new Color(0, 0, 255, 255);
    }
}