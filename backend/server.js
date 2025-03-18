const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Duomenų bazės prisijungimas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Apibrėžiame maršrutus
app.use("/api/books", require("./routes/api/books"));
app.use("/api/search", require("./routes/api/search"));

// Paleidžiame serverį
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveris paleistas portu ${PORT}`));
