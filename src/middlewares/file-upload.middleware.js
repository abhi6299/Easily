import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log('HHII');
        cb(null,'public/resume/'); // Since no error therefore null given
    }, 
    filename:(req,file,cb)=>{
        const name = Date.now() + '-' +file.originalname;
        cb(null,name);
    }
});

export const uploadFile = multer({
    storage: storageConfig
});