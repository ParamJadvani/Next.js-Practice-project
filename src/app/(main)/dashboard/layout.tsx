import AuthHydration from "@/components/auth/AuthHydration";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AuthHydration />
            {children}
        </div>
    );
}
