const mongoose = require("mongoose");


// Create Schema
const UserSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "Full Name is Required"],
        },

        image: {
            type: String,
        },

        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },

        password: {
            type: String,
            required: [true, "Password is Required"],
        },


        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        block: {
            type: Boolean,
            default: false,
        },

        bus_id: { type: mongoose.SchemaTypes.ObjectId, ref: "Bus", require: true },




    },
    { timestamps: true }
);



// @desc Create Model
const User = mongoose.model("User", UserSchema);
module.exports = User;
