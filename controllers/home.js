/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    return res.redirect('/services');
  }
  res.render('home', {
    title: 'Home',
  });
};
