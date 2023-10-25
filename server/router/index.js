const Router =require("express").Router
const GoodsController = require("../controllers/goods-controller");
const UserController=require("../controllers/user-controller");

const router =new Router();
const checkAuthorization = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader === '458d447DD()556;521357') {
      next();
    } else {
      return res.status(403).json({ error: 'Доступ заборонено' });
    }
  };


router.post("/login",UserController.login)//вхід логін пароль 
//додати товар 
router.post("/add-good",checkAuthorization,GoodsController.addGood)
router.get("/get-all-goods",checkAuthorization,GoodsController.getAllGoods)

router.post("/add-cat",checkAuthorization,GoodsController.addCategory)
router.get("/get-all-cat",checkAuthorization,GoodsController.getAllCat)




module.exports=router
