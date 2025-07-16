// admin-routes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// this gets the account status from the spring boot api
// GET /accounts/status/:status
router.get('/accounts/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    // Forward call to Spring Boot: GET /account/status/PENDING, etc.
    const response = await axios.get(`http://localhost:8080/account/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching accounts by status:', error.message);
    return res.status(500).json({ message: 'Error fetching accounts by status' });
  }
});

//this updates the account status from the spring boot api
// PUT /accounts/:accountNo/status/:status
router.put('/accounts/:accountNo/status/:status', async (req, res) => {
  const { accountNo, status } = req.params;
  try {
    // Forward call to Spring Boot: PUT /account/{accountNo}/status/{status}
    const response = await axios.put(`http://localhost:8080/account/${accountNo}/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating account status:', error.message);
    return res.status(500).json({ message: 'Error updating account status' });
  }
});

module.exports = router;
