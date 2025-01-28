import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { updateTaskAction } from '@/actions/tasks/updateTaskAction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session || !session.user?.id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { id, title, description, status } = req.body;

            if (!id || !title || !description || !status) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const userId = session.user.id;

            const updatedTask = await updateTaskAction({
                id,
                title,
                description,
                status,
                userId
            });

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
