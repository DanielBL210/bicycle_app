const databaseConnection = require('./database')
exports.handler = async (event) => {

    console.log(event);
    const connection = await databaseConnection();
    connection.on(`error`, (err) => {
        console.error(`Connection error ${err.code}`);
    });

    let bicycle_exist = await get_bicycles(event['id'], connection);

    let query = 'error';
    const vacio = [];
    if (bicycle_exist[0]) {
        query = await update_bicycle(event, connection);
        console.log('update query result', query);
    } else {
        query = await create_bicycle(event, connection);
        console.log('create query result', query);
    }


    await connection.end();
    return event;
};

async function get_bicycles(id_bicycle, con) {
    let bicycles = await con.awaitQuery(`SELECT * FROM bicicleta where id='${id_bicycle}'`);
    return bicycles;
}

async function create_bicycle(bicycle, con) {
    const q1 = "INSERT INTO bicicleta (id, color, modelo, latitud, longitud) VALUES (";
    let query = await con.awaitQuery(`${q1}'${bicycle['id']}', '${bicycle['color']}', '${bicycle['modelo']}', '${bicycle['latitud']}', '${bicycle['longitud']}');`);
    console.log('query', q1);
}

async function update_bicycle(bicycle, con) {
    const q1 = `UPDATE bicicleta SET color = '${bicycle['color']}', modelo = '${bicycle['modelo']}', latitud = '${bicycle['latitud']}', longitud = '${bicycle['longitud']}' `;
    let query = await con.awaitQuery(`${q1} where id = '${bicycle['id']}' `);
    console.log('query', q1);
}
