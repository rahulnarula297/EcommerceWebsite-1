const mongoose=require('mongoose');

const multer = require('multer');
const { type } = require('os');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const profileSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    profileimage: {
        type: String
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
    experience:{
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

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

profileSchema.statics.uploadedAvatar = multer({ storage: storage }).single('profileimage');
profileSchema.statics.avatarPath = AVATAR_PATH;

const Profile = mongoose.model('profile',profileSchema);
module.exports = Profile;