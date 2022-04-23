/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 22/04/2022
 */

import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;