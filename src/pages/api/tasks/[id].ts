import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { deleteTaskAction } from '@/actions/tasks/deleteTaskAction';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const session = await getServerSession(req, res, authOptions);

            if (!session || !session.user?.id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ message: 'Missing task ID' });
            }

            const deleted = await deleteTaskAction(id as string);

            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
