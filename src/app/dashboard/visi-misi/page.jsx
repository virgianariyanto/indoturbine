import { getVisiMisiData } from "@/app/actions/visimisi";
import VisiMisiForm from "./VisiMisiForm";
import { Eye, Sparkles } from "lucide-react";

export default async function VisiMisiPage() {
  const initialData = await getVisiMisiData();

  return (
    <div className="space-y-8 font-sans max-w-8xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Customize Homepage UI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Eye className="w-7 h-7 text-slate-700" />
            <span>Visi & Misi Editor</span>
          </h1>
          <p className="text-sm text-slate-600">
            Modify the Vision and Mission content displayed on the homepage.
          </p>
        </div>
      </div>

      {/* Settings Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Visi & Misi Section Editor</h3>
          <p className="text-xs text-slate-500">Configure the Vision and Mission cards shown on the primary landing page.</p>
        </div>
        <div className="p-6 md:p-8">
          <VisiMisiForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
