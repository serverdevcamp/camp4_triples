import {Router} from 'express';
import multer from 'multer';
import {search, searchTrack, searchArtist  } from '../controllers/search.controller'

const router = Router();

router.post('/', search);
router.post('/:keyword',search);
router.post('/title/:keyword/:pages',searchTrack);
router.post('/artist/:keyword/:pages',searchArtist);

export default router;