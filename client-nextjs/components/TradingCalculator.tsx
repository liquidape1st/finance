import { Calculator, AlertCircle } from "lucide-react";
import { useState } from "react";

export function TradingCalculator() {
  const [capital, setCapital] = useState<string>("10000");
  const [riskPercent, setRiskPercent] = useState<string>("2");
  const [entryPrice, setEntryPrice] = useState<string>("1.2000");
  const [stopLoss, setStopLoss] = useState<string>("1.1950");
  const [pipValue, setPipValue] = useState<string>("10");

  const calculatePosition = () => {
    const cap = parseFloat(capital);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const pv = parseFloat(pipValue);

    if (!cap || !risk || !entry || !sl || !pv) return null;

    const riskAmount = (cap * risk) / 100;
    const pips = Math.abs(entry - sl) * 10000; // For Forex
    const lotSize = riskAmount / (pips * pv);

    return {
      riskAmount: riskAmount.toFixed(2),
      pips: pips.toFixed(1),
      lotSize: lotSize.toFixed(2)
    };
  };

  const result = calculatePosition();

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
      <div className="bg-[#141414] border-b border-neutral-800 px-8 py-6 flex items-center gap-3">
        <Calculator className="size-6 text-[#FFD11A]" />
        <div>
          <h3 className="text-white text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Công Cụ Tính Toán Giao Dịch
          </h3>
          <p className="text-[#98989a] text-sm mt-1">
            Tính toán kích thước lệnh dựa trên quản lý rủi ro
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Capital */}
          <div>
            <label className="text-[#98989a] text-sm mb-2 block">
              Vốn Giao Dịch ($)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-[#FFD11A]/30 focus:outline-none transition-colors"
              placeholder="10000"
            />
          </div>

          {/* Risk Percent */}
          <div>
            <label className="text-[#98989a] text-sm mb-2 block">
              Mức Rủi Ro (%)
            </label>
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-[#FFD11A]/30 focus:outline-none transition-colors"
              placeholder="2"
              step="0.1"
            />
          </div>

          {/* Entry Price */}
          <div>
            <label className="text-[#98989a] text-sm mb-2 block">
              Giá Vào Lệnh
            </label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-[#FFD11A]/30 focus:outline-none transition-colors"
              placeholder="1.2000"
              step="0.0001"
            />
          </div>

          {/* Stop Loss */}
          <div>
            <label className="text-[#98989a] text-sm mb-2 block">
              Giá Cắt Lỗ (Stop Loss)
            </label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-[#FFD11A]/30 focus:outline-none transition-colors"
              placeholder="1.1950"
              step="0.0001"
            />
          </div>

          {/* Pip Value */}
          <div className="col-span-2">
            <label className="text-[#98989a] text-sm mb-2 block">
              Giá Trị 1 Pip ($)
            </label>
            <input
              type="number"
              value={pipValue}
              onChange={(e) => setPipValue(e.target.value)}
              className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-[#FFD11A]/30 focus:outline-none transition-colors"
              placeholder="10"
            />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-[#141414] border border-neutral-800 rounded-xl p-6">
            <h4 className="text-white text-lg mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Kết Quả Tính Toán
            </h4>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-[#98989a] text-sm mb-1">Số Tiền Rủi Ro</p>
                <p className="text-[#FFD11A] text-2xl">${result.riskAmount}</p>
              </div>
              <div>
                <p className="text-[#98989a] text-sm mb-1">Khoảng Cách (Pips)</p>
                <p className="text-white text-2xl">{result.pips}</p>
              </div>
              <div>
                <p className="text-[#98989a] text-sm mb-1">Kích Thước Lệnh (Lot)</p>
                <p className="text-white text-2xl">{result.lotSize}</p>
              </div>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="mt-6 bg-[#FFD11A]/10 border border-[#FFD11A]/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="size-5 text-[#FFD11A] flex-shrink-0 mt-0.5" />
          <p className="text-[#FFD11A] text-sm leading-relaxed">
            <strong>Lưu ý:</strong> Công cụ này chỉ mang tính tham khảo. Luôn kiểm tra lại các thông số trước khi giao dịch thực tế.
          </p>
        </div>
      </div>
    </div>
  );
}
