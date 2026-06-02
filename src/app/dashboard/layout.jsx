import DashboardClientLayout from "@/components/DashboardClientLayout";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
    return (
        <DashboardClientLayout>
            {children}
        </DashboardClientLayout>
    );
}