import mongoose from "mongoose";

const potdSchema=new mongoose.Schema({
    platform:{type:String, required:true},
    url:{type:String,required:true},
    lastUpdated: { type: Date, default: Date.now }
});

export const Potd=mongoose.model('Potd',potdSchema);