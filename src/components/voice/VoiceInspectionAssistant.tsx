import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, Check, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInspectionAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onCommand?: (command: string) => void;
}

export const VoiceInspectionAssistant: React.FC<VoiceInspectionAssistantProps> = ({
  isOpen,
  onClose,
  onCommand
}) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>(
    "Hello Officer. I am your Legal Metrology Voice Assistant. Say 'Check this product' or 'Explain Rule 6' to begin."
  );

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Mock voice response if browser doesn't have Web Speech API enabled
      setIsListening(true);
      setTranscript("Checking Basmati Rice packaging...");
      setTimeout(() => {
        handleProcessVoiceCommand("check this product");
        setIsListening(false);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const speechText = event.results[0][0].transcript;
        setTranscript(speechText);
        handleProcessVoiceCommand(speechText);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleProcessVoiceCommand = (rawCmd: string) => {
    const cmd = rawCmd.toLowerCase();
    let reply = "";

    if (cmd.includes("check") || cmd.includes("scan") || cmd.includes("inspect")) {
      reply = "Initiating packaging label scan. Running OCR and Legal Metrology Rules verification engine now.";
      if (onCommand) onCommand("scan");
    } else if (cmd.includes("rule 6") || cmd.includes("rule six")) {
      reply = "Rule 6 mandates 7 core declarations: Manufacturer address with PIN, Generic name, Net quantity in standard units, Month and Year of manufacture, MRP inclusive of taxes, Consumer care helpline, and Country of origin.";
    } else if (cmd.includes("violation") || cmd.includes("penalty")) {
      reply = "Contravention of Legal Metrology Packaged Commodities Rules attracts fine up to ₹25,000 for first offence under Section 36(1).";
    } else if (cmd.includes("notice") || cmd.includes("form")) {
      reply = "Opening Statutory Inspection Notice generator Form-1.";
      if (onCommand) onCommand("notice");
    } else {
      reply = `Received voice command: "${rawCmd}". Processing statutory inspection directive.`;
    }

    setAiResponse(reply);
    speakText(reply);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{t.voice.title}</h3>
            <p className="text-xs text-slate-400">Hands-Free Officer Field Assistant</p>
          </div>
        </div>

        {/* Voice Pulse Animation */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.6)]'
                : 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 hover:scale-105 shadow-amber-500/20'
            }`}
          >
            {isListening ? <Mic className="w-10 h-10 animate-bounce" /> : <Mic className="w-10 h-10" />}
          </button>
          <p className="text-xs font-semibold text-slate-300">
            {isListening ? t.voice.listening : t.voice.clickToSpeak}
          </p>
        </div>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Recognized Speech:</span>
            <span className="text-amber-400 font-mono italic">"{transcript}"</span>
          </div>
        )}

        {/* AI Voice Response Output */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px] text-blue-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Assistant Response:
            </span>
            <button
              onClick={() => speakText(aiResponse)}
              className="text-slate-400 hover:text-white"
              title="Repeat Audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-200 leading-relaxed">{aiResponse}</p>
        </div>

        {/* Suggested Voice Commands */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Try speaking these commands:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[
              "Check this product",
              "Explain Rule 6",
              "Show violations",
              "Generate notice"
            ].map((cmd, i) => (
              <button
                key={i}
                onClick={() => {
                  setTranscript(cmd);
                  handleProcessVoiceCommand(cmd);
                }}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-left truncate cursor-pointer"
              >
                🎙️ "{cmd}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
