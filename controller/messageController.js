app.post('/message', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('Unauthorized');
    }
  
    const { title, text } = req.body;
    await Message.create({ title, text, UserId: req.user.id });
    res.redirect('/');
  });
  
  app.delete('/message/:id', async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).send('Forbidden');
    }
  
    await Message.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  });
  