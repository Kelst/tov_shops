const Router =require("express").Router
const GoodsController = require("../controllers/goods-controller");
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
router.put("/update-good",checkAuthorization,GoodsController.updateGood)
router.put("/delete-good",checkAuthorization,GoodsController.deleteGood)

 router.post("/add-cat",checkAuthorization,GoodsController.addCategory)
 router.get("/get-all-cat",checkAuthorization,GoodsController.getAllCat)
 router.put("/update-cat",checkAuthorization,GoodsController.updateCategory)
 router.put("/delete-cat",checkAuthorization,GoodsController.deleteCategory)
 router.post("/storage" , upload.single('file') ,GoodsController.storage)




module.exports=router
