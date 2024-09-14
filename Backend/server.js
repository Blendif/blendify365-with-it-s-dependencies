const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/blendify365', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Example route for saving an ebook
app.post('/upload-ebook', (req, res) => {
  const { title, description, file } = req.body;
  const newEbook = new Ebook({ title, description, file });
  newEbook.save()
    .then(() => res.json('Ebook uploaded successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Ebook Schema (MongoDB)
const ebookSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String, // Path to uploaded file
});

const Ebook = mongoose.model('Ebook', ebookSchema);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
