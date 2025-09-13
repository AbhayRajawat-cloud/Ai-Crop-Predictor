import express from "express";
import { spawn } from "child_process";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Predict route working!" });
});

router.post("/", (req, res) => {
  const inputData = req.body;  
  // Expecting: { "temperature": 25, "rainfall": 120, "soil_health": 0.8 }

  const pythonProcess = spawn("python3", [
    "backend/Ml_model/predictor.py",
    JSON.stringify(inputData)
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`❌ Python error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        const prediction = JSON.parse(result); 
        res.json(prediction);  // -> { "predicted_yield": 42.3 }
      } catch (e) {
        res.status(500).json({ error: "Invalid response from model" });
      }
    } else {
      res.status(500).json({ error: "Model execution failed" });
    }
  });
});

export default router;
