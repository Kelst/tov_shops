const Router =require("express").Router
const GoodsController = require("../controllers/goods-controller");
const userController = require("../controllers/user-controller");
const UserController=require("../controllers/user-controller");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Директорія для зберігання завантажених файлів
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Генерувати унікальне ім'я файлу
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

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
router.get("/get-all-goods_unique",checkAuthorization,GoodsController.getAllGoodsUnique)
router.put("/update-good",checkAuthorization,GoodsController.updateGood)
router.put("/update-order",checkAuthorization,GoodsController.updateOrder)
router.put("/delete-good",checkAuthorization,GoodsController.deleteGood)
router.put("/delete-order",checkAuthorization,GoodsController.deleteOrder)

router.post("/get-all-goods-by-cat",GoodsController.getAllGoodsByCat)
router.post("/get-all-orders-by-cat",GoodsController.getAllOrdersByCat)
router.post("/get-order",GoodsController.getOrder)
router.post("/get-order-telegram",GoodsController.getOrderTelegram)
router.post("/get-phone",checkAuthorization,GoodsController.getPhone)
router.post("/create-order",checkAuthorization,GoodsController.createOrder)
router.post("/move-order-up",checkAuthorization,GoodsController.moveOrderUP)
router.post("/move-order-done",checkAuthorization,GoodsController.moveOrderDone)


 router.post("/add-cat",checkAuthorization,GoodsController.addCategory)
 router.get("/get-all-cat",checkAuthorization,GoodsController.getAllCat)
 router.put("/update-cat",checkAuthorization,GoodsController.updateCategory)
 router.put("/delete-cat",checkAuthorization,GoodsController.deleteCategory)
 router.post("/storage" , upload.single('file') ,GoodsController.storage)
 router.post("/logIn" , upload.single('file') ,userController.login)




module.exports=router
