"use client";

import { useState } from "react";
import { updateVisiMisiData } from "@/app/actions/visimisi";
import {
  Eye,
  Goal,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText
} from "lucide-react";

export default function VisiMisiForm({ initialData }) {
  const [formData, setFormData] = useState({
    visionTitle: initialData?.visionTitle || "VISI",
    visionText: initialData?.visionText || "",
    missionTitle: initialData?.missionTitle || "MISI",
    missionText: initialData?.missionText || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Validate required fields
    if (!formData.visionTitle.trim()) {
      setMessage({ type: "error", text: "Vision title is required." });
      setIsSaving(false);
      return;
    }
    if (!formData.visionText.trim()) {
      setMessage({ type: "error", text: "Vision text is required." });
      setIsSaving(false);
      return;
    }
    if (!formData.missionTitle.trim()) {
      setMessage({ type: "error", text: "Mission title is required." });
      setIsSaving(false);
      return;
    }
    if (!formData.missionText.trim()) {
      setMessage({ type: "error", text: "Mission text is required." });
      setIsSaving(false);
      return;
    }

    try {
      const res = await updateVisiMisiData(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Visi & Misi section updated successfully! Homepage revalidated." });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update Visi & Misi section." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "An unexpected error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Messages */}
      {message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border animate-in fade-in slide-in-from-top-1 duration-200 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold">{message.type === "success" ? "Success" : "Error"}</p>
            <p className="text-xs font-medium opacity-90">{message.text}</p>
          </div>
        </div>
      )}

      {/* Main Grid — Two Cards Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Vision Card */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Vision (Visi)</span>
          </h4>

          {/* Vision Title */}
          <div className="space-y-1.5">
            <label htmlFor="visionTitle" className="block text-xs font-bold text-slate-700">
              Card Title <span className="text-red-500">*</span>
            </label>
            <input
              id="visionTitle"
              name="visionTitle"
              type="text"
              placeholder="e.g. VISI"
              value={formData.visionTitle}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Vision Text */}
          <div className="space-y-1.5">
            <label htmlFor="visionText" className="block text-xs font-bold text-slate-700">
              Vision Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="visionText"
              name="visionText"
              rows={5}
              placeholder="Describe the company's long-term vision..."
              value={formData.visionText}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
            />
          </div>

          {/* Live Preview */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Live Preview</p>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 uppercase">
                {formData.visionTitle || "VISI"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {formData.visionText || "Vision text will appear here..."}
              </p>
            </div>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Goal className="w-4 h-4 text-indigo-600" />
            <span>Mission (Misi)</span>
          </h4>

          {/* Mission Title */}
          <div className="space-y-1.5">
            <label htmlFor="missionTitle" className="block text-xs font-bold text-slate-700">
              Card Title <span className="text-red-500">*</span>
            </label>
            <input
              id="missionTitle"
              name="missionTitle"
              type="text"
              placeholder="e.g. MISI"
              value={formData.missionTitle}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Mission Text */}
          <div className="space-y-1.5">
            <label htmlFor="missionText" className="block text-xs font-bold text-slate-700">
              Mission Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="missionText"
              name="missionText"
              rows={5}
              placeholder="Describe the company's core mission..."
              value={formData.missionText}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y"
            />
          </div>

          {/* Live Preview */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Live Preview</p>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-3">
                <Goal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-2 uppercase">
                {formData.missionTitle || "MISI"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {formData.missionText || "Mission text will appear here..."}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Form Submission Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset unsaved changes to saved values?")) {
              setFormData({
                visionTitle: initialData?.visionTitle || "VISI",
                visionText: initialData?.visionText || "",
                missionTitle: initialData?.missionTitle || "MISI",
                missionText: initialData?.missionText || "",
              });
              setMessage(null);
            }
          }}
          className="px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all active:scale-[0.98]"
          disabled={isSaving}
        >
          Reset Form
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving Content...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
