import mongoose,{Schema,model} from 'mongoose';

const urlSchema=new Schema({
    originalUrl:{
        type:String,
        required:true,
    },
    shortId:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    }
})

urlSchema.index({expiresAt:1},{expireAfterSeconds:0});

const Url=model('Url',urlSchema);
export default Url;