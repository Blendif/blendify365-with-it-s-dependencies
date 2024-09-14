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

// Route to get all ebooks
app.get('/ebooks', (req, res) => {
  Ebook.find()
    .then(ebooks => res.json(ebooks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete an ebook
app.delete('/ebooks/:id', (req, res) => {
  Ebook.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Ebook deleted successfully' }))
    .catch(err => res.status(400).json('Error: ' + err));
});

const nodemailer = require('nodemailer');

// Set up Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// After Stripe Payment, Send Download Link
app.post('/send-email', (req, res) => {
  const { email, ebookTitle, downloadLink } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: `Your Purchase: ${ebookTitle}`,
    text: `Thank you for purchasing ${ebookTitle}. Here is your download link: ${downloadLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  });

 const { v4: uuidv4 } = require('uuid');

// Route to generate a unique download link
app.post('/generate-download-link', (req, res) => {
  const { ebookId, userId } = req.body;
  const downloadToken = uuidv4();  // Generate unique token
  const expiryTime = Date.now() + (24 * 60 * 60 * 1000);  // Link valid for 24 hours

  // Save token and expiry in the database (for simplicity, using ebookSchema)
  Ebook.findByIdAndUpdate(ebookId, {
    $set: {
      downloadToken: downloadToken,
      tokenExpiry: expiryTime
    }
  }).then(() => {
    const downloadLink = `http://localhost:5000/download/${ebookId}/${downloadToken}`;
    res.json({ downloadLink });
  }).catch(err => res.status(400).json('Error: ' + err));
});

// Route to validate and serve download
app.get('/download/:ebookId/:token', (req, res) => {
  Ebook.findById(req.params.ebookId)
    .then(ebook => {
      if (ebook.downloadToken === req.params.token && ebook.tokenExpiry > Date.now()) {
        res.sendFile(__dirname + `/uploads/${ebook.file}`);  // Serve the file
      } else {
        res.status(403).json({ message: 'Invalid or expired download link' });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
