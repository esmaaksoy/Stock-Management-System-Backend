"use strict";

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
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

    const customFilters = req.user?.isAdmin ? {} : { _id: req.user._id };
    const data = await User.getModelList(User, customFilters);

    res.status(200).send({
      error: false,
      details: await User.getModelListDetails(User, customFilters),
      data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

    req.body.isStaff = false;
    req.body.isAdmin = false;
    const data = await User.create(req.body)

    res.status(201).send({
        error:false,
        data
    })
  },
//   read: async (req, res) => {},
//   update: async (req, res) => {},
//   delete: async (req, res) => {},
};
