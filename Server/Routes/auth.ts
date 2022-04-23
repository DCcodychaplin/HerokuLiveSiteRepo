/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 22/04/2022
 */

import express from 'express';
const router = express.Router();

import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/auth';

/****************** AUTHENTICATION ROUTES ********************/

router.get('/login', DisplayLoginPage);

router.post('/login', ProcessLoginPage);

/* GET display register page */
router.get('/register', DisplayRegisterPage);

/* process register request */
router.post('/register', ProcessRegisterPage);

/* process logout request */
router.get('/logout', ProcessLogoutPage);

export default router;