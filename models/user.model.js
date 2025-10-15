import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchmea = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
     email:{
        type: String,
        required: true,
        unique: true,
    },
     password:{
        type: String,
        required: true,
    },
},{timestamps: true})

userSchmea.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchmea);

export default User;