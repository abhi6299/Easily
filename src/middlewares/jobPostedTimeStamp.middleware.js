export const setLastvisit = (req,res,next) => {
    //if cookie is set, then add local variable with last visit time data

    if(req.cookies.lastVisit){ //lastVisit is name of the cookiw created below
        next();
    }else{
        //Setting new time to cookies for every request we make
        res.cookie('lastVisit', new Date().toISOString(), //NOTE res 
        { 
            maxAge: 2*24*60*60*1000  // take value as miliseconds; maxAge 
        })
        next();
    }
}