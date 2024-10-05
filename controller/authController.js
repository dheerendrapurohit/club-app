const bcrypt = require('bcryptjs');
const { User } = require('../models');

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await User.create({ firstName, lastName, email, password: hashedPassword });
    res.redirect('/login');
  } catch (error) {
    res.status(400).send('Error creating user.');
  }
});
