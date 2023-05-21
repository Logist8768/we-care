const mongoose = require("mongoose");


const BusSchema = new mongoose.Schema(
    {
        school: {
            type: String,
            required: [true, "School Name is Required"],
        },

        bus_number: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },

        camera_url: {
            type: String,
            required: [true, "camera_url is Required"],
        },


        destination: {
            type: { lat: Number, long: Number },
            require: true
        },

        current_location: {
            type: { lat: Number, long: Number },
            require: true
        },

        users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User", default: [] }],


    },
    { timestamps: true }
);



// @desc Create Model
const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;
