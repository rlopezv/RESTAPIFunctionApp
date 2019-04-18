const azure = require('azure-storage');

const tableService = azure.createTableService();
const tableName = "DEVICEALERT";
const MAX_ROWS = 20;
/**
 * Retrieves last alerts for identified devie
 */
module.exports = function (context, req) {
    const id = req.params.id;
    var rows = 1;
    if (req.params.size) {
        if (req.params.size<MAX_ROWS) {
            rows = req.params.size;
        } else {
            rows = MAX_ROWS;
        }
       
    }
    var query = new azure.TableQuery().top(rows).where('deviceId == ?',id);
    // return the top x items
    tableService.queryEntities(tableName, query, null, function (error, result, response) {
        if (!error) {
            context.res.status(200).json(response.body.value);
        } else {
            context.res.status(500).json({ error: error });
        }
    });

};