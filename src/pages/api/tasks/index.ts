import { NextApiRequest, NextApiResponse } from 'next';
import { findAllTasksAction } from '@/actions/tasks/findAllTasksAction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await findAllTasksAction(Number(page), Number(limit));
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
