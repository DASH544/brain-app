import mongoose from "mongoose";
const connectDb=async()=>
    {
        try {
            await mongoose.connect(process.env.MONGO_URL,
                {
                    dbName:"brain-app"
                })
            console.log('mongodb is connected')
        } catch (error) {
            console.log(error)
        }
    }