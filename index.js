import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import { ApplicantController } from './src/controllers/applicant.controller.js';
import {uploadFile} from './src/middlewares/file-upload.middleware.js'
import { RecruiterController } from './src/controllers/recruiter.controller.js';
import { userController } from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
// import cookieParser from 'cookie-parser';

const server = express();

//Configuring middle-ware for session
server.use(session({
    secret: 'myproject',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

server.use(express.static('public')); 
server.use(express.urlencoded({extended:true}));
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);

const applicantControl = new ApplicantController();
server.get('/',applicantControl.homepage);
// server.use(express.static('src/views'));
server.get('/jobs',applicantControl.jobs);
server.post('/jobs',applicantControl.jobsCustomized);
server.get('/job-desc/:id',applicantControl.jobDesc);
server.post('/job-desc/:id',uploadFile.single('resume'),applicantControl.jobApplyOrSave);
const recruiterControl = new RecruiterController();
server.get('/postJob',auth,recruiterControl.postJobPage);
server.get('/updateJob/:id',auth,recruiterControl.updateJobPage);
server.get('/deleteJob/:id',auth,recruiterControl.deleteJob);
server.get('/jobs-desc/applicants/:id',auth,recruiterControl.applicantLists);
server.get('/logout',recruiterControl.logout);
server.post('/postJob',auth,recruiterControl.postJob);

const userControl = new userController();
server.post('/register',userControl.postRegister);
server.post('/login',userControl.postLogin);
server.post('/update/:id',recruiterControl.updateJob);
server.post('/deleteJob/:id',auth,recruiterControl.deleteJob);

server.listen(4000,()=>{
    console.log("Server started to listen on port 4000!");
})