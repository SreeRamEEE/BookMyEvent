const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const app = express();
const port = 8080;
const mongoUrl = process.env.MONGO_URI;

mongoose 
  .connect(mongoUrl)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// const store = new MongoDBStore({
//   uri: mongoUrl,
//   collection: "sessions",
// });

// -------------------- Middleware --------------------
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL (same in prod)
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store,
//     cookie: {
//       httpOnly: true,
//       secure: false, // true in HTTPS production
//       sameSite: "lax",
//       maxAge: 1000 * 60 * 60, // 1 hour
//     },
//   })
// );

app.use('/category_thumbnails', express.static(path.join(__dirname, 'category_thumbnails')));
app.use('/venue_images', express.static(path.join(__dirname, 'venue_images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// -------------------- Routes --------------------
const registerRoutes = require("./routes/register");
const categoryRoutes = require("./routes/categoryConfig");
const venueBookingRoutes = require("./routes/bookVenue");
const venueRoutes = require("./routes/venue");
const uploadTrackRoutes = require("./routes/uploadTrack");

app.use("/api", uploadTrackRoutes);

app.use("/api", venueRoutes);

app.use("/api", venueBookingRoutes);

app.use("/api", categoryRoutes);


app.use("/api", registerRoutes);
// app.use("/employees", employeeRoutes);
// app.use("/products", require("./routes/productRoute"));
// app.use("/videos", require("./routes/videoRoutes"));

app.use(express.static("public"));

 app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});