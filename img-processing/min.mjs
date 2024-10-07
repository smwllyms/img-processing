// v0.1

export default (function() {

    let scope = {};

    function flipMat(mat)
    {
        const newMat = new Array(mat.length);

        for (let i in mat)
        {
            newMat[i] = mat[mat.length - i - 1];
        }

        return newMat;
    }

    scope.doEffect = function(rgb, kernel)
    {

        // Assume square kernel matrices
        const kernelRowLen = Math.sqrt(kernel.length);

        // Also assume there is a center (e.g., 3x3, 5x5)
        const offset = Math.floor(kernelRowLen / 2);

        // Flip kernel
        kernel = flipMat(kernel);

        // Traverse 
        // const width = rgb.length;
        // const height = rgb[0].length;
        const width = rgb[0].length;
        const height = rgb.length;

        const newRGB = new Array(height);

        for (let y = 0; y < height; y++) {

            newRGB[y] = new Array(width);

            for (let x = 0; x < width; x++) {

                // Get the kernelRowLen x kernelRowLen around
                let r = 0, g = 0, b = 0;
                let pos = 0;

                for (let oy = y - offset; oy <= y + offset; oy++)
                {

                    if (oy < 0 || oy >= height) {
                        pos++;
                        continue;
                    }

                    for (let ox = x - offset; ox <= x + offset; ox++)
                    {
                        
                        if (ox < 0 || ox >= width) {
                            pos++;
                            continue;
                        }

                        const f = kernel[pos];
                        r += rgb[oy][ox][0] * f;
                        g += rgb[oy][ox][1] * f;
                        b += rgb[oy][ox][2] * f;
                        
                        pos++;
                    }
                }

                // sum += input[i + j] * kernel[kernel.length - 1 - j];
                newRGB[y][x] = [Math.abs(r), Math.abs(g), Math.abs(b)];
            }
        }

        return newRGB;
    }
    
    return scope;
})();