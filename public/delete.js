//JS file for front end confirmation box
function Jobdelete(id){
    const result = confirm("Are you sure you want to delete this ?");
    console.log(result); // Ye frontend JS hai so console will be printed on browser's console
    if(result){
        fetch('/deleteJob/'+id,{method:'POST'})
            .then((res)=>{
                if(res.ok){
                    window.location.href = '/jobs'; // Refresh the page
                }
            });
    }
}