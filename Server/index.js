import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// Enable CORS for all origins (adjust as needed)
app.use(cors());

// Set up body parsing middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle shared images
app.post("/share-file-handler", upload.single("file"), (req, res) => {
  // req.body should be available now
  const { name, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  console.log("Received shared content:");
  console.log("Name:", name);
  console.log("Description:", description);
  console.log("File:", file);

  res.status(200).send("Image shared successfully!");
});

// Ensure "uploads" folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
