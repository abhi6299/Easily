export default class jobsModel{
    constructor(_id,_company,_role,_location,_ctc,_skills,_category,_openings,_date){
        this.id=_id;
        this.company=_company;
        this.role=_role;
        this.location=_location;
        this.ctc=_ctc;
        this.skills=_skills;
        this.category=_category;
        this.openings=_openings;
        this.date=_date;
    }
    static get(){
        return jobs;
    }
    static jobDetails(id){
      return jobs.find(p=> p.id == id);
    }
    static addJob(_company,_role,_location,_ctc,_skills,_category,_openings,_date){
      const _id = jobs.length+1;
      const temp = new jobsModel(_id,_company,_role,_location,_ctc,_skills,_category,_openings,_date);
      jobs.push(temp);
    }
    static updateJob(_id,_company,_role,_location,_ctc,_skills,_category,_openings,_date){
      const index = jobs.findIndex(p=> p.id == _id)
      jobs[index].company = _company;
      jobs[index].role = _role;
      jobs[index].location = _location;
      jobs[index].ctc = _ctc;
      jobs[index].skills = _skills;
      jobs[index].category = _category;
      jobs[index].openings = _openings;
      jobs[index].date = _date;
      console.log(jobs[index]);
    }
    static deleteJob(id){
      const index = jobs.findIndex(p=> p.id == id);
      jobs.splice(index,1);
    }
    static getCustomized(input){
      const y = jobs.filter(p=>{
        if(p.id == input || p.company == input|| p.role == input|| p.location == input|| p.ctc == input|| p.category == input || p.skills.includes(input)){
          return p;
        }
      })
      return y;
    };
}
var jobs = [
    new jobsModel(
      1,
      'Coding Ninjas',
      'SDE',
      'Gurgaon',
      '140000',
      ['react','html'],
      'Tech',
      5,
      '2023-10-27'
    ),
    new jobsModel(
        2,
        'Coding Ninjas',
        'SDE',
        'Gurgaon',
        '1400000',
        ['react','html'],
        'Non-Tech',
        5,
        '2023-10-27'
      ),
      new jobsModel(
        3,
        'Coding Ninjas',
        'SDE',
        'Gurgaon',
        '1400000',
        ['react','html'],
        'Tech',
        5,
        '2023-10-27'
      ),
  ]