const queryDatabase = require("../tools/tools");
const imgur = require('imgur-upload')
const fs = require('fs');
const { log } = require("console");
const { default: axios } = require("axios");


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
          VALUES ("${cat}", "${1}")`
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

async getPhone(req,res,next){
  const {id}=req.body;
  try {
    const data=await queryDatabase(`SELECT 	phone_number FROM client_chats_id where 	user_chat_id ='${id}'`)
    if(data.length!=0){
      return res.json('380'+data[0].phone_number)
    }else
    return res.json(false)
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
    async createOrder(req,res,data){
      // {
      //   name: 'Безкоровайний Владислав ',
      //   phone: '380951470082',
      //   telegram_id: 5036942123,
      //   cart: [
      //     { name: 'Totolink N300RT', cost: 460, count: 2 },
      //     { name: 'Xiomi power', cost: 100, count: 1 }
      //   ],
      //   adress: '',
      //   sum: 900,
      //   comment: ''
      // }
      try {
        const {order}=req.body;
        const token = '6707083370:AAH6hqQZpLd95vcfITDTotbKzpQnWkVX-AA';
        const userId =order.telegram_id;
        
        // URL Telegram Bot API
        const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
        function formatCart(cart) {
          return cart.map(item => `Назва: ${item.name}, Кількість: ${item.count}, Вартість: ${item.cost} грн`).join('\n');
        }
        
        // Формування тексту повідомлення
        const messageText = `
        Привіт, це тестове повідомлення!
        
        Ім'я: ${order.name}
        Телефон: ${order.phone}
        Адреса: ${order.adress}
        Кошик:
        ${formatCart(order.cart)}
        Загальна сума: ${order.sum} грн
        Коментар: ${order.comment}
        `;
             
        axios.post(apiUrl, {
          chat_id: userId,
          text: messageText,
        })
          .then(response => {
            console.log('Відповідь від Telegram API:', response.data);
          })
          .catch(error => {
            console.error('Помилка відправки запиту:', error);
          });
    
      console.log(order);
return res.json(true)
} catch (error) {
  return res.json(false)
    
}
    }

   
}
module.exports= new GoodsController()