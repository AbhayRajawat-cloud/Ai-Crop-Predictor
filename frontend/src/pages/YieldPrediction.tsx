// frontend/src/pages/YieldPrediction.tsx
import React, { useState } from "react";

const YieldPrediction: React.FC = () => {
  const [formData, setFormData] = useState({
    Crop: "Wheat",
    State: "Punjab",
    Season: "Rabi",
    Crop_Year: 2023,
    Area: 100,
    Production: 200,
    Annual_Rainfall: 1200,
    Fertilizer: 50,
    Pesticide: 10,
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
      const res = await fetch("https://fuzzy-goldfish-pjqr7q99x4pvf7447-5000.app.github.dev/predict", {
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

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌱 AI Crop Yield Prediction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdowns */}
        <div>
          <label className="block font-medium">Crop</label>
          <select
            name="Crop"
            value={formData.Crop}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Maize">Maize</option>
            <option value="Sugarcane">Sugarcane</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">State</label>
          <select
            name="State"
            value={formData.State}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Punjab">Punjab</option>
            <option value="Delhi">Delhi</option>
            <option value="Bihar">Bihar</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Season</label>
          <select
            name="Season"
            value={formData.Season}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>
        </div>

        {/* Numeric Inputs */}
        {["Crop_Year", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide"].map(
          (field) => (
            <div key={field}>
              <label className="block font-medium">{field.replace("_", " ")}</label>
              <input
                type="number"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                min="0"
              />
            </div>
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "⏳ Predicting..." : "🔮 Predict"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded text-red-700">
          ❌ {error}
        </div>
      )}

      {prediction !== null && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="font-bold text-lg">🌾 Prediction Result</h3>
          <p className="mt-2">
            Predicted Yield: <strong>{prediction.toFixed(2)} units/hectare</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Based on your inputs for {formData.Crop} in {formData.State} ({formData.Season} season)
          </p>
        </div>
      )}
    </div>
  );
};

export default YieldPrediction;
