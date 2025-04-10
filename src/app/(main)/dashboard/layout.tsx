// "use client";

// import React, { useState } from "react";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import AuthHydration from "@/components/auth/AuthHydration";

// export default function DashboardLayout({
//     children,
//     sidebar,
// }: {
//     children: React.ReactNode;
//     sidebar: React.ReactNode;
// }) {
//     // State to track whether sidebar is collapsed.
//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//     // Toggle the sidebar collapsed/expanded state.
//     const toggleSidebar = () => {
//         setIsSidebarCollapsed((prev) => !prev);
//     };

//     return (
//         <SidebarProvider>
//             <AuthHydration />
//             <div className="flex h-screen overflow-hidden">
//                 {/* Sidebar area */}
//                 {/* Option 1: Completely remove sidebar when collapsed */}
//                 {!isSidebarCollapsed && (
//                     <aside className="w-64 bg-white shadow-md transition-all duration-300">
//                         {sidebar}
//                     </aside>
//                 )}

//                 {/*
//         Option 2: Alternatively, use CSS width to animate collapse.
//         Uncomment below and comment out the above block if you prefer having a minimal sidebar placeholder.

//         <aside className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-0' : 'w-64'}`}>
//             {sidebar}
//         </aside>
//         */}

//                 {/* Main content area */}
//                 <div className="flex flex-col">
//                     <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
//                         <h1 className="text-xl font-semibold">Dashboard</h1>
//                         {/*
//                 The button wraps SidebarTrigger to catch the onClick event.
//                 When clicked it toggles the sidebar collapse state.
//             */}

//                         <SidebarTrigger
//                             onClick={toggleSidebar}
//                             className="p-2 rounded focus:outline-none hover:bg-gray-200"
//                         />
//                     </header>
//                     <main className=" overflow-auto p-6">{children}</main>
//                 </div>
//             </div>
//         </SidebarProvider>
//     );
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <main>{children}</main>;
}
