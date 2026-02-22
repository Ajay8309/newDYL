/**
 * Compresses an image file using Canvas.
 * @param {File} file - The original image file.
 * @param {Object} options - Compression options.
 * @param {number} options.maxWidth - Max width of the output image.
 * @param {number} options.maxHeight - Max height of the output image.
 * @param {number} options.quality - JPEG quality (0 to 1).
 * @returns {Promise<Blob>} - Compressed image as a Blob.
 */
export const compressImage = (file, { maxWidth = 1200, maxHeight = 1200, quality = 0.7 } = {}) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions while maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Export as blob
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            // Create a new file from the blob to preserve filename if needed
                            // But usually an upload expects a File or Blob. 
                            // Returning blob is fine for FormData.
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas toBlob failed'));
                        }
                    },
                    'image/jpeg',
                    quality
                );
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
