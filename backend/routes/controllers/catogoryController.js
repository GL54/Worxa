const asyncHandler = require("express-async-handler");
const Catogory = require("../../model/catogoryModel");

const addCatogory = asyncHandler(async (req, res) => {
  const { catogory, image } = req.body;

  if (!catogory) {
    res.status(400);
    throw new Error("Please enter catogory");
  }

  //check if catogory already exists
  const catogoryExists = await Catogory.findOne({ catogory });

  if (catogoryExists) {
    res.status(400);
    throw new Error("Catogory already exists");
  }

  const newCatogory = await Catogory.create({ catogory, image });

  if (newCatogory) {
    res.status(201).json({
      _id: newCatogory.id,
      catogory: newCatogory.catogory,
      image: newCatogory.image,
    });
  } else {
    res.status(400);
    throw new Error("Catogory not added");
  }
});

const getCatogory = asyncHandler(async (req, res) => {
  const catogories = await Catogory.find();

  res.status(200).json(catogories);
});
module.exports = {
  addCatogory,
  getCatogory,
};
