import { Layout } from '@/components/layout/Layout';

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
            <p>Details of task with ID: {params.id}</p>
        </Layout>
    );
}
