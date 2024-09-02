import type { NextApiRequest, NextApiResponse } from 'next';

const FASTAPI_URL = process.env.FASTAPI_URL ;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization || '';

    if (req.method === 'POST') {
        try {
            const response = await fetch(`${FASTAPI_URL}/api/v1/student/student/profile`, {
                method: 'POST',
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
    } else if (req.method === 'GET') {
        try {
            const { student_id } = req.query;

            const response = await fetch(`${FASTAPI_URL}/api/v1/student/student/profile?student_id=${student_id}`, {
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
