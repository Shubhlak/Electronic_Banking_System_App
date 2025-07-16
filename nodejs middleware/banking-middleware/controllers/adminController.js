// controllers/adminController.js
const axios = require('axios');

// Spring Boot base URL
const SPRING_BOOT_URL = 'http://localhost:8080';


// this method gets the account status from the spring boot api
// GET /accounts/status/:status
exports.getAccountsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const response = await axios.get(`${SPRING_BOOT_URL}/account/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    return res.status(500).json({ message: 'Error fetching accounts by status' });
  }
};


// this method updates the account status from the spring boot api
// PUT /accounts/:accountNo/status/:status
exports.updateAccountStatus = async (req, res) => {
  const { accountNo, status } = req.params;
  try {
    const response = await axios.put(`${SPRING_BOOT_URL}/account/${accountNo}/status/${status}`);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error updating account status:', error.message);
    return res.status(500).json({ message: 'Error updating account status' });
  }
};
