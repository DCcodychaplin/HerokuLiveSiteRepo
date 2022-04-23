/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 22/04/2022
 */

import express from 'express';
const router = express.Router();

import { AuthGuard } from '../Util/index';

import { DisplayAddPage, DisplayContactListPage, DisplayEditPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/contact-list';

/****************** CONTACT-LIST ROUTES ********************/

/* GET contact-list page. */
router.get('/contact-list', AuthGuard, DisplayContactListPage);

/* displays Add page */
router.get('/add', AuthGuard, DisplayAddPage);

/* process Add Request */
router.post('/add', AuthGuard, ProcessAddPage);

/* displays Update page */
router.get('/update/:id', AuthGuard, DisplayEditPage);

/* process Edit request*/
router.post('/update/:id', AuthGuard, ProcessEditPage);

/* process Delete request */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);

export default router;