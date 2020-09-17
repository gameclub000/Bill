const csv = require('csvtojson');

const csvFilePath = '/app/data/bill.csv';

export default async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(csvFilePath);
        res.statusCode = 200;
        res.json(jsonArray);
    } catch (e) {
        res.statusCode = 500;
    }
};
