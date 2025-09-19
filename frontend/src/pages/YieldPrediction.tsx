// frontend/src/pages/YieldPrediction.tsx
import React, { useState } from "react";
import { 
  Wheat, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Droplets, 
  Zap,
  AlertCircle,
  CheckCircle,
  Loader,
  BarChart3
} from "lucide-react";

const YieldPrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    Crop: "Wheat",
    State: "Punjab",
    Season: "Rabi",
    Crop_Year: 2023,
    Area: 10,
    Production: 45,
    Annual_Rainfall: 550,
    Fertilizer: 50,
    Pesticide: 2,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        ["Crop_Year", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide"].includes(
          name
        )
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:5000/api/predictRoute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      setPrediction(data.predicted_yield);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to get prediction. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const getFieldIcon = (fieldName: string) => {
    const icons: Record<string, any> = {
      Crop: Wheat,
      State: MapPin,
      Season: Calendar,
      Crop_Year: Calendar,
      Area: BarChart3,
      Production: TrendingUp,
      Annual_Rainfall: Droplets,
      Fertilizer: Zap,
      Pesticide: Zap
    };
    return icons[fieldName] || BarChart3;
  };

  const formatFieldName = (fieldName: string) => {
    const names: Record<string, string> = {
      Crop_Year: "Crop Year",
      Area: "Area (acres)",
      Production: "Production (tonnes)",
      Annual_Rainfall: "Annual Rainfall (mm)",
      Fertilizer: "Fertilizer (kg/acre)",
      Pesticide: "Pesticide (kg/acre)"
    };
    return names[fieldName] || fieldName.replace("_", " ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Wheat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Crop Yield Prediction</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage advanced machine learning to predict your crop yields with high accuracy based on agricultural parameters
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Input Parameters</h2>
              <p className="text-green-100 text-sm">Fill in your crop and farm details</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Dropdown Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Crop Selection */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Wheat className="w-4 h-4 text-green-600" />
                    <span>Crop Type</span>
                  </label>
                  <select
                    name="Crop"
                    value={formData.Crop}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="Rice">Rice</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Maize">Maize</option>
                    <option value="Sugarcane">Sugarcane</option>
                  </select>
                </div>

                {/* State Selection */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>State</span>
                  </label>
                  <select
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>

                {/* Season Selection */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Season</span>
                  </label>
                  <select
                    name="Season"
                    value={formData.Season}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="Kharif">Kharif (Monsoon)</option>
                    <option value="Rabi">Rabi (Winter)</option>
                    <option value="Zaid">Zaid (Summer)</option>
                  </select>
                </div>
              </div>

              {/* Numeric Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Crop_Year", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide"].map(
                  (field) => {
                    const IconComponent = getFieldIcon(field);
                    const colors = {
                      Crop_Year: "text-indigo-600 focus:ring-indigo-500",
                      Area: "text-emerald-600 focus:ring-emerald-500",
                      Production: "text-orange-600 focus:ring-orange-500",
                      Annual_Rainfall: "text-blue-600 focus:ring-blue-500",
                      Fertilizer: "text-yellow-600 focus:ring-yellow-500",
                      Pesticide: "text-red-600 focus:ring-red-500"
                    };
                    
                    return (
                      <div key={field} className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <IconComponent className={`w-4 h-4 ${colors[field as keyof typeof colors]?.split(' ')[0] || 'text-gray-600'}`} />
                          <span>{formatFieldName(field)}</span>
                        </label>
                        <input
                          type="number"
                          name={field}
                          value={(formData as any)[field]}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-gray-200 rounded-xl ${colors[field as keyof typeof colors]?.split(' ')[1] || 'focus:ring-gray-500'} focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white`}
                          required
                          min="0"
                          placeholder={`Enter ${formatFieldName(field).toLowerCase()}`}
                        />
                      </div>
                    );
                  }
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-lg active:scale-95"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Predict Yield</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results & Info Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 px-4 py-3">
                <div className="flex items-center space-x-2 text-white">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Prediction Error</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Prediction Result */}
          {prediction !== null && (
            <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3">
                <div className="flex items-center space-x-2 text-white">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Prediction Result</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {prediction.toFixed(2)}
                  </div>
                  <div className="text-lg font-medium text-gray-700">units/acres</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 space-y-2">
                  <h4 className="font-medium text-gray-800">Prediction Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Crop:</span>
                      <span className="font-medium">{formData.Crop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium">{formData.State}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Season:</span>
                      <span className="font-medium">{formData.Season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-medium">{formData.Crop_Year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3">
              <h3 className="font-semibold text-white">How It Works</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Our AI model analyzes historical agricultural data to predict crop yields</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Factors include rainfall, fertilizer usage, pesticide application, and regional data</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Predictions are based on machine learning models trained on extensive agricultural datasets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
