const express = require('express');
const stripe = require('stripe')('your-stripe-secret-key');

const app = express();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Ebook Title',
        },
        unit_amount: 999, // Price in cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://your-website.com/success',
    cancel_url: 'https://your-website.com/cancel',
  });
  
  res.json({ id: session.id });
});

module.exports = app;
