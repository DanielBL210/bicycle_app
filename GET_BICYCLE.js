const databaseConnection = require('./database')
exports.handler = async (event) => {

    const connection = await databaseConnection();
    connection.on(`error`, (err) => {
        console.error(`Connection error ${err.code}`);
    });
    let doc_types = await connection.awaitQuery(`SELECT * FROM bicicleta`);

    await connection.end();
    return doc_types;
};