const { Router } = require('express');
const Test = require('../models/Test');
const auth = require('../middleware/auth.middleware')

const router = Router();

router.get('/', async (req, res) => {
  try{
    res.status(200).json({ message: 'Hello world!', isAuth: true });
  }catch (e){
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/', async (req, res) => {
  try{
    res.json(req.body);
  }catch (e){

  }
});

module.exports = router;