const queryDatabase = require("../tools/tools");
class UserController {

   
    async login(req,res,next){
        let login= req.body

        try {
            const sql = `SELECT id,DECODE(password,'test12345678901234567890') as pass from admins where id='${login.login}'`;
  
          const admin=await  queryDatabase(sql)
          console.log("dssd",admin);
          
          if(admin.length==0){
            res.json({flag:false})
            return
          }
          const pass= new TextDecoder('utf-8').decode(admin[0].pass)
          if(login.password==pass){
            
          res.json({flag:true})
          }else{
           
            console.log(pass);
            console.log(login.pass);
      
           return res.json({flag:false})
          }
        } catch (error) {
          console.log(error);
      return     res.json(error)
        }
    }

   
}
module.exports= new UserController()