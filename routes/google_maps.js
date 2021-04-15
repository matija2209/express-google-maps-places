const express = require('express')
const axios = require('axios');

router = express.Router()

const geocodeAddress = async (req,res) => {
    address = req.query.address
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    try {
        const response = await axios.get(url)
        const coordinates =  await response.data.results[0].geometry.location
        return coordinates
    }
    catch (e) {
        console.log("error");
    }
}

const nearbySearch = async (req,res) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
    const keyword = req.query.keyword
    const radius = req.query.radius

    try {
        const response = await axios.get(url, {
            params: {
                location: `${req.lat},${req.lng}`,
                radius: radius,
                keyword : keyword,
                key : process.env.GOOGLE_API_KEY
                }
          });
        return response
    } catch (e) {
        console.log(e);
    }
}

const getNearbyPlaces = async (req,res) => {
    const coordinates = await geocodeAddress(req,res);
    const lat = coordinates.lat
    const lng = coordinates.lng
    req.lat = lat
    req.lng = lng
    results = await nearbySearch(req,res)
    res.json(results.data.results)
}

router.post('/',getNearbyPlaces)
module.exports = router