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
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPrediction(data.predicted_yield);
    } catch (err) {
      console.error("Error fetching prediction:", err);
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
          >
            <option>Rice</option>
            <option>Wheat</option>
            <option>Maize</option>
            <option>Sugarcane</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">State</label>
          <select
            name="State"
            value={formData.State}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Punjab</option>
            <option>Delhi</option>
            <option>Bihar</option>
            <option>Maharashtra</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Season</label>
          <select
            name="Season"
            value={formData.Season}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Kharif</option>
            <option>Rabi</option>
            <option>Zaid</option>
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
              />
            </div>
          )
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Predict
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-4 p-4 bg-green-100 border rounded">
          🌾 Predicted Yield: <strong>{prediction.toFixed(2)}</strong>
        </div>
      )}
    </div>
  );
};

export default YieldPrediction;
