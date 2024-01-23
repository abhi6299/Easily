import jobsModel from "../models/jobs.model.js";
import {saveApplicant, submitApplicant, searchSavedApplicant, searchSubmitApplicant } from "../models/applicant.model.js";
import userModel from "../models/user.model.js";
export class ApplicantController{

    homepage(req,res,next){
        let a = null;
        let nameUser = 'Recruiter';  
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
            a = "Logged in, Thanks! :)"
        }
        res.render('home',{nameUser,msg:a});
    }

    jobs(req,res,next){
        //For changine name on the navbar
        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }
        const job = jobsModel.get();
        console.log(job);
        res.render('jobs', {x:job, nameUser});
    }

    jobsCustomized(req,res,next){
        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }
        const job = jobsModel.getCustomized(req.body.search);
        // const search = req.body.name;
        res.render('jobs', {x:job, nameUser});
    }

    jobDesc(req,res,next){
        const id = req.params.id;
        const jobFetch = jobsModel.jobDetails(id);
        let applicationsTotal = 0;
        let c =false //counter to check whether applicant has initailly submitted or saved his detail for the job
        const savedDetail = searchSavedApplicant(id);
        const submitDetail = searchSubmitApplicant(id);
        console.log('Fetched details',savedDetail);
        console.log('Submit  details',submitDetail);
        if(savedDetail!=undefined){
            c=true;
            //if submitted is present and is equal to mean we want entries to be empty
            //so c needs to false
            if(submitDetail){
                if(submitDetail.length == savedDetail.length)
                {
                    c=false;
                }
            }
        }
        if(submitDetail){
            applicationsTotal=submitDetail.length;
        }
        if(jobFetch){
            //For header recruiter name 
            let nameUser = 'Recruiter';
            let session = 'false';
            if(req.session.userEmail){
                const x = userModel.returnName(req.session.userEmail);
                nameUser = x.name;
                session = 'true';
            }
            res.render('job-desc', {x:jobFetch,applicantDetail:savedDetail,applicantSubmitDetail:submitDetail,check:c,applicationsTotal,nameUser });
        }
        else
            res.send('No valid job');
    }

    jobApplyOrSave(req,res,next){
        let name = '';
        let email = '';
        let contact = '';
        let resume =req.body.resumePath;
        if(req.body.name) name=req.body.name;
        if(req.body.email) email=req.body.email;
        if(req.body.contact) contact=req.body.contact;
        if(req.file){
            resume=req.file.filename;
        }
        const clickedBtn = req.body.submit;
        console.log(clickedBtn);
        if(clickedBtn == 'apply'){
            submitApplicant(req.params.id,name,email,contact,resume);
            res.redirect('/jobs');
        }
        else if(clickedBtn == 'save'){
            saveApplicant(req.params.id,name,email,contact,resume);
            res.redirect('/job-desc/'+req.params.id);
        }
    }
    

}