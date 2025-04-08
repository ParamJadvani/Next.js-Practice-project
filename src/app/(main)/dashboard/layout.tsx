import AuthHydration from "@/components/auth/AuthHydration";

export default function DashboardLayout({
    children,
    analytics,
    settings,
}: {
    children: React.ReactNode;
    analytics: React.ReactNode;
    settings: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AuthHydration />
            <div className="flex">
                <nav className="fixed inset-y-0 w-64 border-r bg-white dark:bg-gray-800">
                    <div className="flex h-16 items-center px-6 border-b">
                        <h1 className="text-2xl font-bold">My Dashboard</h1>
                    </div>
                    <div className="p-4 space-y-1">
                        <h1 className="text-xl font-bold text-gray-700">Home</h1>
                        <h1 className="text-xl font-bold text-gray-700">{analytics}</h1>
                        <h1 className="text-xl font-bold text-gray-700">{settings}</h1>
                    </div>
                </nav>
                <main className="ml-64 flex-1 p-6">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
