import {Router} from 'express';
import {searchTrack, searchArtist, search, Test} from '../controllers/search.controller';

const router = Router();

router.post('/', Test);
router.post('/:keyword', Test);
router.post('/title/:keyword/:pages',Test);
router.post('/artist/:keyword/:pages',Test);

export default router;