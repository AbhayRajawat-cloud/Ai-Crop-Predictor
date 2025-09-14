// backend/routes/predictRoute.js
import express from "express";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();

// quick test
router.get("/test", (req, res) => {
  res.json({ message: "✅ Predict route working!" });
});

// POST /predict  (this router is expected to be mounted at "/predict" in server.js)
router.post("/", (req, res) => {
  const inputData = req.body; // Expect full input object matching the model (Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide)

  // Resolve predictor.py path relative to the project backend root (robust to where node is started)
  const scriptPath = path.join(process.cwd(), "Ml_model", "predictor.py");

  // Spawn Python and pass the whole input JSON as a single CLI argument
  const pythonProcess = spawn("python3", [scriptPath, JSON.stringify(inputData)]);

  let result = "";
  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    // log Python errors to server console for debugging
    console.error(`❌ Python stderr: ${data.toString()}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        // predictor.py prints JSON like: {"predicted_yield": 4.34}
        const parsed = JSON.parse(result);
        return res.json(parsed);
      } catch (err) {
        console.error("Failed to parse model output:", result);
        return res.status(500).json({ error: "Invalid response from model", raw: result });
      }
    } else {
      return res.status(500).json({ error: `Model process exited with code ${code}` });
    }
  });
});

export default router;

