import { Layout } from '@/components/layout/Layout';
import { TaskList } from '@/components/tasks/TaskList';

export default function TasksPage() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>

            <TaskList />
        </Layout>
    );
}
