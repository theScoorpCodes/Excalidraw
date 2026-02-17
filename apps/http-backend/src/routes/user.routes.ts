import { Router } from "express";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('Hello from user.route.ts!');
})

router.post('/signup', (req, res) => {
    res.send('Hello from signup!');
})

router.post('/signin', (req, res) => {
    res.send('Hello from signin!');
})

router.post('/create-room', (req, res) => {
    res.send('Hello from create-room!');
})

export default router;