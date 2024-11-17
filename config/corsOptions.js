const corsOptions = {
    origin: (origin, callback) => {
        if (origin === 'https://app.tenify.in') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;