require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { InfluxDB } = require("@influxdata/influxdb-client");

const userRoutes = require('./routes/userRoutes/user');
const adminRoutes = require('./routes/hospital_admin_api');
const apiRoutes = require('./routes/userRoutes/api');
const appointmentRoutes = require('./routes/userRoutes/appointments_api');
const sensorRoutes = require("./routes/sensorRoutes/sensor_api"); // ✅ Import InfluxDB sensor API

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);
app.use('/api/appointment',appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/sensor-data", sensorRoutes); // ✅ Sensor Data API (InfluxDB)




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
