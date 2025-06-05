import Router from "router";
import login_controller from "../controllers/user_controllers/login_controller.js";
import register_controller from "../controllers/user_controllers/register_controller.js";
const router=new Router();
router.post("/login",login_controller.js);
router.post("/register",register_controller.js);

export const route=router;