const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/AdminController');
const ProductController = require('../controllers/ProductController');


const passport = require('passport');

routes.get('/',admincontroller.home);
routes.get('/admin',admincontroller.login);
routes.get('/admin/dash',passport.checkAuthentication,admincontroller.dash);
routes.get('/admin/register',admincontroller.register);
routes.post('/registerData',admincontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),admincontroller.loginData);
routes.get('/admin/forget',admincontroller.forget);
routes.post('/forgotpass',admincontroller.forgotpass);
routes.get('/admin/otp',admincontroller.otp);
routes.post('/otpData',admincontroller.otpData);
routes.get('/admin/newpass',admincontroller.newpass);
routes.get('/logout',admincontroller.logout);
routes.post('/newpassData',admincontroller.newpassData);
routes.get('/admin/add_product',ProductController.add_product);
routes.post('/add_productData',ProductController.add_productData);
routes.get("/admin/view_product",ProductController.view_product);
routes.get("/DeleteData/:id",ProductController.DeleteData);
routes.get("/EditData/:id",ProductController.EditData);
routes.post("/updateData/:id",ProductController.updateData);
routes.get("/active/:id",ProductController.active);
routes.get("/deactive/:id",ProductController.deactive);


module.exports = routes;
