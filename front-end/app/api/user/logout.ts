import type { NextApiRequest, NextApiResponse } from 'next';

const FASTAPI_URL = process.env.FASTAPI_URL ;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { access_token, refresh_token } = req.query;

    try {
        const url = new URL(`${FASTAPI_URL}/api/v1/user/user/logout`);
        url.searchParams.append('access_token', access_token as string);
        if (refresh_token) {
            url.searchParams.append('refresh_token', refresh_token as string);
        }

        const response = await fetch(url.toString(), {
            method: 'POST',
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
