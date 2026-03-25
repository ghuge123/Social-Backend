import mongoose from 'mongoose';

const connectDb = async() =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/social');
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
};

export default connectDb;

