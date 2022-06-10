const databaseConnection = require('./database')
exports.handler = async (event) => {

    console.log('event', event);
    const id = event['params']['path']['id'];
    const connection = await databaseConnection();
    connection.on(`error`, (err) => {
        console.error(`Connection error ${err.code}`);
    });
    console.log(event);
    let doc_types = await connection.awaitQuery(`SELECT * FROM bicicleta where id='${id}'`);

    await connection.end();
    return doc_types;
};