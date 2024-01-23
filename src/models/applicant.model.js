
var applications = {};
var savedApplication = {};
export function saveApplicant(_id,_name,_email,_contact,_resume){
    if (!savedApplication[_id]) {
      // console.log('1--------');
      savedApplication[_id] = [];
      savedApplication[_id].push({
          "name": _name,
          "email": _email,
          "contact": _contact,
          "resume":_resume
        }); 
      } else if(savedApplication[_id] && !applications[_id]) { // If no application of that id is submitted till now
        // console.log('2--------');
        savedApplication[_id][0].name = _name;
        savedApplication[_id][0].email = _email;
        savedApplication[_id][0].contact = _contact;
        savedApplication[_id][0].resume = _resume;
      }
      //If new submission of new person starts 
      else if(savedApplication[_id] && applications[_id] && applications[_id].length==savedApplication[_id].length){ 
        // console.log('3--------',applications[_id].length);
        savedApplication[_id].push({
          "name": _name,
          "email": _email,
          "contact": _contact,
          "resume":_resume
        });
      }
      //If the current has changed the values
      else if(savedApplication[_id] && applications[_id] && applications[_id].length<savedApplication[_id].length){
        // console.log('4--------');
        savedApplication[_id][applications[_id].length].name = _name;
        savedApplication[_id][applications[_id].length].email = _email;
        savedApplication[_id][applications[_id].length].contact = _contact;
        savedApplication[_id][applications[_id].length].resume = _resume;
      }
      //When we have multiple applicant 
      // applications[_id].push({
      //   "name": _name,
      //   "email": _email,
      //   "contact": _contact,
      //   "resume":_resume
      // });  
      console.log("Aplication saved",savedApplication);
      // if(applications[_id]) console.log('4-----', applications[_id].length); 
}
export function submitApplicant(_id,_name,_email,_contact,_resume){
  saveApplicant(_id,_name,_email,_contact,_resume);
  if (!applications[_id]) {
    applications[_id] = [];
  }
  // console.log('Length',applications[_id].length);
  applications[_id].push(savedApplication[_id][applications[_id].length]);
  // console.log("Aplication submitted",applications);
}
export function searchSavedApplicant(_id){
  return savedApplication[_id];
}
export function searchSubmitApplicant(_id){
  return applications[_id];
}
