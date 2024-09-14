const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Set up file storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://localhost/blendify365', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Ebook Schema (MongoDB)
const ebookSchema = new mongoose.Schema({
  title: String,
  description: String,
  file: String, // Path to uploaded file
});

const Ebook = mongoose.model('Ebook', ebookSchema);

// Upload Ebook route
app.post('/upload-ebook', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const file = req.file ? req.file.filename : null;

  const newEbook = new Ebook({ title, description, file });
  
  newEbook.save()
    .then(() => res.json({ message: 'Ebook uploaded successfully' }))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Example route for saving an ebook
app.post('/upload-ebook', (req, res) => {
  const { title, description, file } = req.body;
  const newEbook = new Ebook({ title, description, file });
  newEbook.save()
    .then(() => res.json('Ebook uploaded successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

const stripe = require('stripe')('your-stripe-secret-key');

app.post('/create-checkout-session', async (req, res) => {
  const { ebookTitle, ebookPrice } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: ebookTitle,
        },
        unit_amount: ebookPrice * 100, // Convert to cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ id: session.id });
});
