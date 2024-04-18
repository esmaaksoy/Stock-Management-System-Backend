"use strict";

const { mongoose } = require("../configs/dbConnection");

const PurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      set: function () {
        return this.price * this.quantity;
      },
      default: function () {
        return this.price * this.quantity;
      },
      transform: function () {
        return this.price * this.quantity;
      },
    },
  },
  {
    collection: "purchases",
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
