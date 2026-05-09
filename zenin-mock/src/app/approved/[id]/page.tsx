import Sidebar from "@/components/Sidebar";
import ApprovedAnimation from "./ApprovedAnimation";

export default function ApprovedPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64">
        <main className="flex min-h-screen items-center justify-center px-8 py-12">
          <ApprovedAnimation repairId={params.id} />
        </main>
      </div>
    </div>
  );
}
