import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold text-gray-800">Welcome to the Dashboard!</h1>
            <p className="mt-4 text-gray-600">
                Use the menu to navigate and manage tasks.
            </p>
            <pre className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
                {JSON.stringify(session, null, 2)}
            </pre>
        </Layout>
    );
}
