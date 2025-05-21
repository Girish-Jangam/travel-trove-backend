const DestinationGuide = require("../models/DestinationGuide");
const TripItinerary = require("../models/TripItinerary");
const DestinationDetail = require("../models/DestinationDetail");
const TravelGroup = require("../models/TravelGroup");
const Favorite = require("../models/Favorite");
const UserItinerary = require("../models/UserItinerary");

const getDestinationGuides = async (req, res) => {
  try {
    const destinationGuides = await DestinationGuide.find();
    res.status(200).json(destinationGuides);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getTripItineraries = async (req, res) => {
  try {
    const tripItineraries = await TripItinerary.find();
    res.status(200).json(tripItineraries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const addDestinationGuide = async (req, res) => {
  const destinationData = req.body;
  try {
    const newDestination = new DestinationGuide(destinationData);
    await newDestination.save();
    res.status(201).json({ message: "Destination guide added successfully", destination: newDestination });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateDestinationGuide = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  // console.log("id" + req.params[0].title);
  const destinationData = req.body;
  console.log("destinationData" + destinationData)
  try {
    const updatedDestination = await DestinationGuide.updateOne({id:id}, {$set: destinationData}, { new: true });
    if (!updatedDestination) {
      return res.status(404).json({ error: "Destination guide not found" });
    }
    res.status(200).json({ message: "Destination guide updated successfully", destination: updatedDestination });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteDestinationGuide = async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await DestinationGuide.findByIdAndDelete(id);
    if (!destination) {
      return res.status(404).json({ error: "Destination guide not found" });
    }
    res.status(200).json({ message: "Destination guide deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const addTripItinerary = async (req, res) => {
  const itineraryData = req.body;
  try {
    const newItinerary = new TripItinerary(itineraryData);
    await newItinerary.save();
    res.status(201).json({ message: "Trip itinerary added successfully", itinerary: newItinerary });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTripItinerary = async (req, res) => {
  const { id } = req.params;
  const itineraryData = req.body;
  try {
    const updatedItinerary = await TripItinerary.updateOne({id:id}, {$set: itineraryData}, { new: true });
    if (!updatedItinerary) {
      return res.status(404).json({ error: "Trip itinerary not found" });
    }
    res.status(200).json({ message: "Trip itinerary updated successfully", itinerary: updatedItinerary });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTripItinerary = async (req, res) => {
  const { id } = req.params;
  try {
    const itinerary = await TripItinerary.findByIdAndDelete(id);
    if (!itinerary) {
      return res.status(404).json({ error: "Trip itinerary not found" });
    }
    res.status(200).json({ message: "Trip itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  const { destinationId, reviewId } = req.params;
  try {
    const destination = await DestinationDetail.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    destination.reviews = destination.reviews.filter(review => review.user !== reviewId);
    await destination.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getDestinationGuides,
  getTripItineraries,
  addDestinationGuide,
  updateDestinationGuide,
  deleteDestinationGuide,
  addTripItinerary,
  updateTripItinerary,
  deleteTripItinerary,
  deleteReview,
};