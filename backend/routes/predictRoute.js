// backend/routes/predictRoute.js
const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

// ===== Test Route =====
router.get("/test", (req, res) => {
  res.json({ message: "✅ Predict route working!" });
});

// ===== POST /api/predict =====
// This will be mounted at /api/predict in server.js
router.post("/", (req, res) => {
  const inputData = req.body; 
  // Expecting full input object (Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide)

  // Robust path to predictor.py (from backend root)
  const scriptPath = path.join(process.cwd(), "Ml_model", "predictor.py");

  // Spawn Python process
  const pythonProcess = spawn("python3", [scriptPath, JSON.stringify(inputData)]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`❌ Python stderr: ${data.toString()}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        // Expect JSON output from predictor.py
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

module.exports = router;
