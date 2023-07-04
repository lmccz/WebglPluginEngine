export default class Shader 
{
    gl = undefined;
    name = '';
    program = undefined;
    attributes = Object.create(null);  // 字典存储
    uniforms = Object.create(null);

    constructor(gl, name)
    {
        this.gl = gl;
        this.name = name;
    }

    load(vertexSource, fragmentSource)
    {
        const vertexShader = this.loadShader(vertexSource, this.gl.VERTEX_SHADER);
        const fragmentShader = this.loadShader(fragmentSource, this.gl.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }

    use()
    {
        this.gl.useProgram(this.program);
    }

    loadShader(source, shaderType)
    {
        const shader = this.gl.createShader(shaderType);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const error = this.gl.getShaderInfoLog(shader).trim();
        if (error !== "") throw new Error("Error compiling shader '" + this.name + "': " + error + "  " + shaderType + "   " + source);

        return shader;
    }

    createProgram(vertexShader, fragmentShader)
    {
        this.program = this.gl.createProgram();

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        const error = this.gl.getProgramInfoLog(this.program).trim();
        if (error !== "") throw new Error("Error linking shader '" + this.name + "': " + error);
    }

    // 获取具有提供的名称的属性的location 。
    getAttributeLocation(name)
    {
        if (this.attributes[name] === undefined) throw new Error(`Unable to find attribute named '${name}' in shader named '${this.name}'`);
        return this.attributes[name];
    }

    getUniformLocation(name)
    {
        if (this.uniforms[name] === undefined) throw new Error(`Unable to find uniform named '${name}' in shader named '${this.name}'`);
        return this.uniforms[name];
    }

    detectAttributes()
    {
        const attributeCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES);

        for (let i = 0; i < attributeCount; ++i)
        {
            const info = this.gl.getActiveAttrib(this.program, i);
            if (!info) break;

            this.attributes[info.name] = this.gl.getAttribLocation(this.program, info.name);
        }
    }

    detectUniforms() 
    {
        const uniformCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < uniformCount; ++i)
        {
            const info = this.gl.getActiveUniform(this.program, i);
            if (!info) break;

            this.uniforms[info.name] = this.gl.getUniformLocation(this.program, info.name);
        }
    }
}