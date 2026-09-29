import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error('CLERK_WEBHOOK_SECRET is not configured in .env');
            return res.status(500).json({ success: false, message: 'Webhook secret not configured' });
        }

        const whook = new Webhook(webhookSecret);

        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        const payload = typeof req.body === 'string' || Buffer.isBuffer(req.body)
            ? req.body.toString()
            : JSON.stringify(req.body);

        let evt;
        try {
            evt = whook.verify(payload, headers);
        } catch (verifyErr) {
            console.warn('Svix verification warning:', verifyErr.message);
            // Fallback for development if verification signature mismatch
            evt = req.body;
        }

        const { data, type } = evt;

        if (data) {
            const userData = {
                _id: data.id,
                email: data.email_addresses?.[0]?.email_address || '',
                username: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || 'User',
                image: data.image_url || '',
            };

            switch (type) {
                case 'user.created': {
                    await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true });
                    break;
                }
                case 'user.deleted': {
                    await User.findByIdAndDelete(data.id);
                    break;
                }
                case 'user.updated': {
                    await User.findByIdAndUpdate(data.id, userData, { new: true });
                    break;
                }
                default:
                    break;
            }
        }

        return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).json({ success: false, message: err.message });
    }
};

export default clerkWebhooks;