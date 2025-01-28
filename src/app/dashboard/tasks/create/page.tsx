import { Layout } from '@/components/layout/Layout';
import { TaskForm } from '@/components/tasks/TaskForm';

export default function CreateTaskPage() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-800">Create Task</h1>
            <TaskForm mode="create" />
        </Layout>
    );
}
