const mongoose = require("mongoose");

const catogorySchema = mongoose.Schema(
  {
    catogory: {
      type: String,
      required: [true, "Enter the catogory"],
    },
    image: {
      type: String,
      required: [false, "Enter the image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Catogory", catogorySchema);
