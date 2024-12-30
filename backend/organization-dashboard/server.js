const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const organizationRoutes = require("./routes/organizationRoutes");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", organizationRoutes);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connection establised with mongodb");
    }).catch((err) => {
        console.error(err);
    })
}

connectDB();


__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    console.log(path.join(__dirname, "/frontend/organization-dashboard/build"))
    app.use(express.static(path.join(__dirname, "/frontend/organization-dashboard/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend/organization-dashboard", "build", "index.html"));
    })
} else {
    app.get("*", (req, res) => {
        res.send("OOPS! Came to wrong place")
    })
}


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
