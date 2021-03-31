'use strict';


const express = require('express');
const validator = require('../middleware/validator.js');
const Food = require('../models/data-collection-class.js');
const foodModel = require('../models/food.js')
const food = new Food(foodModel);
const router = express.Router();




router.post('/',addFood);
router.get('/',getFood);
router.get('/:id', validator, getFoodById);
router.put('/:id', validator, updateFood);
router.delete('/:id', validator, deleteFood);


async function addFood(req,res) {

    const foodObject = req.body;
  try {
    const resObj = await food.create(foodObject);
    res.status(201).json(resObj);
  } catch (error) {
    throw new Error(error.message);
  }

    // const clothesObject = req.body;
    // const resObj = clothes.create(clothesObject);
    // res.status(201).json(resObj);
}

async function getFood(req,res,next) {
    try {
        const resObj = await food.read();
        res.json(resObj);
      } catch (error) {
        next(error);
      }
    // const resObj = clothes.read();
    // res.json(resObj);
}

async function getFoodById(req,res,next) {
    try {
        const resObj = await food.read(req.params.id);
        res.json(resObj[0]);
      } catch (error) {
        next(error);
      }

    // const resObj = clothes.read(req.params.id);
    // res.json(resObj);
}

async function updateFood(req,res) {
    const foodObject = req.body;
    try {
      const resObj = await food.update(req.params.id, foodObject);
      res.json(resObj);
    } catch (error) {
      throw new Error(error.message);
    }

    // const clothesObject = req.body;
    // const resObj = clothes.update(req.params.id, clothesObject);
    // res.json(resObj);
}

async function deleteFood(req,res,next) {
    try {
        const resObj = await food.delete(req.params.id);
        res.json(resObj);
      } catch (error) {
        next(error);
      }
    // const resObj = clothes.delete(req.params.id);
    // res.json(resObj);
}

module.exports = router;