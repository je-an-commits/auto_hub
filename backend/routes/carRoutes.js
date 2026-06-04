import express from "express";
import { createCars, getAllCars, updateCars, deleteCars } from "../controllers/carController.js"; 
const router = express.Router();

// routes
router.get("/", getAllCars);
router.post("/create", createCars);
router.put("/update/:id", updateCars);
router.delete("/delete/:id", deleteCars);

export default router;
