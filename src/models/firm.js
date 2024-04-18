"use strict";

const { mongoose } = require("../configs/dbConnection");


const FirmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    phone: String,

    address: String,

    images: [
      {
        type: String,
        trim: true,
        validate: {
            validator: function(img) {
              return /(https?:\/\/.*\.(?:png|jpg))/i.test(img);
            },
            message: props => `${props.value} is not a valid image url!`
          },
      },
    ],
  },
  {
    collection: "firms",
    timestamps: true,
  }
);

module.exports = mongoose.model("Firm", FirmSchema);

