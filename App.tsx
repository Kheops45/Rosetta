import React, { useState, useRef } from 'react';
import { AppMode, TranslationResult, LoadingState } from './types';
import { decodeHieroglyphsFromImage, encodeTextToHieroglyphs } from './services/geminiService';
import { GlassCard } from './components/GlassCard';
import { TabSwitcher } from './components/TabSwitcher';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultDisplay } from './components/ResultDisplay';
import { Background3D } from './components/Background3D';

const App: React.FC = () => {
  // Default to ENCODE (Translator) as requested
  const [mode, setMode] = useState<AppMode>(AppMode.ENCODE);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false, message: '' });
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDecode = async () => {
    if (!selectedImage) return;

    setLoading({ isLoading: true, message: 'Analyse en cours...' });
    setError(null);
    setResult(null);

    try {
      // Extract base64 data and mime type
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      const base64Data = selectedImage.split(',')[1];

      const data = await decodeHieroglyphsFromImage(base64Data, mimeType);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  const handleEncode = async () => {
    if (!inputText.trim()) return;

    setLoading({ isLoading: true, message: 'Conversion en cours...' });
    setError(null);
    setResult(null);

    try {
      const data = await encodeTextToHieroglyphs(inputText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading({ isLoading: false, message: '' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative selection:bg-amber-500/30 selection:text-amber-900">
      
      {/* Three.js Background */}
      <Background3D />

      <div className="relative z-10 min-h-screen w-full py-12 px-4 md:px-6 flex flex-col">
        
        {/* Increased max-width from max-w-md to max-w-2xl */}
        <div className="max-w-2xl mx-auto w-full flex-grow">
          {/* Header */}
          <div className="text-center mb-12 animate-[fadeInDown_1s_ease-out]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-[0_15px_30px_-5px_rgba(217,119,6,0.4)] mb-6 transform hover:scale-105 transition-transform duration-500 border border-white/20 relative overflow-hidden group">
               {/* Gloss effect */}
               <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
               
               {/* Stylized Pyramid Icon */}
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white drop-shadow-md relative z-10">
                <path d="M3 19h18L12 4z" fill="white" fillOpacity="0.2"/>
                <path d="M12 19V4"/>
                <path d="M12 4 7 19"/>
                <path d="M12 4 17 19"/>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight mb-2">
              Hierotrad<span className="text-amber-600">.AI</span>
            </h1>
            <p className="text-stone-500 text-xs font-medium tracking-[0.2em] uppercase">Décodeur Universel Égyptien</p>
          </div>

          <TabSwitcher currentMode={mode} onSwitch={(m) => {
            setMode(m);
            setResult(null);
            setError(null);
          }} />

          <main className="relative">
            {mode === AppMode.DECODE ? (
              <div className="animate-[fadeIn_0.4s_ease-in]">
                <GlassCard className="text-center relative overflow-hidden group transition-all duration-500 min-h-[400px] flex flex-col justify-center">
                  
                  {!selectedImage ? (
                    <div 
                      onClick={triggerFileInput}
                      // Increased padding for larger click area
                      className="border border-dashed border-stone-300 rounded-2xl p-24 cursor-pointer hover:bg-stone-50 hover:border-amber-400 transition-all duration-300 group h-full flex flex-col justify-center items-center"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <div className="w-20 h-20 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      </div>
                      <p className="text-lg font-bold text-stone-700 mb-2">Scanner un Artefact</p>
                      <p className="text-sm text-stone-400">Supporte JPG, PNG (Max 5MB)</p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-stone-100 w-full">
                       {/* Image Preview with increased max height */}
                      <img src={selectedImage} alt="Artifact" className="w-full h-auto max-h-[600px] object-contain bg-stone-900/5" />
                      
                      {/* Reset Button */}
                      <button 
                        onClick={() => {
                          setSelectedImage(null);
                          setResult(null);
                        }}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white text-stone-700 p-3 rounded-full backdrop-blur-md shadow-sm transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>

                      {/* Action Bar */}
                      {!result && !loading.isLoading && (
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-stone-900/60 to-transparent">
                          <button
                            onClick={handleDecode}
                            className="w-full bg-white text-amber-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 text-lg"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><path d="M12 6A9 9 0 0 1 3.89 16.45"/></svg>
                            Lancer l'Analyse
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </GlassCard>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.4s_ease-in]">
                <GlassCard>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-amber-600 uppercase tracking-widest">Entrée Texte</label>
                    <span className="text-xs text-stone-400 font-mono">FR → EGYPT</span>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Saisissez votre texte ici..."
                    // Increased height from h-36 to h-64, changed resize-none to resize-y
                    className="w-full h-64 bg-stone-50 border border-stone-200 rounded-xl p-6 text-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all resize-y mb-8 font-sans shadow-inner leading-relaxed"
                  />
                  <button
                    onClick={handleEncode}
                    disabled={!inputText.trim() || loading.isLoading}
                    className={`w-full font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 text-lg ${
                      !inputText.trim() ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/25'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                    Traduire
                  </button>
                </GlassCard>
              </div>
            )}

            {/* Loading State */}
            {loading.isLoading && (
              <div className="mt-8">
                <GlassCard className="!py-0">
                  <LoadingSpinner message={loading.message} />
                </GlassCard>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mt-8 animate-[fadeIn_0.3s]">
                <div className="bg-red-50 backdrop-blur-md border border-red-200 rounded-xl p-6 text-red-800 flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                  </div>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {result && !loading.isLoading && (
              <div className="mt-8">
                <ResultDisplay result={result} />
              </div>
            )}

          </main>
        </div>
        
        {/* Footer / Credits */}
        <footer className="mt-auto pt-12 text-center">
          <p className="text-stone-400 text-xs font-mono tracking-wider uppercase">
            Propulsé par Gemini 2.5 Flash
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;