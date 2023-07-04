
import IntegerToColor from "../utils/display/IntegerToColor.js";
import Matrix4 from "../utils/math/matrix4.js";
import BasicShader from "./basicShader.js";
import Texture from "./texture.js";


export default class WebGLRender
{
    gl = undefined;
    game = undefined;

    constructor(game)
    {
        this.game = game;
        this.gl = game.context;

        const bc = IntegerToColor(game.config.backgroundColor).toFloatArray();
        this.gl.clearColor(bc[0], bc[1], bc[2], bc[3]);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.basicShader = new BasicShader(this.gl);
        this.basicShader.use();
        // 投影
        this.projection = Matrix4.orthographic(0, game.config.width, game.config.height, 0, -100.0, 100.0);

        this.game.events.on('preupdate', this.preRender, this);
        this.game.events.on('postupdate', this.postRender, this);
        this.game.events.on('createtexture', this.createTexture, this);
    }

    createTexture(name, asset)
    {
        const texture = new Texture(this.gl, name, asset);
        this.game.events.emit('addcache', name, texture);
    }

    preRender()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    postRender()
    {
        const projectionPosition = this.basicShader.getUniformLocation("u_projection");
        this.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this.projection.data));
    }
}