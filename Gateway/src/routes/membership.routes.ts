import {Router} from 'express';
import multer from 'multer';
import { signIn, signUp, signOut, verifyEmail, sendEmail } from '../controllers/membership.controller';

const router = Router();

//router.get('/sign_in',getTest);
router.post('/sign_in', signIn);
router.post('/sign_up', signUp);
router.post('/sing_out', signOut);
router.post('/verify_email/send', sendEmail);
router.post('/verify_email/verify', verifyEmail);




export default router;