import userModel from "../models/user.model.js";
export class userController{
    getRegister(req,res){
        res.render("register");
        // res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }
    getLogin(req,res){
        res.render("login",{errorMsg:null});  
        // res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }

    postRegister(req,res){
        const {name,email,password} = req.body; // Extraccting values using 'Object destructuring' of req.body object
        userModel.addUser(name,email,password); // Add validation later-on
        console.log("Registered");
        // res.render('home',{errorMsg:null});
    }

    postLogin(req,res){
        const {email,password} = req.body; 
        const userExist = userModel.isValidUser(email,password);
        if(!userExist){
            let nameUser = 'Recruiter';
            if(req.session.userEmail){
                const x = userModel.returnName(req.session.userEmail);
                nameUser = x.name;
            }
        console.log('Not logged in');
        const a = "Not logged in, Please provide correct ID/Pswd for login :)"
        res.render('home',{nameUser,msg:a});  
        }else{
            const a = "Logged In, Thanks! :)";
            req.session.userEmail = email;
            let nameUser = 'Recruiter';
            if(req.session.userEmail){
                const x = userModel.returnName(req.session.userEmail);
                nameUser = x.name;
            }
            res.render('home',{nameUser,msg:a});            // let products = productModel.get();
            // res.render("products",{y:products, userEmail:req.session.userEmail});
        }
    }

    // logout(req,res){
    //     //on logout, destroy the session
    //     req.session.destroy((err)=>{
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.redirect('/login');
    //         }
    //     })
    //     res.clearCookie('lastVisit'); //NOTE res here 
    // }

}