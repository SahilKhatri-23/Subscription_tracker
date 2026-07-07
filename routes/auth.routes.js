import {Router} from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();

// authRouter.get('/sign-up', (req, res) => {
//   res.send({ title: 'Sign-up route' });
// }); This is before the controller was implemented, now we will use the controller to handle the logic of signing up a user.

//Path: /api/v1/users/sign-up (POST)
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);


export default authRouter;