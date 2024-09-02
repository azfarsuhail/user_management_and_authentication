import type { NextApiRequest, NextApiResponse } from 'next';

const FASTAPI_URL = process.env.FASTAPI_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization || '';

    if (req.method === 'GET') {
        try {
            const response = await fetch(`${FASTAPI_URL}/api/v1/user/user/profile`, {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json(data);
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'PATCH') {
        try {
            const response = await fetch(`${FASTAPI_URL}/api/v1/user/user/profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json(data);
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
