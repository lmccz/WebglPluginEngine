const LEVEL = 0;
const BORDER = 0;
const TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);


export default class Texture
{
    gl = undefined;

    _name = '';
    _handle = undefined;
    _width = 1;
    _height = 1;

    constructor(gl, name, asset)
    {
        this.gl = gl;
        this._name = name;
        this._handle = this.gl.createTexture();

        this.bind();
        this.gl.texImage2D(this.gl.TEXTURE_2D, LEVEL, this.gl.RGBA, 1, 1, BORDER, this.gl.RGBA, this.gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);

        this.loadTextureFromAsset(asset);
    }

    get name() 
    {
        return this._name;
    }

    get width() 
    {
        return this._width;
    }

    get height() 
    {
        return this._height;
    }

    destroy() 
    {
        this.gl.deleteTexture(this._handle);
        this.gl = undefined;
    }

    activateAndBind(textureUnit = 0) 
    {
        this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
        this.bind();
    }

    bind()
    {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._handle);
    }

    unbind() 
    {
        this.gl.bindTexture(this.gl.TEXTURE_2D, undefined);
    }

    loadTextureFromAsset(asset)
    {
        this._width = asset.width;
        this._height = asset.height;

        this.bind();

        this.gl.texImage2D(this.gl.TEXTURE_2D, LEVEL, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, asset);

        if (this.isPowerof2())
        {
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        }
        else
        {
            // Do not generate a mip map and clamp wrapping to edge.
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            // pixel art
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            // this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
    }

    isPowerof2()
    {
        return (this.isValuePowerOf2(this._width) && this.isValuePowerOf2(this.height));
    }

    isValuePowerOf2(value)
    {
        return (value & (value - 1)) == 0;
    }
}