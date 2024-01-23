import jobsModel from "../models/jobs.model.js"
import userModel from "../models/user.model.js";
import { searchSubmitApplicant } from "../models/applicant.model.js";
export class RecruiterController{

    postJobPage(req,res,next){
        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }
        res.render('postJob',{nameUser});
    }

    postJob(req,res,next){
        // console.log(req.body);
        // console.log(req.body.skills.length);
        let {company,role,location,ctc,skills,category,opening,date} = req.body;
        if(skills == undefined){
            skills=[];
          }
        if(typeof skills === "string"){
            let s = skills.split(",");
            skills = s;
        }
        jobsModel.addJob(company,role,location,ctc,skills,category,opening,date);
        const job = jobsModel.get();
        res.redirect('jobs');
    }

    updateJobPage(req,res,next){
        console.log("Inside updateJOBPage");
        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }
        let check=false;
        const id = req.params.id;
        const selectedJob = jobsModel.jobDetails(id);
        if(selectedJob){
            check=true;
            console.log(selectedJob.skills);
        }
        return res.render('updateJob',{id,selectedJob,check,nameUser});
    }
    updateJob(req,res,next){
        const id = req.params.id;
        let {company,role,location,ctc,skills,category,opening,date} = req.body;
        if(skills == undefined)
        {
            skills=[];
        }
        if(typeof skills === "string"){
            let s = skills.split(",");
            skills = s;
        }
        jobsModel.updateJob(id,company,role,location,ctc,skills,category,opening,date);
        res.redirect('/job-desc/'+id);
    }
    deleteJob(req,res,next){
        const id= req.params.id;
        jobsModel.deleteJob(id);
        res.redirect('/jobs')
    }

    applicantLists(req,res,next){

        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }

        const id= req.params.id;
        const list=searchSubmitApplicant(id);
        console.log(list);
        res.render('applicants',{list,nameUser});
    }

    logout(req,res){
        //on logout, destroy the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
        // res.clearCookie('lastVisit'); //NOTE res here 
    }
}