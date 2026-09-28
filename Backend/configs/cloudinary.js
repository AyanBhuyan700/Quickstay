import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer, mimetype = 'image/jpeg') => {
    // If Cloudinary credentials are not present, return a base64 data URI
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: 'quickstay_rooms' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    // Fallback to data URI on failure so adding room never fails
                    resolve(`data:${mimetype};base64,${fileBuffer.toString('base64')}`);
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

export default cloudinary;
