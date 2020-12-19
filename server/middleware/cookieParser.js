const parseCookies = (req, res, next) => {
  let cookie = req.headers.cookie;
  if (!cookie) {
    next('no cookie found');
  } else {
    console.log(cookie);
  }
};

module.exports = parseCookies;