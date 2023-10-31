const queryDatabase = require("../tools/tools");
const imgur = require('imgur-upload')
const fs = require('fs');
const { log } = require("console");

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
    async updateGood(req,res,next){
        try {
          const {id,id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques}=req.body;
                console.log(req.body);
       
          // res.json({id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques});
          let sql=`UPDATE shop_goods
          SET  id_cat="${id_cat}", name = "${name}", cost = "${cost}", text = "${text}", quantity = "${quantity}", url = "${url}", title = "${title}", state = "${state}", unique_price = "${unique_price}", uniques =  "${uniques}"
          WHERE id = "${id}";`
          console.log(sql);
          let response=await queryDatabase(sql)
          console.log(response);
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
            console.log(error);
          console.log("Error Added Goods");
          return res.json(false)
        }
    }
    async deleteGood(req,res,next){
        try {
          const {id}=req.body;
          // res.json({id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques});
          let sql=`UPDATE shop_goods
          SET  state = "0"
          WHERE id = "${id}";`
          let response=await queryDatabase(sql)
          console.log(response);
          return res.json({
            
            id:response.insertId,
            
        })
        } catch (error) {
            console.log(error);
          console.log("Error Delete Goods");
          return res.json(false)
        }
    }
    async getAllGoodsByCat(req,res,next){
        try {
            const {id_cat}=req.body;
        
            const data=await queryDatabase(`SELECT * FROM shop_goods where id_cat='${id_cat}' and state= "1"`)
          if(id_cat==2){
            console.log(data);
          }
          
            return res.json(data)
          } catch (error) {
            console.log(error);
            return res.json([])
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
       
        async updateCategory(req,res,next){
            try {
              const {id,cat,state}=req.body;
              let sql=`
              UPDATE shop_cat
              SET cat="${cat}", state="${state}" where id=${id}
              
              `
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

        async deleteCategory(req,res,next){
            try {
              const {id}=req.body;
              let sql=`
              UPDATE shop_cat
              SET  state="${0}" where id=${id}
              `
              console.log(sql);
              let response=await queryDatabase(sql)
              return res.json({
                id:response.insertId,
              
          
              })
            } catch (error) {
              console.log("Error Delete Cat ");
              return res.json(false)
            }
        }


    async getAllCat(req,res,next){
      try {
        const data=await queryDatabase("SELECT * FROM shop_cat where state='1'")
        return res.json(data)
      } catch (error) {
        return res.json(false)
      }

    }

   async  storage (req,res,next){
    const url=`/home/vladb/tovar_app/server/uploads/${req.file.filename}`
    const {value}=req.body;

    console.log(value);
  try {
    
   
    imgur.setClientID('ea3d24f4eb41b81');
   imgur.upload(url,function(err, ress){
	console.log(ress.data.link); //log the imgur url
    fs.unlinkSync(url);
    res.json(ress.data.link)
});
    
}catch (error) {
    console.log("Errror added photo");
    res.json(false)
  }
   } 
    

   
}
module.exports= new GoodsController()