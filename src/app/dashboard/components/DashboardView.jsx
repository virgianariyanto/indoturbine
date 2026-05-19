"use client";

import { useState } from "react";
import { 
  Activity, 
  Zap, 
  Gauge, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  Download, 
  Filter
} from "lucide-react";

export default function DashboardView({ user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const kpiCards = [
    {
      title: "Active Turbines",
      value: "24",
      subtext: "out of 26 total units",
      change: "+2 online",
      isPositive: true,
      icon: Activity,
      textColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-100"
    },
    {
      title: "Power Generation",
      value: "1,420 MW",
      subtext: "Peak output achieved",
      change: "+5.4% vs yesterday",
      isPositive: true,
      icon: Zap,
      textColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-100"
    },
    {
      title: "Fleet Health Index",
      value: "98.4%",
      subtext: "Overall mechanical efficiency",
      change: "Optimal state",
      isPositive: true,
      icon: Gauge,
      textColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "QHSE Incidents",
      value: "0",
      subtext: "365 consecutive safe days",
      change: "-100% YoY",
      isPositive: true,
      icon: ShieldAlert,
      textColor: "text-purple-600",
      iconBg: "bg-purple-50 border-purple-100"
    }
  ];

  const fleetData = [
    { id: "TRB-0101", model: "IndoGas GT-250", location: "Offshore Platform Alpha", mw: "125.4 MW", eff: "99.2%", rpm: "3,600 RPM", temp: "520°C", status: "Operational" },
    { id: "TRB-0102", model: "IndoGas GT-250", location: "Offshore Platform Alpha", mw: "124.8 MW", eff: "98.8%", rpm: "3,590 RPM", temp: "518°C", status: "Operational" },
    { id: "TRB-0204", model: "SolarMax ST-100", location: "Surabaya Solar Field B", mw: "48.2 MW", eff: "96.4%", rpm: "1,800 RPM", temp: "180°C", status: "Operational" },
    { id: "TRB-0311", model: "HeavyDuty ST-500", location: "Balikpapan Refinery", mw: "410.0 MW", eff: "99.5%", rpm: "3,600 RPM", temp: "540°C", status: "Operational" },
    { id: "TRB-0105", model: "IndoGas GT-250", location: "Offshore Platform Beta", mw: "0.0 MW", eff: "0.0%", rpm: "0 RPM", temp: "35°C", status: "Maintenance" },
    { id: "TRB-0209", model: "SolarMax ST-100", location: "Medan Solar Grid", mw: "12.0 MW", eff: "82.0%", rpm: "1,200 RPM", temp: "110°C", status: "Standby" },
  ];

  const filteredFleet = statusFilter === "all" 
    ? fleetData 
    : fleetData.filter(t => t.status.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="space-y-8 font-sans">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          {/* <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Telemetry Feed</span>
          </div> */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-600">
            Welcome back, <span className="text-slate-900 font-bold">{user?.name}</span>. All industrial turbine grids are operating at peak stability.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Feeds"}</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all">
            <Download className="w-4 h-4" />
            <span>Export QHSE Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title} 
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2 rounded-xl border ${card.iconBg} ${card.textColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</div>
                <div className="text-xs text-slate-500 font-medium">{card.subtext}</div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold">
                {card.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={card.isPositive ? "text-emerald-600" : "text-red-600"}>
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Output Chart Simulator */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Real-Time Fleet MW Telemetry</span>
            </h3>
            <p className="text-xs text-slate-500">Aggregated output across all regional turbine fields (MWh)</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            {["24H", "7D", "30D", "1Y"].map((range) => (
              <button 
                key={range}
                className={`px-3 py-1.5 rounded-lg transition-all ${range === "24H" ? "bg-blue-600 text-white font-extrabold shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Bars Simulation */}
        <div className="h-64 flex items-end gap-2 pt-8 sm:gap-4 px-2 border-b border-slate-200 relative">
          {/* Grid Lines */}
          <div className="absolute inset-x-0 top-0 border-t border-slate-100 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/3 border-t border-slate-100 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/3 border-t border-slate-100 pointer-events-none" />

          {[40, 65, 80, 55, 90, 75, 85, 95, 88, 92, 100, 98].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
              <div 
                className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 via-blue-500 to-indigo-500 relative transition-all duration-300 group-hover:opacity-90 group-hover:shadow-md group-hover:shadow-blue-500/20"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-200 text-slate-800 text-[10px] font-bold py-1 px-2.5 rounded-lg pointer-events-none whitespace-nowrap shadow-lg z-20">
                  {height * 14.2} MW
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                {`${i * 2}:00`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Turbine Fleet Status Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/50">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Gauge className="w-5 h-5 text-indigo-600" />
              <span>Turbine Fleet Management</span>
            </h3>
            <p className="text-xs text-slate-500">Live monitoring of mechanical parameters & operational status</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              {["All", "Operational", "Standby", "Maintenance"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status.toLowerCase())}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === status.toLowerCase()
                      ? "bg-white text-slate-900 font-bold border border-slate-200 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-4 px-6">Turbine ID</th>
                <th className="py-4 px-6">Model</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Output</th>
                <th className="py-4 px-6">Efficiency</th>
                <th className="py-4 px-6">RPM</th>
                <th className="py-4 px-6">Temp</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredFleet.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${
                      row.status === "Operational" ? "bg-emerald-500 animate-pulse" :
                      row.status === "Standby" ? "bg-amber-500" : "bg-red-500"
                    }`} />
                    <span>{row.id}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{row.model}</td>
                  <td className="py-4 px-6">{row.location}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{row.mw}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      parseFloat(row.eff) > 95 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      parseFloat(row.eff) > 80 ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {row.eff}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-mono text-xs">{row.rpm}</td>
                  <td className="py-4 px-6 font-mono text-xs">{row.temp}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      row.status === "Operational" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      row.status === "Standby" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {row.status === "Operational" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {row.status === "Standby" && <Clock className="w-3.5 h-3.5" />}
                      {row.status === "Maintenance" && <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{row.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-200 text-center text-xs font-medium text-slate-500">
          Showing {filteredFleet.length} of {fleetData.length} monitored industrial turbine nodes. Telemetry refresh cycle: 1.2s.
        </div>
      </div>
    </div>
  );
}

