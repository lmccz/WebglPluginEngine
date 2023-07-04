import Color from "./color.js";
import IntegerToRGB from "./integerToRGB.js";


const IntegerToColor = input =>
{
    const rgb = IntegerToRGB(input);
    return new Color(rgb.r, rgb.g, rgb.b, rgb.a);
};


export default IntegerToColor;