"use client";

import { useState } from "react";
import { updateHeroData } from "@/app/actions/hero";
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Eye,
  FileText
} from "lucide-react";

const IMAGE_PRESETS = [
  { name: "Offshore Gas Platform (Default)", url: "/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg" },
  { name: "Heavy Industry Turbine", url: "/images/environmental-pollution-industry-exterior.jpg" },
  { name: "Turbine Rotor Blades", url: "/images/adigun-ampa-9U0vAXekzgU-unsplash.jpg" },
  { name: "Refinery Factory", url: "/images/giorgi-iremadze-xvH26lEIBKE-unsplash.jpg" },
  { name: "Solar panels (Alternative)", url: "/images/sol-tZw3fcjUIpM-unsplash.jpg" },
];

export default function HeroSettingsForm({ initialData }) {
  const [formData, setFormData] = useState({
    bgImageUrl: initialData?.bgImageUrl || "/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg",
    titlePart1: initialData?.titlePart1 || "INDO",
    titlePart2: initialData?.titlePart2 || "TURBINE",
    tag: initialData?.tag || "Integrated Turbine Services & Telemetry",
    description: initialData?.description || "",
    primaryBtnText: initialData?.primaryBtnText || "Get Started",
    primaryBtnLink: initialData?.primaryBtnLink || "#contact",
    secondaryBtnText: initialData?.secondaryBtnText || "Explore Solutions",
    secondaryBtnLink: initialData?.secondaryBtnLink || "#services",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [message, setMessage] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("File size exceeds 8MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setMessage(null);

    const data = new FormData();
    data.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to upload image.");
      }

      setFormData((prev) => ({ ...prev, bgImageUrl: result.url }));
      setMessage({ type: "success", text: "Image uploaded successfully to local storage!" });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Preset Select handler
  const handleSelectPreset = (url) => {
    setFormData((prev) => ({ ...prev, bgImageUrl: url }));
    setMessage(null);
  };

  // Form Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Validate required fields
    if (!formData.titlePart1.trim()) {
      setMessage({ type: "error", text: "Title Part 1 is required." });
      setIsSaving(false);
      return;
    }
    if (!formData.description.trim()) {
      setMessage({ type: "error", text: "Description is required." });
      setIsSaving(false);
      return;
    }
    if (!formData.bgImageUrl.trim()) {
      setMessage({ type: "error", text: "Background Image URL is required." });
      setIsSaving(false);
      return;
    }

    try {
      const res = await updateHeroData(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Hero section updated successfully! Homepage revalidated." });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update Hero section." });
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Text and Buttons (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Text & Copy Content</span>
            </h4>

            {/* Ambient Tag */}
            <div className="space-y-1.5">
              <label htmlFor="tag" className="block text-xs font-bold text-slate-700">
                Ambient Floating Tag (Optional)
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                placeholder="e.g. Integrated Turbine Services & Telemetry"
                value={formData.tag}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Title Parts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="titlePart1" className="block text-xs font-bold text-slate-700">
                  Brand Title - Part 1 <span className="text-red-500">*</span>
                </label>
                <input
                  id="titlePart1"
                  name="titlePart1"
                  type="text"
                  placeholder="e.g. INDO"
                  value={formData.titlePart1}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="titlePart2" className="block text-xs font-bold text-slate-700">
                  Brand Title - Part 2 (Optional)
                </label>
                <input
                  id="titlePart2"
                  name="titlePart2"
                  type="text"
                  placeholder="e.g. TURBINE"
                  value={formData.titlePart2}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-xs font-bold text-slate-700">
                Informative Sub-Headline / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Write a compelling copy explaining the company's value proposition..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              <span>Button Actions & Links</span>
            </h4>

            {/* Primary Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="primaryBtnText" className="block text-xs font-bold text-slate-700">
                  Primary Button Text (Optional)
                </label>
                <input
                  id="primaryBtnText"
                  name="primaryBtnText"
                  type="text"
                  placeholder="e.g. Get Started"
                  value={formData.primaryBtnText}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="primaryBtnLink" className="block text-xs font-bold text-slate-700">
                  Primary Button Link (Optional)
                </label>
                <input
                  id="primaryBtnLink"
                  name="primaryBtnLink"
                  type="text"
                  placeholder="e.g. #contact"
                  value={formData.primaryBtnLink}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Secondary Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="secondaryBtnText" className="block text-xs font-bold text-slate-700">
                  Secondary Button Text (Optional)
                </label>
                <input
                  id="secondaryBtnText"
                  name="secondaryBtnText"
                  type="text"
                  placeholder="e.g. Explore Solutions"
                  value={formData.secondaryBtnText}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="secondaryBtnLink" className="block text-xs font-bold text-slate-700">
                  Secondary Button Link (Optional)
                </label>
                <input
                  id="secondaryBtnLink"
                  name="secondaryBtnLink"
                  type="text"
                  placeholder="e.g. #services"
                  value={formData.secondaryBtnLink}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Management (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-5">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              <span>Background Image <span className="text-red-500">*</span></span>
            </h4>

            {/* Current Image View */}
            <div className="relative aspect-video w-full rounded-xl border border-slate-200 bg-slate-900 overflow-hidden shadow-inner group">
              {formData.bgImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={formData.bgImageUrl} 
                  alt="Hero Preview" 
                  className="w-full h-full object-cover opacity-80" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                  No background selected
                </div>
              )}
              <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </div>
            </div>

            {/* Image Path URL */}
            <div className="space-y-1.5">
              <label htmlFor="bgImageUrl" className="block text-[11px] font-bold text-slate-700">
                Image URL / Path
              </label>
              <input
                id="bgImageUrl"
                name="bgImageUrl"
                type="text"
                placeholder="/images/example.jpg"
                value={formData.bgImageUrl}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Image File Uploader */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700">
                Upload New Image
              </label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 group-hover:text-blue-600 transition-colors ${isUploading ? "animate-spin" : ""}`}>
                    {isUploading ? <RefreshCw className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">
                      {isUploading ? "Uploading file..." : "Click to select file"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      Supports JPG, PNG, WebP up to 8MB
                    </p>
                  </div>
                </div>
              </div>
              {uploadError && (
                <p className="text-[10px] font-bold text-red-600 flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{uploadError}</span>
                </p>
              )}
            </div>

            {/* Presets List */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-[11px] font-bold text-slate-700">
                Select Industrial Presets
              </label>
              <div className="grid grid-cols-5 gap-2">
                {IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    title={preset.name}
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`aspect-video w-full rounded-lg border overflow-hidden transition-all hover:scale-105 active:scale-95 ${
                      formData.bgImageUrl === preset.url 
                        ? "border-blue-500 ring-2 ring-blue-500/25" 
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={preset.url} 
                      alt={preset.name} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Form Submission Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset unsaved changes to defaults?")) {
              setFormData({
                bgImageUrl: initialData?.bgImageUrl || "/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg",
                titlePart1: initialData?.titlePart1 || "INDO",
                titlePart2: initialData?.titlePart2 || "TURBINE",
                tag: initialData?.tag || "Integrated Turbine Services & Telemetry",
                description: initialData?.description || "",
                primaryBtnText: initialData?.primaryBtnText || "Get Started",
                primaryBtnLink: initialData?.primaryBtnLink || "#contact",
                secondaryBtnText: initialData?.secondaryBtnText || "Explore Solutions",
                secondaryBtnLink: initialData?.secondaryBtnLink || "#services",
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
          disabled={isSaving || isUploading}
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
