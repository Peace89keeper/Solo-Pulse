import mongoose from "mongoose";
import { isValidElement } from "react";
import validator from "validator";

const reservationschema = new mongoose.Schema({
  firstname: {
    type: String,
    required : true,
    minlength : [3 , "Aleast 3 letters"],
    maxLength : [20 , "Almost 20 letters"]
  },
  lastname: {
    type: String,
    required : true,
    minlength : [3 , "Aleast 3 letters"],
    maxLength : [20 , "Almost 20 letters"]
  },
  email: {
    type: String,
    required : true,
    validator: [validator.isEmail , "provide is valid email"]
  },
  phone_number: {
    type: Number ,
    required : true,
     minlength : [10 , "Aleast 10 numbers"],
    maxLength : [10 , "Almost 10 numbers"]

    
  },
  time: {
    type: String ,
    required : true,
    

    
  },
  date: {
    type: String ,
    required : true,
     

    
  },




});

export const Reservation = mongoose.model("Reservation", reservationschema);

