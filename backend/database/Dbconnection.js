import mongoose from 'mongoose'



export const Dbconnection = () => {

    console.log("Your URI is:", process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI,{
        dbname : "rest"
    
    })
    .then(() =>{
        console.log("Successfully connected to Database")

    }).catch(err =>{
        console.log(`Some error occured while connecting to database!  ${err}`)

    })






};

