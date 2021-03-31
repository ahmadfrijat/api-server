'use strict';

const express = require('express');
const validator = require('../middleware/validator.js');
const Clothes = require('../models/data-collection-class.js');
const clothesModel = require('../models/clothes.js')
const clothes = new Clothes(clothesModel);
const router = express.Router();


router.post('/',addClothes);
router.get('/',getClothes);
router.get('/:id', validator, getClothesById);
router.put('/:id', validator, updateClothes);
router.delete('/:id', validator, deleteClothes);


async function addClothes(req,res) {

    const clothesObject = req.body;
  try {
    const resObj = await clothes.create(clothesObject);
    res.status(201).json(resObj);
  } catch (error) {
    throw new Error(error.message);
  }

    // const clothesObject = req.body;
    // const resObj = clothes.create(clothesObject);
    // res.status(201).json(resObj);
}

async function getClothes(req,res,next) {
    try {
        const resObj = await clothes.read();
        res.json(resObj);
      } catch (error) {
        next(error);
      }
    // const resObj = clothes.read();
    // res.json(resObj);
}

async function getClothesById(req,res,next) {
    try {
        const resObj = await clothes.read(req.params.id);
        res.json(resObj[0]);
      } catch (error) {
        next(error);
      }

    // const resObj = clothes.read(req.params.id);
    // res.json(resObj);
}

async function updateClothes(req,res) {
    const clothesObject = req.body;
    try {
      const resObj = await clothes.update(req.params.id, clothesObject);
      res.json(resObj);
    } catch (error) {
      throw new Error(error.message);
    }

    // const clothesObject = req.body;
    // const resObj = clothes.update(req.params.id, clothesObject);
    // res.json(resObj);
}

async function deleteClothes(req,res,next) {
    try {
        const resObj = await clothes.delete(req.params.id);
        res.json(resObj);
      } catch (error) {
        next(error);
      }
    // const resObj = clothes.delete(req.params.id);
    // res.json(resObj);
}

module.exports = router;