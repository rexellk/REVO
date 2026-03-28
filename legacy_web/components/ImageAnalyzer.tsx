import React, { useState } from 'react';
import { Upload, Camera, AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from './SharedUI';
import { analyzeVehicleImage } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface ImageAnalyzerProps {
  onClose: () => void;
}

export const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeVehicleImage(selectedImage);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-white overflow-y-auto">
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowRight className="rotate-180 text-gray-600" size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">AI Vehicle Diagnostics</h1>
          </div>
          <div className="text-xs font-medium text-revo-blue bg-blue-50 px-2 py-1 rounded-full">Gemini 3 Pro</div>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-8">
          {/* Upload Section */}
          <Card className="p-8 border-2 border-dashed border-gray-200 hover:border-revo-blue transition-colors bg-gray-50">
            {!selectedImage ? (
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Camera size={40} className="text-revo-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Upload Vehicle Photo</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                    Take a photo of the damage, dashboard light, or engine bay for instant AI analysis.
                  </p>
                </div>
                <label className="cursor-pointer">
                  <Button onClick={() => document.getElementById('file-upload')?.click()}>
                    Select Photo
                  </Button>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full max-w-md aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setSelectedImage(null)}>Retake</Button>
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    iconName={isAnalyzing ? "Loader2" : "Sparkles"}
                    className={isAnalyzing ? "opacity-80" : ""}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Issue"}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-success" /> Diagnostic Results
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Main Diagnosis */}
                <Card className="p-5 border-l-4 border-l-revo-blue md:col-span-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">AI Diagnosis</span>
                  <p className="text-lg font-medium text-gray-900 mt-1">{result.diagnosis}</p>
                </Card>

                {/* Severity & Cost */}
                <Card className="p-5">
                  <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Severity</span>
                  <div className="mt-2">
                    <Badge variant={
                      result.severity === 'HIGH' ? 'warning' : 
                      result.severity === 'MEDIUM' ? 'blue' : 'success'
                    }>
                      {result.severity} PRIORITY
                    </Badge>
                  </div>
                </Card>

                <Card className="p-5">
                  <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Est. Cost</span>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{result.estimatedCost}</p>
                </Card>

                {/* Action */}
                <Card className="p-5 md:col-span-2 bg-gradient-to-r from-revo-blue to-revo-dark text-white">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg">Recommended Service</h3>
                      <p className="text-blue-100">{result.recommendedService}</p>
                    </div>
                    <Button variant="secondary" className="whitespace-nowrap">
                      Find Mechanics
                    </Button>
                  </div>
                </Card>
              </div>
              
              <p className="text-xs text-gray-400 mt-6 text-center">
                * AI analysis is for informational purposes only. Always consult with a verified REVO mechanic for a final quote and safety inspection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};