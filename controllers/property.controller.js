const jwt = require('jsonwebtoken');
const request = require('request');
var ObjectId = require('mongoose').Types.ObjectId;

// Load Models.
const Property = require('../models/property.model');

const Messages = require('../config/messages.js');
const Config = require('../config/config.js');

async function createProperty(req, res) {
    const { 
        type, 
        name, 
        address,  
        description,  
        imageUrl,  
        totalRooms,  
        occupancyType,  
        rentAmount,  
        rentFrequency,  
        isPublished,
    } = req.body;

    const user = req.user

    if(!user.isActive){
        return res.status(501).send({
            result: false,
            error: Messages.USER_NOT_ACTIVE,
        });
    }

    // Check if property is existing with same name already.
    if (name && name.length > 0) {
        const p = await Property.findOne({name});
        if (p && p._id) {
            return res.status(501).send({
                result: false,
                error: Messages.PROPERTY_IS_EXIST,
            });
        }
    }

    let newProperty = Property();

    newProperty.type = type
    newProperty.name = name
    newProperty.address = address
    newProperty.description = description
    newProperty.imageUrl = imageUrl
    newProperty.totalRooms = totalRooms
    newProperty.occupancyType = occupancyType
    newProperty.rentAmount = rentAmount
    newProperty.rentFrequency = rentFrequency
    newProperty.isPublished = isPublished

    await newProperty.save();

    res.json({
        result: true,
        message: "property is created successfully",
        data: newProperty,
    });
};

async function updateProperty(req, res) {
    const property = req.body;

    const user = req.user

    if(!user.isActive){
        return res.status(501).send({
            result: false,
            error: Messages.USER_NOT_ACTIVE,
        });
    }

    // Check property ID.
    if (!(property && property.id && property.id.length > 0)) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }
    const p = await Property.findById(property.id);
    if (!p || !p._id) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }

    await Property.findByIdAndUpdate(ObjectId(property.id), property)

    res.json({
        result: true,
        message: "property is updated successfully",
    });
};

async function deleteProperty(req, res) {
    const { id } = req.body;

    const user = req.user

    if(!user.isActive){
        return res.status(501).send({
            result: false,
            error: Messages.USER_NOT_ACTIVE,
        });
    }

    // Check property ID.
    if (!(id && id.length > 0)) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }
    const p = await Property.findById(id);
    if (!p || !p._id) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }


    await Property.findByIdAndDelete(ObjectId(id))
    
    res.json({
        result: true,
        message: "property is deleted successfully",
    });
};

async function publishProperty(req, res) {
    const { id, isPublished } = req.body;

    const user = req.user

    if(!user.isActive){
        return res.status(501).send({
            result: false,
            error: Messages.USER_NOT_ACTIVE,
        });
    }

    // Check property ID.
    if (!(id && id.length > 0)) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }
    const p = await Property.findById(id);
    if (!p || !p._id) {
        return res.status(501).send({
            result: false,
            error: Messages.PROPERTY_NOT_EXIST,
        });
    }

    await Property.findByIdAndUpdate(ObjectId(id), { isPublished: isPublished })
    
    res.json({
        result: true,
        message: "property is published successfully",
    });
};


async function searchProperty(req, res) {
    const { search } = req.body;

    let reg = new RegExp(search, "g");

    const result = await Property.find({address: {$regex : reg}});

    console.log("search:", search);
    console.log("result:", result);
    
    res.json({
        result: true,
        message: "user is actived successfully",
        data: result,
    });
};

module.exports = {
    createProperty,
    updateProperty,
    deleteProperty,
    publishProperty,
    searchProperty
}