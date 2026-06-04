import * as CarModel from "../models/carModel.js"

export const createCars = async (req, res) => {
    const { name, brand, price, year, status } = req.body;

    try{
        const create = CarModel.createCar(name, brand, price, year, status);
        return res.status(201).json(create);
    }catch(error){
        return res.json(error);
    }
};

export const getAllCars =  async (req, res) => {
    const allCars = await CarModel.getCars();
    if(!allCars){
        return res.status(404).json({ message: "Something went wrong, please try again."})
    }
    return res.status(200).json({
        message: "Success",
        allCars
    });
};

export const updateCars = async (req, res) => {
    const id = req.params.id;
    const { name, brand, price, year, status } = req.body;
    try {
        const result = await CarModel.updateCar(id, { name, brand, price, year, status });
        return res.status(200).json({ message: "Car updated successfully", result });
    } catch (error) {
        return res.status(500).json(error);
        
    }
};

export const deleteCars = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await CarModel.deleteCar(id);
        return res.status(201).json(result);
    }catch(error){
        return res.json(error);
    }
};