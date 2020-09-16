const logger = (req, res, next) => {
    req.hello = 'Ciao!';
    console.log('middleware');
    next();
};

module.exports = logger;