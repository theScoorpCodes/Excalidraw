import { Router } from "express";
import { userSignInController, userSignUpController } from "../controllers/user.controller";
import { middleware } from "../middleware/authenticate";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('Hello from user.route.ts!');
})

router.post('/signup', userSignUpController)

router.post('/signin', userSignInController) 

router.post('/create-room', middleware, (req, res) => {
res.json({
    roomId: 123,
    success: true
})
})

export default router;