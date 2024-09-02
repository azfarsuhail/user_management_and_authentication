import type { NextApiRequest, NextApiResponse } from 'next';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://fastapi:8000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization || '';

    if (req.method === 'GET') {
        try {
            const response = await fetch(`${FASTAPI_URL}/api/v1/teacher/teacher/profile`, {
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
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
