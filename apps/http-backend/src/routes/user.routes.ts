import { Router } from "express";
import { userSignInController } from "../controllers/user.controller";
import { middleware } from "../middleware/authenticate";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('Hello from user.route.ts!');
})

router.post('/signup', userSignInController)

router.post('/signin', (req, res) => {
    res.send('Hello from signin!');
})

router.post('/create-room', middleware, (req, res) => {
res.json({
    roomId: 123,
    success: true
})
})

export default router;