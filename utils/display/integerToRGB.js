const IntegerToRGB = (color) =>
{
    if (color > 16777215)
    {
        //  The color value has an alpha component
        return {
            a: color >>> 24,
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }
    else
    {
        return {
            a: 255,
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }
};


export default IntegerToRGB;