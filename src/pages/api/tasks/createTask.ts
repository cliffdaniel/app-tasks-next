import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { createTaskAction } from '@/actions/tasks/createTaskAction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session || !session.user?.id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { title, description, status } = req.body;

            if (!title || !description || !status) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const userId = session.user.id;

            const newTask = await createTaskAction({
                title,
                description,
                status,
                userId,
            });

            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
