import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
          console.log("Database connected successfully");
        }
        )
        let mongoDBUri = process.env.MONGO_URI
        const projectName = 'resume-builder'

        if(!mongoDBUri){
            throw new Error("MONGODB_URI environment variable not set")
        }
        if(mongoDBUri.endsWith('/')){
            mongoDBUri = mongoDBUri.slice(0,-1)
        }
        await mongoose.connect(`${mongoDBUri}/${projectName}`);
        
    } catch (error) {
        console.error(`Error Connecting to MONGODB`, error);
    }
}