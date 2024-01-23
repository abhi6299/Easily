export const auth = (req,res,next) => {
    console.log(req.session);
    if(req.session.userEmail){
        console.log("Verified");
        next();
    } else {
        let nameUser = 'Recruiter';
        if(req.session.userEmail){
            const x = userModel.returnName(req.session.userEmail);
            nameUser = x.name;
        }

        console.log("Not verified");
        res.render('oops',{nameUser});
    }
}