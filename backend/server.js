import express from 'express';
import cors from 'cors';
import { products, collections, stories } from './data/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store for simulated orders & newsletter
const orders = [];
const subscribers = [];

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root / Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'ATELIER VÉRONIQUE HAUTE COUTURE',
    timestamp: new Date().toISOString(),
    totalProducts: products.length,
    totalCollections: collections.length
  });
});

// Get all products with filters, search, and sorting
app.get('/api/products', (req, res) => {
  let result = [...products];
  const { category, collection, minPrice, maxPrice, search, sort, isNew, isBestseller } = req.query;

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (collection && collection !== 'All') {
    result = result.filter(p => p.collection.toLowerCase().includes(collection.toLowerCase()));
  }

  if (isNew === 'true') {
    result = result.filter(p => p.isNew);
  }

  if (isBestseller === 'true') {
    result = result.filter(p => p.isBestseller);
  }

  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  if (search) {
    const query = search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.json({
    success: true,
    count: result.length,
    products: result
  });
});

// Get single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product silhouette not found in the Atelier.' });
  }

  // Find related products in same category or collection
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 3);

  res.json({
    success: true,
    product,
    related
  });
});

// Get collections
app.get('/api/collections', (req, res) => {
  res.json({
    success: true,
    collections
  });
});

// Get single collection
app.get('/api/collections/:id', (req, res) => {
  const collection = collections.find(c => c.id === req.params.id);
  if (!collection) {
    return res.status(404).json({ success: false, message: 'Collection not found' });
  }
  const collectionProducts = products.filter(p => p.collection.toLowerCase().includes(collection.title.toLowerCase()) || p.collection === collection.id);
  res.json({
    success: true,
    collection,
    products: collectionProducts
  });
});

// Get editorial stories
app.get('/api/stories', (req, res) => {
  res.json({
    success: true,
    stories
  });
});

// Create Order (Simulated Checkout)
app.post('/api/orders', (req, res) => {
  const { customer, items, totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items are required to place an order.' });
  }

  const orderId = 'ATELIER-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    customer: customer || { name: 'Valued Patron', email: 'patron@atelier.com' },
    items,
    totalAmount,
    shippingAddress,
    paymentMethod: paymentMethod || 'Concierge Luxury Card / UPI',
    status: 'Confirmed & In Bespoke Tailoring',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: 'Haute Couture acquisition confirmed.',
    order: newOrder
  });
});

// Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order reference not found' });
  }
  res.json({ success: true, order });
});

// Consultations store
const consultations = [];

// Bespoke Consultation appointment booking
app.post('/api/consultations', (req, res) => {
  const { name, email, phone, date, timeSlot, silhouette, measurements, specialNotes } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Patron name and phone are required.' });
  }

  const consultationId = 'BESPOKE-' + Math.floor(10000 + Math.random() * 90000);
  const newBooking = {
    id: consultationId,
    name,
    email,
    phone,
    date,
    timeSlot,
    silhouette,
    measurements,
    specialNotes,
    status: 'Confirmed with Master Drape Tailor',
    createdAt: new Date().toISOString()
  };

  consultations.push(newBooking);
  res.status(201).json({
    success: true,
    message: 'Virtual Salon Consultation confirmed.',
    consultation: newBooking
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid royal correspondence email.' });
  }
  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  res.json({ success: true, message: 'Welcome to the inner circle of Atelier Véronique.' });
});

app.listen(PORT, () => {
  console.log(`✨ ATELIER Haute Couture Server running on http://localhost:${PORT}`);
});
