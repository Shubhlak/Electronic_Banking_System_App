// user-routes.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// db.js is in the same folder
const db = require('./db');

const SPRING_BACKEND_URL = process.env.SPRING_BACKEND_URL || 'http://localhost:8080';

// -----------------------------------------------------------------------------
// LOGIN ROUTE (Checks if account is ACTIVE)
// -----------------------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing credentials' });
    }
    const [rows] = await db.query('SELECT * FROM login WHERE user_id = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Login failed: user not found' });
    }
    const user = rows[0];
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Login failed: incorrect password' });
    }

    // Retrieve account number from userInfo table
    const [userInfoRows] = await db.query('SELECT accountno FROM userInfo WHERE user_Id = ?', [username]);
    if (userInfoRows.length === 0) {
      return res.status(401).json({ success: false, message: 'Account information not found' });
    }
    const accountNo = userInfoRows[0].accountno;

    // Check if the account is ACTIVE in Spring Boot
    const springResponse = await axios.get(`${SPRING_BACKEND_URL}/account/checkaccountbalanace/${accountNo}`);
    const accountData = springResponse.data;

    if (!accountData || !accountData.status || accountData.status.toUpperCase() !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Admin has not approved your account yet.'
      });
    }

    // Mark user as logged in
    await db.query('UPDATE login SET logedinStatus = ? WHERE user_id = ?', ['true', username]);
    req.session.user = { username: user.user_id, userType: user.usertype };
    const token = jwt.sign({ username: user.user_id }, process.env.JWT_SECRET || 'jwtsecret', { expiresIn: '1h' });

    if (user.usertype === 'customer') {
      return res.json({ success: true, message: 'Login successful', token, redirect: '/welcome' });
    } else if (user.usertype === 'admin') {
      return res.json({ success: true, message: 'Directing to admin panel', token, redirect: '/admin' });
    } else {
      return res.status(401).json({ success: false, message: 'Login failed: invalid user type' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ success: false, message: 'Error during login' });
  }
});
// -----------------------------------------------------------------------------
// LOGOUT ROUTE
// -----------------------------------------------------------------------------
router.post('/logout', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      await db.query('UPDATE login SET logedinStatus = ? WHERE user_id = ?', ['false', req.session.user.username]);
    }
  } catch (error) {
    console.error('Error updating logedinStatus during logout:', error.message);
  }
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out successfully' });
  });
});

// -----------------------------------------------------------------------------
// REGISTER ROUTE
// (No more CREATE TABLE statements here, because we do it in server.js startup.)
// -----------------------------------------------------------------------------
router.post('/register', async (req, res) => {
  const {
    userId,
    password,
    userType,
    logedinStatus,
    bankName,
    upiPin,
    balance,
    bankIFSC,
    accountType,
    fname,
    lname,
    age,
    phoneno,
    adhar_card_no
  } = req.body;

  if (!userId || !password || !bankName || !upiPin || !balance || !bankIFSC || !accountType) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  let connection;
  try {
    connection = await db.getConnection();
    console.log('Database connection acquired');
    await connection.beginTransaction();
    console.log('Transaction started');

    // Insert user into login table
    await connection.query(
      `INSERT INTO login (user_id, password, usertype, logedinStatus)
       VALUES (?, ?, ?, ?)`,
      [userId, password, userType, logedinStatus]
    );
    console.log('Inserted into login table');

    // Call Spring Boot to create account
    const accountPayload = { bankName, upiPin, balance, userId, bankIFSC, accountType };
    console.log('Payload for Spring Boot:', accountPayload);

    const springResponse = await axios.post(`${SPRING_BACKEND_URL}/account/create_account`, accountPayload);
    console.log('Spring Boot response:', springResponse.data);

    if (!springResponse.data || !springResponse.data.accountNo) {
      throw new Error('Spring Boot response missing accountNo');
    }
    const { accountNo } = springResponse.data;

    // Insert userInfo
    await connection.query(
      `INSERT INTO userInfo (fname, lname, accountno, age, phoneno, adhar_card_no, user_Id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fname, lname, accountNo, parseInt(age) || null, phoneno, adhar_card_no, userId]
    );
    console.log('Inserted into userInfo table');

    await connection.commit();
    console.log('Transaction committed');

    return res.json({
      success: true,
      message: 'Account created successfully',
      accountDetails: springResponse.data
    });
  } catch (error) {
    console.error('Error in /register route:', error.message);
    if (connection) {
      await connection.rollback();
      console.log('Transaction rolled back');
    }
    return res.status(500).json({
      success: false,
      message: 'Account creation failed',
      error: error.message
    });
  } finally {
    if (connection) {
      connection.release();
      console.log('Database connection released');
    }
  }
});

// -----------------------------------------------------------------------------
// GET PROFILE ROUTE
// -----------------------------------------------------------------------------
router.get('/profile', async (req, res) => {
  if (!(req.session && req.session.user)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  const username = req.session.user.username;
  try {
    const [rows] = await db.query(`
      SELECT fname, lname, phoneno, adhar_card_no, accountno, age
      FROM userInfo
      WHERE user_Id = ?
    `, [username]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    let profileData = rows[0];
    // Check account details from Spring
    const accountResponse = await axios.get(`${SPRING_BACKEND_URL}/account/checkaccountbalanace/${profileData.accountno}`);
    const accountData = accountResponse.data;

    profileData.account_type = accountData.accountType || '';
    profileData.bank_ifsc = accountData.bankIFSC || '';

    return res.json({ success: true, profile: profileData });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return res.status(500).json({ success: false, message: 'Error fetching profile' });
  }
});

// -----------------------------------------------------------------------------
// UPDATE PROFILE ROUTE
// -----------------------------------------------------------------------------
router.put('/profile', async (req, res) => {
  if (!(req.session && req.session.user)) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  const username = req.session.user.username;
  const { fname, lname, phoneno } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE userInfo SET fname = ?, lname = ?, phoneno = ? WHERE user_Id = ?`,
      [fname, lname, phoneno, username]
    );
    if (result.affectedRows > 0) {
      return res.json({ success: true, message: 'Profile updated successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Profile update failed' });
    }
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

module.exports = router;
