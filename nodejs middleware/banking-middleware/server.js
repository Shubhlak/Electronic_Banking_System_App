// server.js
require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import MySQL connection pool from db.js
const db = require('./db');

// Import admin routes (for /api/accounts/... endpoints)
const adminRoutes = require('./admin-routes');

// Import user routes (login, register, etc.)
const userRoutes = require('./user-routes');

const app = express();

// Load environment variables or use defaults
const PORT = process.env.PORT || 5000;
const SPRING_BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';

// -----------------------------------------------------------------------------
// MIDDLEWARE SETUP
// -----------------------------------------------------------------------------
app.use(cors({
  origin: 'http://localhost:4200',  // Angular app domain
  credentials: true
}));

// Enable preflight (OPTIONS) for all routes
app.options('*', cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Mount admin routes first so calls like /api/accounts/status/PENDING don't go to the proxy
app.use('/api', adminRoutes);

app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// -----------------------------------------------------------------------------
// AUTHENTICATION MIDDLEWARE
// -----------------------------------------------------------------------------
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Unauthorized' });
}

// -----------------------------------------------------------------------------
// MOUNT USER ROUTES
// -----------------------------------------------------------------------------
app.use('/', userRoutes);

// -----------------------------------------------------------------------------
// API PROXY (after admin routes are handled)
// -----------------------------------------------------------------------------
app.use('/api', isAuthenticated, async (req, res) => {
  try {
    const targetUrl = `${SPRING_BACKEND_URL}${req.originalUrl.replace(/^\/api/, '')}`;
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { 'Content-Type': req.get('Content-Type') }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API Proxy error:', error.message);
    return res.status(500).json({ success: false, message: 'Error forwarding request to Spring Boot' });
  }
});

// -----------------------------------------------------------------------------
// NEW CODE: Ensure Tables + Default Admin
// -----------------------------------------------------------------------------
async function ensureTablesExist() {
  // Create login table if not exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS login (
      user_id VARCHAR(50) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      usertype VARCHAR(50),
      logedinStatus VARCHAR(10)
    )
  `);

  // Create userInfo table if not exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS userInfo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fname VARCHAR(50),
      lname VARCHAR(50),
      accountno VARCHAR(50),
      age INT,
      phoneno VARCHAR(20),
      adhar_card_no VARCHAR(20),
      user_Id VARCHAR(50)
    )
  `);
  console.log('Tables login and userInfo ensured.');
}

async function ensureDefaultAdminUser() {
  try {
    // 1) Ensure tables exist first
    await ensureTablesExist();

    // 2) Check if 'ADMIN' user is in login table
    const [loginRows] = await db.query('SELECT * FROM login WHERE user_id = ?', ['ADMIN']);
    if (loginRows.length === 0) {
      console.log('Creating default admin user in login table...');
      await db.query(`
        INSERT INTO login (user_id, password, usertype, logedinStatus)
        VALUES ('ADMIN', '1234', 'admin', 'false')
      `);
    }

    // 3) Check if 'ADMIN' is in userInfo
    const [userInfoRows] = await db.query('SELECT accountno FROM userInfo WHERE user_Id = ?', ['ADMIN']);
    if (userInfoRows.length === 0) {
      console.log('Creating default userInfo + account for ADMIN via Spring Boot...');
      const accountPayload = {
        bankName: 'ADMINBANK',
        upiPin: '0000',
        balance: 0,
        userId: 'ADMIN',
        bankIFSC: 'ADMIN0001',
        accountType: 'SAVINGS'
      };
      const springResponse = await axios.post(`${SPRING_BACKEND_URL}/account/create_account`, accountPayload);
      const { accountNo } = springResponse.data;

      await db.query(`
        INSERT INTO userInfo (fname, lname, accountno, age, phoneno, adhar_card_no, user_Id)
        VALUES ('ADMIN', 'ADMIN', ?, 30, '0000000000', '9999', 'ADMIN')
      `, [accountNo]);

      // Mark the newly created account as ACTIVE in Spring Boot
      await axios.put(`${SPRING_BACKEND_URL}/account/${accountNo}/status/ACTIVE`);
      console.log(`Admin account created with accountNo=${accountNo} and set to ACTIVE`);
    } else {
      console.log('Admin user already exists in userInfo table.');
    }
  } catch (err) {
    console.error('Error ensuring default admin user:', err.message);
  }
}

// -----------------------------------------------------------------------------
// START THE SERVER
// -----------------------------------------------------------------------------
app.listen(PORT, async () => {
  console.log(`Middleware server running on http://localhost:${PORT}`);
  // Ensure the default admin user is created
  await ensureDefaultAdminUser();
});
