const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3000;

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Serve frontend files
app.use(express.static("public"));

// Weather API
app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({
                message: "City name is required"
            });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                message: data.message || "Unable to get weather data"
            });
        }

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Weather App running at http://localhost:${PORT}`);
});