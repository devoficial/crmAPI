import express from "express";
import apiRoutes from "./source/routes/crmRoutes";

const app =  express();
const PORT = 3000;



app.use("/api",apiRoutes);

// connecting to the server
app.listen(PORT, () => console.log(`the app is listening on port ${PORT}`));