const Multer = require('multer');
const uuid = require('uuid').v4;

const upload = Multer({
    storage: Multer.diskStorage({
        
        filename: (req ,file , cb)=>{
            cb(null , uuid()+'-'+file.originalname )
        }
    })
})

const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware ;
