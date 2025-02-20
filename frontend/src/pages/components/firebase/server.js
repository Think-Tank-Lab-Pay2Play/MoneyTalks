const express = require("express");
const multer = require("multer");
const cors = require("cors");
const admin = require("firebase-admin");
const uuid = require("uuid").v4;

const serviceAccount = require("./serviceAccountKey.json");

// node server.js

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "moneytalks-da829.firebasestorage.app"
});

const bucket = admin.storage().bucket();

const server = express();
server.use(cors());
server.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Ruta GET pentru upload
server.get("/upload", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Upload Imagine</title>
      </head>
      <body>
        <h1>Încarcă o imagine</h1>
        <form method="POST" action="/upload" enctype="multipart/form-data">
          <input type="file" name="image" accept="image/*" />
          <button type="submit">Încarcă</button>
        </form>
      </body>
    </html>
  `);
});

server.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  //logica upload
  try {
    // Creeaza un nume unic pentru fișier
    const filename = `upload/${uuid()}.png`;
    const file = bucket.file(filename);
    
    // Salveaza fisierul in buckets
    await file.save(req.file.buffer, { resumable: false });
    
    // Face fisierul public
    await file.makePublic();
    
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    
    res.json({ imageUrl: downloadURL });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Upload failed");
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
