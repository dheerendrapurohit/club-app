app.post('/join-club', async (req, res) => {
    const { passcode } = req.body;
    const user = req.user;
    
    if (passcode === 'SECRET_PASSCODE') {
      user.isMember = true;
      await user.save();
      res.redirect('/');
    } else {
      res.status(400).send('Incorrect passcode.');
    }
  });
  