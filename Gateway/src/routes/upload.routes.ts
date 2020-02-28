import { Router } from 'express';
import multer from 'multer';
import { uploadMusic, uploadProfile, uploadBg } from '../controllers/upload.controller';
import { authCheck } from '../middlewares/auth.middleware';
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authCheck, upload.fields([{ name: 'music' }, { name: 'img' }]), uploadMusic);
router.post('/', authCheck, upload.fields([{ name: 'profile_img' }]), uploadProfile);
router.post('/', authCheck, upload.fields([{ name: 'bg_img'}]), uploadBg);

export default router;
