const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    bakeryname:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    instaid:{
        type:String,
        required:true
    },
    fbid:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    areacovered:{
        type:String,
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    email:{
        type: mongoose.Schema.Types.String,
        ref:'User'
    }
});

const Profile = mongoose.model('profile',profileSchema);
module.exports = Profile;