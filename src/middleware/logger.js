module.exports = function (req, res, next){
  const start = Date.now();
  res.on('finish', () => {
    const dt = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${dt}ms`);
  });
  next();
};
