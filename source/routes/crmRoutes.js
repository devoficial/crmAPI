import express  from  "express";

const router = express.Router();


router.route("/contact")
	.get((req,res,next) => {
		// middleware
		console.log(`Resquest from: ${req.originalUrl}`);
		console.log(`Request method: ${req.method}`);
		next();
	},(req,res,next) => {
		res.send("Get request is successfull");
	})
	.post((req,res) => {
		res.send("Post request is successfull");
	});


router.route("/contact/:contactId")
	.put((req,res) => {
		res.send("Put request is successfull");
	})
	.delete((req,res) => {
		res.send("Delete request is successfull");
	});


export default router;