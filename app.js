import express from "express";
import apiRoutes from "./source/routes/crmRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app =  express();
const PORT = 3000;

//MONGOOSE connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/crm",{useNewUrlParser:true}).then(() => console.log("connected to mongoose successfully"));

// Bodyparser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// serving static files
app.use(express.static("public"));

// connected to routes
app.use("/api",apiRoutes);

// connecting to the server
app.listen(PORT, () => console.log(`the app is listening on port ${PORT}`));