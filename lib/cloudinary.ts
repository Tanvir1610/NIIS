import { v2 as cloudinary } from 'cloudinary';

let configured = false;

function ensureConfigured() {
    if (configured) return;

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error(
            'Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local'
        );
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });

    configured = true;
}

export interface UploadResult {
    secure_url: string;
    public_id: string;
}

/**
 * Upload a base64 image string to Cloudinary.
 * Accepts data URIs (e.g., "data:image/png;base64,...") or raw base64.
 */
export async function uploadImage(base64Data: string): Promise<UploadResult> {
    ensureConfigured();

    const dataUri = base64Data.startsWith('data:')
        ? base64Data
        : `data:image/jpeg;base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'niis2026/participants',
        resource_type: 'image',
        transformation: [{ width: 400, height: 400, crop: 'limit', quality: 'auto' }],
    });

    return {
        secure_url: result.secure_url,
        public_id: result.public_id,
    };
}

/**
 * Upload a payment screenshot to Cloudinary.
 * Higher resolution limit since screenshots need to be readable.
 */
export async function uploadPaymentScreenshot(base64Data: string): Promise<UploadResult> {
    ensureConfigured();

    const dataUri = base64Data.startsWith('data:')
        ? base64Data
        : `data:image/jpeg;base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'niis2026/payment-screenshots',
        resource_type: 'image',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
    });

    return {
        secure_url: result.secure_url,
        public_id: result.public_id,
    };
}

export default cloudinary;
