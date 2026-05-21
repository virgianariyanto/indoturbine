"use client";

import { useState } from "react";
import { updateCoreValueData } from "@/app/actions/corevalue";
import * as LucideIcons from "lucide-react";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Info
} from "lucide-react";

// List of allowed & beautiful icons to choose from
const SELECTABLE_ICONS = [
  { name: "Lightbulb", label: "Innovation & Ideas" },
  { name: "Handshake", label: "Integrity & Trust" },
  { name: "Trophy", label: "Excellence & Victory" },
  { name: "Users", label: "Teamwork & Collaboration" },
  { name: "Shield", label: "Safety & Compliance" },
  { name: "Zap", label: "Telemetry & Performance" },
  { name: "Target", label: "Precision & Focus" },
  { name: "Star", label: "Premium & Quality" },
  { name: "Cpu", label: "Technology & digital" },
  { name: "Activity", label: "Real-time & Energy" },
  { name: "Award", label: "Recognition & Merit" },
  { name: "Globe", label: "Global Presence" },
  { name: "Heart", label: "Care & Support" },
  { name: "Briefcase", label: "Enterprise & Services" },
  { name: "Compass", label: "Strategic Direction" }
];

export default function CoreValuesForm({ initialData }) {
  const [sectionData, setSectionData] = useState({
    badge: initialData?.badge || "Our Foundation",
    title: initialData?.title || "Core Values",
    description: initialData?.description || "",
  });

  const [items, setItems] = useState(
    initialData?.items || []
  );

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Field change handler for section fields
  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prev) => ({ ...prev, [name]: value }));
  };

  // Field change handler for item fields
  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Add new Core Value item
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        icon: "Lightbulb",
        title: "NEW VALUE",
        description: "Describe this core corporate principle and how it impacts operations.",
        order: prev.length,
      }
    ]);
  };

  // Delete Core Value item
  const handleDeleteItem = (index) => {
    if (items.length <= 1) {
      alert("At least one Core Value item is required to keep the section functional.");
      return;
    }
    if (confirm("Are you sure you want to delete this Core Value card?")) {
      setItems((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  // Reorder: Move Item Up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    setItems((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return updated;
    });
  };

  // Reorder: Move Item Down
  const handleMoveDown = (index) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated;
    });
  };

  // Form Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Section Validation
    if (!sectionData.badge.trim() || !sectionData.title.trim() || !sectionData.description.trim()) {
      setMessage({ type: "error", text: "All section header fields (badge, title, description) are required." });
      setIsSaving(false);
      return;
    }

    // Items Validation
    if (items.length === 0) {
      setMessage({ type: "error", text: "At least one Core Value item must be specified." });
      setIsSaving(false);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.title.trim()) {
        setMessage({ type: "error", text: `Item #${i + 1} must have a title.` });
        setIsSaving(false);
        return;
      }
      if (!item.description.trim()) {
        setMessage({ type: "error", text: `Item #${i + 1} must have a description.` });
        setIsSaving(false);
        return;
      }
    }

    try {
      const res = await updateCoreValueData(sectionData, items);
      if (res.success) {
        setMessage({ type: "success", text: "Core Values updated successfully! Homepage revalidated." });
        // Update items to contain permanent database IDs (removes temp/default tags)
        if (res.data?.items) {
          setItems(res.data.items);
        }
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update Core Values." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "An unexpected error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Messages */}
      {message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border animate-in fade-in slide-in-from-top-1 duration-200 ${message.type === "success"
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

      {/* Grid Layout - Settings + Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">

        {/* Left Side: Inputs and settings (3/5 columns) */}
        <div className="xl:col-span-3 space-y-8">

          {/* Section 1: Header configuration */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-5">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-blue-600" />
              <span>Section Header Settings</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Badge/Tag */}
              <div className="space-y-1.5">
                <label htmlFor="badge" className="block text-xs font-bold text-slate-700">
                  Badge text <span className="text-red-500">*</span>
                </label>
                <input
                  id="badge"
                  name="badge"
                  type="text"
                  placeholder="e.g. Our Foundation"
                  value={sectionData.badge}
                  onChange={handleSectionChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label htmlFor="title" className="block text-xs font-bold text-slate-700">
                  Section Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Core Values"
                  value={sectionData.title}
                  onChange={handleSectionChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-xs font-bold text-slate-700">
                Section Subtitle / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Give a short summary explaining these values..."
                value={sectionData.description}
                onChange={handleSectionChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
              />
            </div>
          </div>

          {/* Section 2: Items Configuration */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-850 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
                  <span>Configure Individual Cards ({items.length})</span>
                </h4>
                <p className="text-xs text-slate-500">Add, delete, edit, or reorder core value cards dynamically.</p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-750 text-xs font-bold rounded-xl border border-indigo-200 transition-colors shadow-sm active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>Add Value</span>
              </button>
            </div>

            {/* List of Dynamic Card Items */}
            <div className="space-y-5">
              {items.map((item, index) => {
                const ItemIcon = LucideIcons[item.icon] || LucideIcons.Lightbulb;

                return (
                  <div
                    key={item.id || index}
                    className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Floating Glow Indicator */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500" />

                    {/* Card Header Menu / Operations */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-450 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
                        Card #{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {/* Reordering */}
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === items.length - 1}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          title="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(index)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-100 transition-colors ml-1"
                          title="Delete card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Form Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {/* Icon Picker Field */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Select Card Icon
                        </label>
                        <div className="flex gap-2">
                          {/* Live Render selected icon */}
                          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                            <ItemIcon className="w-5.5 h-5.5" />
                          </div>

                          {/* Dropdown menu selection */}
                          <select
                            value={item.icon}
                            onChange={(e) => handleItemChange(index, "icon", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                          >
                            {SELECTABLE_ICONS.map((opt) => (
                              <option key={opt.name} value={opt.name}>
                                {opt.label} ({opt.name})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Card Title */}
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700">
                          Card Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. INNOVATION"
                          value={item.title}
                          onChange={(e) => handleItemChange(index, "title", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all uppercase tracking-wide"
                        />
                      </div>

                    </div>

                    {/* Card Description */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Card Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detail the value and principles..."
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Home-style Dynamic Live Preview (2/5 columns) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="sticky top-28 bg-white text-slate-800 rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">

            {/* Live Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span>Homepage Live Mockup</span>
              </h4>
              <span className="text-[10px] font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full border border-blue-100">
                Instantly reactive
              </span>
            </div>

            {/* Public Render Mockup */}
            <div className="space-y-10">

              {/* Header preview */}
              <div className="text-center space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  {sectionData.badge || "Badge"}
                </span>
                <h3 className="text-2xl font-black tracking-tight leading-none uppercase text-slate-900">
                  {sectionData.title || "Title"}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal max-w-sm mx-auto">
                  {sectionData.description || "Description will appear here..."}
                </p>
              </div>

              {/* Grid cards preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-slate-200">
                {items.map((item, index) => {
                  const PreviewIcon = LucideIcons[item.icon] || LucideIcons.Lightbulb;

                  return (
                    <div
                      key={item.id || index}
                      className="p-5 rounded-2xl border border-slate-200/40 bg-slate-50/50 hover:bg-white hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group flex flex-col items-start"
                    >
                      <div className="mb-4 p-2 bg-blue-50/85 text-blue-600 rounded-xl border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 shadow-sm">
                        <PreviewIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 tracking-wide uppercase mb-1">
                        {item.title || "Value Title"}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {item.description || "Card description will appear here..."}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>This panel mimics the precise style of your public landing page cards.</span>
            </div>

          </div>
        </div>

      </div>

      {/* Form Submission Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset unsaved changes to saved values?")) {
              setSectionData({
                badge: initialData?.badge || "Our Foundation",
                title: initialData?.title || "Core Values",
                description: initialData?.description || "",
              });
              setItems(initialData?.items || []);
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
