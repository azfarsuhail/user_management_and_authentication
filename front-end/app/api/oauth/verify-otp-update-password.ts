import type { NextApiRequest, NextApiResponse } from 'next';

const FASTAPI_URL = process.env.FASTAPI_URL ;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { phone, otp, new_password } = req.query;

        const response = await fetch(
            `${FASTAPI_URL}/api/v1/auth/auth/verify-otp-update-password?phone=${phone}&otp=${otp}&new_password=${new_password}`,
            {
                method: 'POST',
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
