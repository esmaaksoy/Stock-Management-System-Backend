"use strict";

const Sale = require("../models/sale");
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Sale, {}, [
      { path: "userId", select: "username email" },
      "brandId",
      { path: "productId", select: "name", populate: { path: "categoryId" } },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Sale 1"
                }
            }
        */

    //! userId verisini req.user'dan al:
    req.body.userId = req.user._id;

    //! Güncel product bilgisini al:
    const currentProduct = await Product.findOne({ _id: req.body.productId });

    //! product miktarı yeterliyse satış yap
    if (currentProduct.quantity >= req.body.quantity) {
      const data = await Sale.create(req.body);

      //! Satış sonrası product'ın güncel stok adedini azalt:
      const updateProduct = await Product.updateOne(
        { _id: data.productId },
        { $inc: { quantity: -data.quantity } }
      );

      res.status(201).send({
        error: false,
        data,
      });
    } else {
      res.errorStatusCode = 422;
      throw new Error("There is not enough product-quantity for this sale.", {
        cause: { currentProduct },
      });
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */

    const data = await Sale.findOne({ _id: req.params.id }).populate([
      { path: "userId", select: "username email" },
      "brandId",
      { path: "productId", select: "name", populate: { path: "categoryId" } },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Sale 1"
                }
            }
        */

    if (req.body?.quantity) {
      //!  ilk girdiği değer ve güncelleme yaparken girdiği değer arasında fark olabilir, bunu da dinamik olarak yansıtmak istiyorum. Örn. ilk başta 5 tane ürün sattım ama sonra gidip güncelleme yaparak sattığın ürünü 8e çıkardım, price miktarında vs bir fark oluşabilir, bu nedenle bu farkı yansıtmalıyım

      //! mevcut adet bilgisini al:
      const currentSale = await Sale.findOne({ _id: req.params.id });

      //! farkı bul:
      const difference = req.body.quantity - currentSale.quantity;

      //! farkı Product'a kaydet:
      const updateProduct = await Product.updateOne(
        { _id: currentSale.productId, quantity: { $gte: difference } },
        { $inc: { quantity: -difference } }
      );

      //! Update işlemi olmamışsa, hata verdir. hata verince sistem devam etmeyecektir:
      if (updateProduct.modifiedCount == 0) {
        res.errorStatusCode = 422;
        throw new Error("There is not enough product-quantity for this sale.");
      }
    }

    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Sale.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Sale"
        */

    //! mevcut adet bilgisini al:
    const currentSale = await Sale.findOne({ _id: req.params.id });

    //! Delete:
    const data = await Sale.deleteOne({ _id: req.params.id });

    //! Adeti Product'dan arttır:
    const updateProduct = await Product.updateOne(
      { _id: currentSale.productId },
      { $inc: { quantity: +currentSale.quantity } }
    );

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
