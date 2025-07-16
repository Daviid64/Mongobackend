import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Creer un JWT d'une durée de 7 jours 

const generateToken = (userId)=>{
        return jwt.sign({id:userId}, process.env.JWT_SECRET)       
}

//Inscription

export const register = async (req , res)=>{
    const{name, email, password}= req.body;

    if (!name || !email || !password ){
        return res.json({message:"Mmmmmmmmmmmmmmmmmmmmm"})
    }

    try{
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: `Email existe déja`})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        //Creer lke user 

        const user = await User.create ({
            name, email, password: hashedPassword,
        })
        // reponse avec le token 
        res.status(201).json({
            user:{
                id:user._id,
                name: user.name,
                email:user.email
            },
            token: generateToken(user._id)
        })

    }catch(err){
        console.error(`Erreur lors de l'inscription , err.message`)
        res.status(500).json({message:'erreur'})
    }
}


// Login

export const loginUser = async(req, res)=>{
    const{email, password}= req.body;

    try{
        //On vérifie si le user existe 

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message:"Utilisateur existe peut etre "})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Email ou mot de passe incorrecte !!"})           
        }
        //La reponse avec un token et les infos 
        res.status(201).json({
            user:{
                id:user._id,
                name: user.name,
                email:user.email
            },
            token: generateToken(user._id)
        })


    }catch(err){
        console.error(`Erreur lors de la connexion , err.message`)
        res.status(500).json({message:'erreur'})
    }
}