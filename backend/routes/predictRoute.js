// backend/routes/predictRoute.js
const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

// quick test
router.get("/test", (req, res) => {
  res.json({ message: "✅ Predict route working!" });
});

// POST / (this router is mounted at /api/predictRoute in server.js)
router.post("/", (req, res) => {
  const inputData = req.body; // Expect full input object

  // Path to predictor.py relative to backend root
  const scriptPath = path.join(process.cwd(), "Ml_model", "predictor.py");

  // Use "py" for Windows, "python3" for Linux/Mac (can switch if needed)
  const pythonCmd = process.platform === "win32" ? "py" : "python3";

  // Spawn Python process with JSON input
  const pythonProcess = spawn(pythonCmd, [scriptPath, JSON.stringify(inputData)]);

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
        const parsed = JSON.parse(result);
        return res.json(parsed);
      } catch (err) {
        console.error("Failed to parse model output:", result);
        return res
          .status(500)
          .json({ error: "Invalid response from model", raw: result });
      }
    } else {
      return res
        .status(500)
        .json({ error: `Model process exited with code ${code}` });
    }
  });
});

module.exports = router;
