const utils = {
    handleExceptions(err, res) {
        console.log(err);
        if (typeof err === "string" || err.message) {
            res.status(400).json({
                message: err.message || err,
            });
        } else if (typeof err === "object" || err.length > 0) {
            res.status(400).json({
                message: err[0],
            });
        } else {
            console.log(`${new Date()} API Interal Error`, err);
            res.status(500).json({
                message: `API Interal Error`,
            });
        }
    }
}

module.exports = utils;