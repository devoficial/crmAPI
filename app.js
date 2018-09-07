import express from "express";
import  jsonwebtoken from "jsonwebtoken";
// import User from "./source/models/userModel";
import apiRoutes from "./source/routes/crmRoutes";
import authRoutes from "./source/routes/authRoutes";
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

// JWT setup
app.use((req,res,next) => {
	if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0]==="JWT"){
		jsonwebtoken.verify(req.headers.authorization.split(" ")[1],"RESTFULAPIs",(err, decode) => {
			if(err) req.user = undefined;
			req.user = decode;
			next();
		});
	}else{
		req.user = undefined;
		next();
	}
});

// serving static files
app.use(express.static("public"));

// connected to routes
app.use("/api",apiRoutes);
app.use("/auth",authRoutes);

// connecting to the server
app.listen(PORT, () => console.log(`the app is listening on port ${PORT}`));