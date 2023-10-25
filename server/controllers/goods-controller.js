const queryDatabase = require("../tools/tools");

class GoodsController {
  //додати товар
    async addGood(req,res,next){
        try {
          const {id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques}=req.body;
          // res.json({id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques});
          let sql=`INSERT INTO shop_goods (id_cat, name, cost, text, quantity, url, title, state, unique_price, uniques)
          VALUES ("${id_cat}", "${name}", "${cost}", "${text}", "${quantity}", "${url}", "${title}","${state}", "${unique_price}", "${uniques}")`
          let response=await queryDatabase(sql)
          return res.json({
            id:response.insertId,
            id_cat: id_cat,
            name: name,
            cost: cost,
            text: text,
            quantity: quantity,
            url: url,
            title:title,
            state: state,
            unique_price: unique_price,
            uniques: uniques
        })
        } catch (error) {
          console.log("Error Added Goods");
          return res.json(false)
        }
    }
    async getAllGoods(req,res,next){
      try {
        const data=await queryDatabase("SELECT * FROM shop_goods")
        return res.json(data)
      } catch (error) {
        console.log(error);
        return res.json(false)
      }

    }
  
    //додати категорію
    async addCategory(req,res,next){
        try {
          const {cat,state}=req.body;
          let sql=`INSERT INTO shop_cat (cat, state)
          VALUES ("${cat}", "${state}")`
          let response=await queryDatabase(sql)
          return res.json({
            id:response.insertId,
            cat:cat,
            state:state
          })
        } catch (error) {
          console.log("Error Added Goods");
          return res.json(false)
        }
    }

    async getAllCat(req,res,next){
      try {
        const data=await queryDatabase("SELECT * FROM shop_cat")
        return res.json(data)
      } catch (error) {
        return res.json(false)
      }

    }
    
    

   
}
module.exports= new GoodsController()