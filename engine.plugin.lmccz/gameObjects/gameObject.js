import { AttributeInfo, GLBuffer } from "../renderer/glBuffer.js";
import Vertex from "../utils/math/vertex.js";
import Color from "../utils/display/color.js";
import Matrix4 from "../utils/math/matrix4.js";
import Transform from "../utils/math/transform.js";
import Vector3 from "../utils/math/vector3.js";


export default class GameObject
{
    name = '';
    width = 10;
    height = 10;
    matrix = Matrix4.identity();
    transform = new Transform();
    tint = new Color(255, 255, 255, 255);

    _depth = 0;
    _alpha = 1;
    _origin = new Vector3(0.5, 0.5, 0);

    active = true;
    visible = true;

    scene = undefined;
    buffer = undefined;
    texture = undefined;
    vertices = [];

    constructor(scene, x, y, z, texture)
    {
        this.scene = scene;

        this.transform.position.set(x, y, z);
        this.texture = this.scene.game.cache.get(texture);

        this.width = this.texture.width;
        this.height = this.texture.height;

        this.init();
    }

    init() 
    {
        this.buffer = new GLBuffer(this.scene.game.context);

        const positionArribute = new AttributeInfo();
        positionArribute.location = 0
        positionArribute.offset = 0;
        positionArribute.size = 3;
        this.buffer.addAttributeLocation(positionArribute);

        const texCoordArribute = new AttributeInfo();
        texCoordArribute.location = 1
        texCoordArribute.offset = 3;
        texCoordArribute.size = 2;
        this.buffer.addAttributeLocation(texCoordArribute);

        this.calculateVertices();
    }

    calculateVertices()
    {
        const minX = -(this.width * this._origin.x);
        const maxX = this.width * (1.0 - this._origin.x);

        const minY = -(this.height * this._origin.y);
        const maxY = this.height * (1.0 - this._origin.y);

        this.vertices = [
            // x,y,z   ,u, v
            new Vertex(minX, minY, 0, 0, 0),
            new Vertex(minX, maxY, 0, 0, 1.0),
            new Vertex(maxX, maxY, 0, 1.0, 1.0),

            new Vertex(maxX, maxY, 0, 1.0, 1.0),
            new Vertex(maxX, minY, 0, 1.0, 0),
            new Vertex(minX, minY, 0, 0, 0)
        ];

        for (let v of this.vertices)
        {
            this.buffer.pushBackData(v.toArray());
        }

        this.buffer.upload();
        this.buffer.unbind();
    }

    recalculateVertices()
    {
        const minX = -(this.width * this._origin.x);
        const maxX = this.width * (1.0 - this._origin.x);
        const minY = -(this.height * this._origin.y);
        const maxY = this.height * (1.0 - this._origin.y);

        this.vertices[0].position.set(minX, minY);
        this.vertices[1].position.set(minX, maxY);
        this.vertices[2].position.set(maxX, maxY);
        this.vertices[3].position.set(maxX, maxY);
        this.vertices[4].position.set(maxX, minY);
        this.vertices[5].position.set(minX, minY);

        this.buffer.clearData();

        this.vertices.forEach(v =>
        {
            this.buffer.pushBackData(v.toArray());
        });

        this.buffer.upload();
        this.buffer.unbind();
    }

    update(time, delta)
    {

    }

    render(gl, shader, model)
    {
        this.matrix = this.transform.getTransformationMatrix();

        // set uniform 
        const colorPosition = shader.getUniformLocation("u_tint");
        gl.uniform4fv(colorPosition, this.tint.toFloat32Array());

        const modelPosition = shader.getUniformLocation("u_model");
        gl.uniformMatrix4fv(modelPosition, false, model.toFloat32Array());

        this.texture.activateAndBind(0);
        const diffuseLocation = shader.getUniformLocation("u_diffuse");
        gl.uniform1i(diffuseLocation, 0);

        this.buffer.bind();
        this.buffer.draw();
    }

    get x()
    {
        return this.transform.position.x;
    }

    set x(value)
    {
        this.transform.position.x = value;
    }

    get y()
    {
        return this.transform.position.y;
    }

    set y(value)
    {
        this.transform.position.y = value;
    }
}