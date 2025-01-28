import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-6 bg-gray-100 flex-1">{children}</main>
        </div>
    </div>
);
