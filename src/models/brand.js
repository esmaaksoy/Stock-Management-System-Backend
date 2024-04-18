"use strict";

const { mongoose } = require("../configs/dbConnection");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      trim: true,
      validate: {
        validator: function(img) {
          return /(https?:\/\/.*\.(?:png|jpg))/i.test(img);
        },
        message: props => `${props.value} is not a valid image url!`
      },
    },
  },
  {
    collection: "brands",
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", BrandSchema);
