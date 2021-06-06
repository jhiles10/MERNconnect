import { Schema, model } from "mongoose";

// Create the user schema.
// When we request a user from the Database. these are the details we can get.
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String.apply,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default User = model("User", UserSchema);