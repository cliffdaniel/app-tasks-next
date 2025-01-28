import { Layout } from '@/components/layout/Layout';
import { TaskForm } from '@/components/tasks/TaskForm';

export default function EditTaskPage({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
            <TaskForm mode="edit" taskId={params.id} />
        </Layout>
    );
}
