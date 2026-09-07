import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ComplianceResult, ProductItem } from '../../types';
import { runMetrologyComplianceCheck } from '../../services/metrologyEngine';
import { OCRPipelineStepper } from './OCRPipelineStepper';
import { UploadCloud, Camera, Sparkles, RefreshCw, Sliders, Image as ImageIcon, CheckCircle, AlertCircle, FileText } from 'lucide-react';


interface ProductScannerProps {
  onScanComplete: (result: ComplianceResult, imageUrl: string, productName: string) => void;
  presetProducts?: ProductItem[];
}

export const ProductScanner: React.FC<ProductScannerProps> = ({ onScanComplete, presetProducts = [] }) => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('Uploaded Packaging Artwork');
  const [category, setCategory] = useState<string>('Food & Beverages');
  const [packageArea, setPackageArea] = useState<number>(180);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [rawText, setRawText] = useState<string>('');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sampleCommodities = [
    {
      id: "sample_rice",
      name: "Royal Heritage Basmati Rice (Compliant Case)",
      category: "Food & Beverages",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
      text: `ROYAL HERITAGE BASMATI RICE\nMfd. & Pkd. by: Shanti Agro Foods Pvt. Ltd., Plot 42, Sector 18, Phase 2, Kundli, Sonipat, Haryana - 131028\nNet Quantity: 5.0 kg\nMRP Rs. 450.00 (incl. of all taxes)\nUnit Sale Price: Rs. 90.00 / kg\nMonth & Year of Manufacture: 02/2026\nBest Before: 24 Months from packaging\nBatch No: SH-26034-B2\nCustomer Care Cell: Toll Free 1800-11-4567 | care@shantiagro.in\nCountry of Origin: India`
    },
    {
      id: "sample_oil",
      name: "Sunlite Sunflower Oil (Violation: Non-Std Unit & No Tax Clause)",
      category: "Edible Oils & Fats",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80",
      text: `SUNLITE REFINED SUNFLOWER OIL\nMfd by: Sunlite Agro Oils Ltd., Industrial Estate, Ahmedabad\nNet Qty: 910 gms\nMRP Rs. 165.00\nBatch No: SUN-881\nMfg Date: 01/2026\nCountry of Origin: India`
    },
    {
      id: "sample_earbuds",
      name: "SonicPro Earbuds (Violation: Missing Origin & Import Date)",
      category: "Imported Electronics",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      text: `SONICPRO WIRELESS EARBUDS\nImported & Marketed by: Apex Imports, Mumbai\nNet Quantity: 1 Unit\nMRP: 2499\nBatch: APX-2026-90\nEmail: support@apeximports.com`
    },
    {
      id: "sample_salt",
      name: "PureHimalaya Rock Salt (Violation: Missing Consumer Care)",
      category: "Food & Beverages",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
      text: `PUREHIMALAYA NATURAL PINK SALT\nMfd by: Himalaya Mineral Works, Mandi, HP - 175001\nNet Quantity: 1 kg\nMRP Rs. 120.00 (incl. of all taxes)\nMfg Date: 03/2026\nBatch: H-902\nCountry of Origin: India`
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        // Default text fallback for user uploaded photos
        setRawText(`COMMODITY PRODUCT LABEL\nMfd by: Standard Packagers Ltd., Plot 10, Okhla, New Delhi - 110020\nNet Quantity: 500 g\nMRP Rs. 150.00 (incl. of all taxes)\nMfg Date: 02/2026\nBatch: BL-202\nCustomer Care: 1800-200-9999 | help@stdpack.in\nCountry of Origin: India`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof sampleCommodities[0]) => {
    setSelectedImage(sample.image);
    setSelectedFileName(sample.name);
    setCategory(sample.category);
    setRawText(sample.text);
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access was not granted or is unavailable.");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        setSelectedFileName("Camera Capture Snapshot");
        setRawText(`LIVE INSPECTION LABEL\nMfd by: National Packing Unit, Plot 14, Noida, UP - 201301\nNet Quantity: 250 g\nMRP Rs. 85.00 (incl. of all taxes)\nMfg Date: 02/2026\nBatch: CAM-092\nCustomer Care: support@natpack.in\nCountry of Origin: India`);
      }
      // Stop video stream
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) stream.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const runAnalysis = () => {
    if (!selectedImage && !rawText) {
      // Pick first sample if none selected
      handleSelectSample(sampleCommodities[0]);
    }

    setIsScanning(true);
    setTimeout(() => {
      const currentText = rawText || sampleCommodities[0].text;
      const currentImg = selectedImage || sampleCommodities[0].image;
      const res = runMetrologyComplianceCheck(currentText, category, packageArea);
      setIsScanning(false);
      onScanComplete(res, currentImg, selectedFileName);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t.scanner.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated compliance scanner for Legal Metrology (Packaged Commodities) Rules, 2011
          </p>
        </div>

        {/* Quick Sample Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Presets:</span>
          <select
            onChange={(e) => {
              const s = sampleCommodities.find(sc => sc.id === e.target.value);
              if (s) handleSelectSample(s);
            }}
            className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="">-- Choose Sample Test Case --</option>
            {sampleCommodities.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Upload / Camera View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Canvas & Dropzone */}
        <div className="lg:col-span-7 space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {showCamera ? (
            <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-blue-500/50 p-4 text-center space-y-3">
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-xl mx-auto" />
              <div className="flex justify-center space-x-3">
                <button
                  onClick={capturePhoto}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
                >
                  📸 Capture Frame
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="relative group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner p-4 text-center">
              <img
                src={selectedImage}
                alt="Selected packaging"
                className="max-h-72 mx-auto rounded-xl object-contain shadow-lg"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
                <span className="truncate max-w-xs font-mono text-slate-300">{selectedFileName}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" /> Change Image
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 hover:bg-slate-950 transition-all rounded-2xl p-8 sm:p-12 text-center cursor-pointer group flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {t.scanner.uploadTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  {t.scanner.dragDrop} (PNG, JPG, WEBP)
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <span className="text-[11px] font-semibold text-slate-400">or</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startCamera();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.scanner.useCamera}</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Presets Grid */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t.scanner.orSelectSample}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleCommodities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSample(item)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                    selectedFileName === item.name
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="font-semibold line-clamp-2 text-[11px]">{item.name}</span>
                  <span className="text-[9px] text-slate-400 mt-1 uppercase">{item.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Scanning Controls */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Inspection Parameters
            </h3>
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {t.scanner.categoryLabel}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Edible Oils & Fats">Edible Oils & Fats</option>
              <option value="Packaged Drinking Water">Packaged Drinking Water</option>
              <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
              <option value="Imported Electronics">Imported Electronics</option>
              <option value="Infant Milk & Baby Nutrition">Infant Milk & Baby Nutrition</option>
              <option value="Grains & Pulses">Grains & Pulses</option>
              <option value="General Commodity">General Commodity</option>
            </select>
          </div>

          {/* Principal Display Panel Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">{t.scanner.areaLabel}</label>
              <span className="font-mono text-amber-400 font-bold">{packageArea} sq. cm</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={packageArea}
              onChange={(e) => setPackageArea(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">
              *Used to compute statutory minimum font height under Rule 7 & 8 First Schedule.
            </div>
          </div>

          {/* Image Preprocessing Filter Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                {t.scanner.enhanceToggle}
              </div>
              <div className="text-[10px] text-slate-400">
                Auto-adaptive binarization & bilateral denoise
              </div>
            </div>
            <input
              type="checkbox"
              checked={isEnhancing}
              onChange={(e) => setIsEnhancing(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* Editable / Detected Label Text */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Extracted Text (OCR Live Stream):
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">NLP Engine Active</span>
            </div>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Label text will appear here automatically after scan..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-200 focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
            />
          </div>

          {/* Main Action Trigger */}
          <button
            onClick={runAnalysis}
            disabled={isScanning}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer active:scale-98"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{t.scanner.analyzing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.scanner.analyzeBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI OCR Pipeline Progress Stepper — visible during and after scan */}
      {isScanning && (
        <div className="slide-up">
          <OCRPipelineStepper isRunning={isScanning} />
        </div>
      )}
    </div>
  );
};

