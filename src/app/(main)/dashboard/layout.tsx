import AuthHydration from "@/components/auth/AuthHydration";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AuthHydration />
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        My Dashboard
                    </h1>
                    <div className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        Settings
                    </div>
                </div>
            </header>
            <div className="flex">
                <main className="ml-64 flex-1 p-6">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
