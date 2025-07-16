// admin-routes.js
// This file defines the admin endpoints for account requests,
// matching your friend’s API endpoints.

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Controller functions inline (or import from controllers/adminController.js if desired)
// For simplicity, we include the logic inline here.

router.get('/accounts/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    // Call Spring Boot backend endpoint: GET /account/status/{status}
    const response = await axios.get(`http://localhost:8080/account/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching accounts by status:', error.message);
    // Forward the error message
    return res.status(500).json({ message: 'Error fetching accounts by status' });
  }
}); 

router.put('/accounts/:accountNo/status/:status', async (req, res) => {
  const { accountNo, status } = req.params;
  try {
    // Call Spring Boot backend endpoint: PUT /account/{accountNo}/status/{status}
    const response = await axios.put(`http://localhost:8080/account/${accountNo}/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating account status:', error.message);
    return res.status(500).json({ message: 'Error updating account status' });
  }
});

module.exports = router;
