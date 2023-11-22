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
          console.log(id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques);
          // res.json({id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques});
          let sql=`INSERT INTO shop_goods (id_cat, name, cost, text, quantity, url, title, state, unique_price, uniques)
          VALUES ("${id_cat}", "${name}", "${cost}", "${text}", "${quantity}", "${url}", "${title}","${state}", "${unique_price}", "${uniques}")`
          let response=await queryDatabase(sql)
          return res.json({
            id:response.insertId,
            id_cat: id_cat,
            name: name||"",
            cost: cost||0,
            text: text||"",
            quantity: quantity||1,
            url: url||"",
            title:title||"",
            state: state||"",
            unique_price: unique_price||0,
            uniques: uniques||1
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
          // console.log(sql);
          let response=await queryDatabase(sql)
          // console.log(response);
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
    async updateOrder(req, res, next) {
      try {
          const { order } = req.body;
          // console.log(req.body);
  
          const {
              id,
              name,
              novaPoshta,
              phone,
              telegram_id,
              cart_json,
              address,
              sum,
              comment,
              status
          } = order;
            const hs=cart_json
          let sql = `
          UPDATE orders_shop_telegram
          SET 
              name = "${name}",
              nova_poshta = "${novaPoshta}",
              phone = "${phone}",
              telegram_id = "${telegram_id}",
              cart_json = '${hs}',
              address = '${address}',
              sum = "${sum}",
              comment = "${comment}",
              status = "${status}"
          WHERE id = "${id}";
          `;
  
          console.log(sql);
  
          let response = await queryDatabase(sql);
          // console.log(response);
  
          return res.json({
              id: response.insertId,
              name,
              novaPoshta,
              phone,
              telegram_id,
              cart_json,
              address,
              sum,
              comment,
              status
          });
      } catch (error) {
          console.log(error);
          console.log("Error updating order");
          return res.json(false);
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
          // console.log(response);
          return res.json({
            
            id:response.insertId,
            
        })
        } catch (error) {
            console.log(error);
          console.log("Error Delete Goods");
          return res.json(false)
        }
    }
    async deleteOrder(req,res,next){
      try {
        const {id}=req.body;
        // console.log(id);
        // res.json({id_cat,name,cost,text,quantity,url,title,state,unique_price,uniques});
        let sql=`UPDATE orders_shop_telegram
        SET  delete_flag = "1"
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
            // console.log(data);
          }
          
            return res.json(data)
          } catch (error) {
            console.log(error);
            return res.json([])
          }
    }
    async getAllOrdersByCat(req,res,next){
      try {
          const {id_cat}=req.body;
      
          const data=await queryDatabase(`SELECT * FROM orders_shop_telegram where status='${id_cat}' and delete_flag='0'`)
       
        
          return res.json(data)
        } catch (error) {
          console.log(error);
          return res.json([])
        }
  }
  async getOrder(req,res,next){
    try {
        const {id}=req.body;
    
        const data=await queryDatabase(`SELECT * FROM orders_shop_telegram where id='${id}' `)
    //  console.log(data);
      
        return res.json(data)
      } catch (error) {
        console.log(error);
        return res.json([])
      }
}
async getOrderTelegram(req,res,next){
  try {
      const {id}=req.body;
     
  
      const data=await queryDatabase(`SELECT * FROM orders_shop_telegram where 	telegram_id='${id}' and delete_flag='0' `)

    
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
    async getAllGoodsUnique(req,res,next){
      try {
        const data=await queryDatabase("SELECT * FROM shop_goods where unique_price!='0' and state= '1' ")
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
              // console.log(sql);
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
        console.log(error,"getAllCat");
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

    // console.log(value);
  try {
    
   
    imgur.setClientID('ea3d24f4eb41b81');
   imgur.upload(url,function(err, ress){
	// console.log(ress.data.link); //log the imgur url
    fs.unlinkSync(url);
    res.json(ress.data.link)
});
    
}catch (error) {
    console.log("Errror added photo");
    res.json(false)
  }
   } 
    async createOrder (req,res,data){
 
      try {
        const {order}=req.body;
        const jsData=  order.cart
        const token = '6707083370:AAH6hqQZpLd95vcfITDTotbKzpQnWkVX-AA';
        const userId =order.telegram_id;
        console.log(order);
        const sql = `
        INSERT INTO orders_shop_telegram (name, phone, telegram_id, cart_json, address, sum, comment, status)
        VALUES (
          '${order.name}',
          '${order.phone}',
          '${order.telegram_id}',
          '${jsData}',
          '${order.adress}',
          '${order.sum}',
          '${order.comment}',
          0
        );
      `;
        let response=await queryDatabase(sql)
// URL Telegram Bot API
const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
const urlOrder = `https://shop-intelekt.pp.ua/order/${response.insertId}`;

// Формування тексту повідомлення з використанням Markdown
const messageText = `
Привіт!
Це інформація про твоє замовлення:

*Ім'я:* ${order.name}
*Телефон:* ${order.phone}
*Адреса:* ${order.adress}

Кошик:
${order.cart}

**Загальна сума:** ${order.sum} грн

*Коментар:* 
${order.comment}
`;

axios.post(apiUrl, {
  chat_id: userId,
  text: messageText,
  parse_mode: 'Markdown', // Додаємо параметр parse_mode для коректного відображення Markdown
})
  .then(response => {
    // console.log('Відповідь від Telegram API:', response.data);
  })
  .catch(error => {
    console.error('Помилка відправки запиту:', error);
});

// Відправка URL замовлення в інший чат
axios.post(apiUrl, {
  chat_id: '-1002074871055',
  text: `[Посилання на замовлення N ${response.insertId}](${urlOrder})`, // Додаємо URL у вигляді гіперпосилання
  parse_mode: 'Markdown',
})
  .then(response => {
    // console.log('Відповідь від Telegram API:', response.data);
  })
  .catch(error => {
    console.error('Помилка відправки запиту:', error);
});
    
      // console.log(order);
 return res.json(true)
} catch (error) {
  console.log(error);
  return res.json(false)
    
}
    }
async moveOrderUP(req,res,next){
  const {id,state}=req.body;
  try {
    
 
  const sql=`UPDATE orders_shop_telegram set status='${1}' where id='${id}'`
  let response=await queryDatabase(sql) 
  return true

} catch (error) {
  console.log(error);
    return false
  }
}
async moveOrderDone(req,res,next){
  const {id,state}=req.body;
  try {
    
 
  const sql=`UPDATE orders_shop_telegram set status='${2}' where id='${id}'`
  let response=await queryDatabase(sql) 
  return true

} catch (error) {
  console.log(error);
    return false
  }
}
   
}
module.exports= new GoodsController()