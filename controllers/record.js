const { handleExceptions } = require("../libs/utils");
const recordService = require('../services/record');

module.exports = {
    async getRecords(req, res) {
        try {
            const page = req.params.page;
            const limit = req.params.limit;
            const records = await recordService.findByUsername(res.locals.loggedUsername, page, limit);
            res.status(200).json({ records });
        } catch (err) {
            handleExceptions(err, res);
        }
    },
    async deleteRecord(req, res) {
        try {
            const id = req.params.id;
            await recordService.delete(id);
            res.status(204).json({success: true});
        } catch (err) {
            handleExceptions(err, res);
        }
    }
}
