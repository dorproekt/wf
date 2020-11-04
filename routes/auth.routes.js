const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../middleware/auth.middleware')
const router = Router();


router.post('/register', async (req, res) => {
  try{

    const {email, password} = req.body;

    const candidate = await User.findOne({ email });

    if(candidate){
      return res.status(400).json({ message: 'Такой email уже есть.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword});

    await user.save();

    res.json({ message: 'Пользователь успешно зарегистрирован.' });
  }catch (e){
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/login', async (req, res) => {
  try{

    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({ message: 'Введіть дані' });
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ message: 'Не вірний пароль' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      // { expiresIn: '1h'}
      { expiresIn: '1m'}
    );

    res.json({token, userId: user.id});

  }catch (e){
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/authorization', auth, async (req, res) => {
  try{

    res.json({ authorization: true });

  }catch (e){
    res.status(500).json({ message: 'Error' });
  }
});

module.exports = router;