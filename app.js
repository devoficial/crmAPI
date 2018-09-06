import express from "express";


const app =  express();
const PORT = 3000;



// connecting to the server
app.listen(PORT, () => console.log(`the app is listening on port ${PORT}`));