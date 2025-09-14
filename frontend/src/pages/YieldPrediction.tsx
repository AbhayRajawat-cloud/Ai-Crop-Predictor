import React, { useState } from "react";

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    rainfall: "",
    temperature: "",
    fertilizer: "",
  });
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/predict", {  // adjust backend port if different
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data.prediction); // assuming backend returns { prediction: value }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error fetching prediction");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">AI Yield Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="crop" value={formData.crop} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Select Crop</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
          </select>
          <input type="number" name="area" placeholder="Area (hectares)" value={formData.area} onChange={handleChange} className="w-full border rounded p-2" required />
          <input type="number" name="rainfall" placeholder="Rainfall (mm)" value={formData.rainfall} onChange={handleChange} className="w-full border rounded p-2" required />
          <input type="number" name="temperature" placeholder="Temperature (°C)" value={formData.temperature} onChange={handleChange} className="w-full border rounded p-2" required />
          <input type="number" name="fertilizer" placeholder="Fertilizer (kg/ha)" value={formData.fertilizer} onChange={handleChange} className="w-full border rounded p-2" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Predict Yield
          </button>
        </form>

        {prediction && (
          <div className="mt-6 p-4 bg-green-50 border rounded text-center text-lg font-semibold text-green-800">
            Predicted Yield: {prediction} tons/ha
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldPrediction;