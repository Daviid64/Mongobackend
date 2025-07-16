import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connexion à la base de donnée Réussi !!");

    }catch(error){
        console.error("Erreur lors de la connection a la base de donnée",err );
        process.exit(1)
    }
}

export default connectDB;