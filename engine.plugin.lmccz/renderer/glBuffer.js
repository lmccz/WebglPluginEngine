// 表示GLBuffer属性所需的信息。
export class AttributeInfo
{
    // 此属性的位置
    location = 0;
    // 此属性中的大小（元素数）
    size = 0;
    // 从缓冲区开始的元素数
    offset = 0;
}


// 表示WebGL缓冲区
export class GLBuffer
{
    gl = undefined;

    _hasAttributeLocation = false;
    _elementSize = 0;
    _stride = 0;
    _buffer = undefined;

    _targetBufferType = 0;
    _dataType = 0;
    _mode = 0;
    _typeSize = 0;

    _data = [];
    _attributes = [];

    constructor(gl, dataType = gl.FLOAT, targetBufferType = gl.ARRAY_BUFFER, mode = gl.TRIANGLES)
    {
        this.gl = gl;

        this._elementSize = 0;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;

        // Determine byte size
        switch (this._dataType)
        {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT: this._typeSize = 4; break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT: this._typeSize = 2; break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE: this._typeSize = 1; break;
            default: throw new Error("Unrecognized data type: " + dataType.toString());
        }

        this._buffer = gl.createBuffer();
    }

    destroy()
    {
        this.gl.deleteBuffer(this._buffer);
        this._data = undefined;
        this._attributes = undefined;
        this.gl = undefined;
    }

    bind(normalized = false) 
    {
        this.gl.bindBuffer(this._targetBufferType, this._buffer);

        if (this._hasAttributeLocation)
        {
            for (let it of this._attributes)
            {
                this.gl.vertexAttribPointer(it.location, it.size, this._dataType, normalized, this._stride, it.offset * this._typeSize);
                this.gl.enableVertexAttribArray(it.location);
            }
        }
    }

    unbind() 
    {
        for (let it of this._attributes)
        {
            this.gl.disableVertexAttribArray(it.location);
        }

        this.gl.bindBuffer(this._targetBufferType, undefined);
    }

    // 将具有所提供信息的属性添加到此缓冲区
    addAttributeLocation(info) 
    {
        this._hasAttributeLocation = true;
        info.offset = this._elementSize;
        this._attributes.push(info);
        this._elementSize += info.size;
        this._stride = this._elementSize * this._typeSize;
    }

    // 用提供的数据替换此缓冲区中的当前数据
    setData(data) 
    {
        this.clearData();
        this.pushBackData(data);
    }

    // Adds data to this buffer.
    pushBackData(data)
    {
        for (let d of data)
        {
            this._data.push(d);
        }
    }

    clearData()
    {
        this._data.length = 0;
    }

    // Uploads this buffer's data to the GPU.
    upload()
    {
        this.gl.bindBuffer(this._targetBufferType, this._buffer);
        let bufferData;

        switch (this._dataType)
        {
            case this.gl.FLOAT: bufferData = new Float32Array(this._data); break;
            case this.gl.INT: bufferData = new Int32Array(this._data); break;
            case this.gl.UNSIGNED_INT: bufferData = new Uint32Array(this._data); break;
            case this.gl.SHORT: bufferData = new Int16Array(this._data); break;
            case this.gl.UNSIGNED_SHORT: bufferData = new Uint16Array(this._data); break;
            case this.gl.BYTE: bufferData = new Int8Array(this._data); break;
            case this.gl.UNSIGNED_BYTE: bufferData = new Uint8Array(this._data); break;
        }

        this.gl.bufferData(this._targetBufferType, bufferData, this.gl.STATIC_DRAW);
    }

    draw() 
    {
        if (this._targetBufferType === this.gl.ARRAY_BUFFER) { this.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize); }
        else if (this._targetBufferType === this.gl.ELEMENT_ARRAY_BUFFER) { this.gl.drawElements(this._mode, this._data.length, this._dataType, 0); }
    }
}
