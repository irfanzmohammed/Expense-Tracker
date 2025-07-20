export const validateLoginForm=(formdata)=>{
    let errors={};
  
    if(!formdata.email){
      errors.email='email is required'
    }
  
    else if(!/\S+@\S+\.\S+/.test(formdata.email)){
      errors.email='invalid email format'
    }
  
    if(!formdata.password){
      errors.password='password is required'
    }
    else if(!formdata.password.length==8){
      errors.password='Minimum 8 characters required'
    }
  
    return errors;
  }