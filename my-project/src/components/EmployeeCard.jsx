import React from "react";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";

function EmployeeCard({ employee }) {
  const { name, email, phone, website, company, id } = employee;
  const cardRef = useRef();
  const [downloading, setDownloading] = useState(false);

  // Array of gradient colors — each card gets a different color based on its id
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
    "from-violet-500 to-purple-600",
    "from-amber-500 to-orange-600",
    "from-teal-500 to-green-600",
    "from-sky-500 to-cyan-600",
  ];
  // Pick a gradient based on employee id (cycles through the list)
  const gradient = gradients[(id - 1) % gradients.length];

  const downloadCard = async () => {
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1.0, pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${name.replace(" ", "-")}-card.png`;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  };

  const printCard = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${name} - Employee Card</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; display:flex; justify-content:center; padding: 40px; background: #f1f5f9; }
            .card { background: white; border-radius: 16px; padding: 32px; max-width: 320px; width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 20px; }
            img { width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; display: block; margin: 0 auto 12px; background: #e2e8f0; }
            h2 { color: white; margin: 0 0 4px; font-size: 18px; }
            .company { color: rgba(255,255,255,0.8); font-size: 13px; }
            .field { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
            .label { color: #94a3b8; min-width: 60px; }
            .value { color: #334155; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${id}" />
              <h2>${name}</h2>
              <div class="company">${company.name}</div>
            </div>
            <div class="field"><span class="label">ID</span><span class="value">#${String(id).padStart(3,"0")}</span></div>
            <div class="field"><span class="label">Email</span><span class="value">${email}</span></div>
            <div class="field"><span class="label">Phone</span><span class="value">${phone}</span></div>
            <div class="field"><span class="label">Website</span><span class="value">${website}</span></div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    // The whole card — white background, rounded corners, shadow, hover effect
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Colored header section — gradient changes per employee */}
      <div className={`bg-gradient-to-br ${gradient} p-6 flex flex-col items-center`}>
        
        {/* Employee ID badge */}
        <span className="self-end text-xs font-bold text-white/70 bg-white/20 px-2 py-1 rounded-full mb-3">
          #{String(id).padStart(3, "0")}
        </span>

        {/* Avatar image */}
        <div className="w-20 h-20 rounded-full border-4 border-white/80 overflow-hidden bg-white/20 shadow-lg">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
            alt={name}
            className="w-full h-full"
          />
        </div>

        {/* Name and company */}
        <h2 className="text-white font-bold text-lg mt-3 text-center leading-tight">{name}</h2>
        <p className="text-white/75 text-xs mt-1 text-center">{company.name}</p>
      </div>

      {/* Info section */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        
        {/* Each info row */}
        {[
          { icon: "✉️", label: "Email", value: email },
          { icon: "📞", label: "Phone", value: phone },
          { icon: "🌐", label: "Website", value: website },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="text-base mt-0.5">{icon}</span>
            <div className="min-w-0">
              {/* min-w-0 allows text to truncate inside flex */}
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
              <p className="text-sm text-slate-700 font-medium truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons at the bottom */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={downloadCard}
          disabled={downloading}
          className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading ? "Saving..." : "⬇ Download"}
        </button>
        <button
          onClick={printCard}
          className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all"
        >
          🖨 Print
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;