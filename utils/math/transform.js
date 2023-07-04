import Matrix4 from "./matrix4.js";
import Vector3 from "./vector3.js";


export default class Transform
{
    position = Vector3.zero;
    rotation = Vector3.zero;
    scale = Vector3.one;

    copyFrom(transform)
    {
        this.position.copyFrom(transform.position);
        this.rotation.copyFrom(transform.rotation);
        this.scale.copyFrom(transform.scale);
    }

    getTransformationMatrix() 
    {
        const translation = Matrix4.translation(this.position);
        const rotation = Matrix4.rotationXYZ(this.rotation.x, this.rotation.y, this.rotation.z);
        const scale = Matrix4.scale(this.scale);

        // T * R * S
        return Matrix4.multiply(Matrix4.multiply(translation, rotation), scale);
    }
}




