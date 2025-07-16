import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{
            type: String,
            required:[true,'Le nom est obligatoire'],
        },
        email: {
            type: String,
            required:[true,' Un email est obligatoire'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,     
            required:[true,' Un mot de passe est obligatoire'],
            minlenght : [8,'Le mot de passe doit contenir au minimum 8 caractères']
        },
    },
    {
        timestamps: true, //creer automatiquement une date 
    }
)

const User = mongoose.model('User',userSchema);

export default User;