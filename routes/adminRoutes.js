const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../../Backend/services/admin');
const {
  getDestinationGuides,
  getTripItineraries,
  addDestinationGuide,
  updateDestinationGuide,
  deleteDestinationGuide,
  addTripItinerary,
  updateTripItinerary,
  deleteTripItinerary,
} = require("../services/adminService");
const authenticate = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

// Admin login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const token = await loginAdmin(email, password);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Register an admin (Use with caution)
router.post('/register', async (req, res) => {
    
    const {  password, email } = req.body;
    try {
        const admin = await registerAdmin( password, email);
        res.json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Middleware to ensure only admins can access these routes
// router.use(authenticate, isAdmin);

// Get all destination guides
router.get("/destinationGuides",  getDestinationGuides);

// Get all trip itineraries
router.get("/tripItineraries", getTripItineraries);

// Add a new destination guide
router.post("/destinationGuides", addDestinationGuide);

// Update a destination guide
router.put("/destinationGuides/:id", updateDestinationGuide);

// Delete a destination guide
router.delete("/destinationGuides/:id", deleteDestinationGuide);

// Add a new trip itinerary
router.post("/tripItineraries", addTripItinerary);

// Update a trip itinerary
router.put("/tripItineraries/:id", updateTripItinerary);

// Delete a trip itinerary
router.delete("/tripItineraries/:id", deleteTripItinerary);

// Delete a review from a destination guide
// router.delete("/destinationDetails/:destinationId/reviews/:reviewId", deleteReview);

module.exports = router;
