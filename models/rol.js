var config = {
  user: 'Kxnmk_SQLLogin_1',
  password: 'wrzrj1lgme',
  server: 'db-Jlca.mssql.somee.com',
  database: 'db-Jlca',
  multipleStatements: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

var sql = require('mssql');

const tableN = "[dbo].[Roles]";

var rol = {
    getAllRoles: function (req, res) {
        console.log('AllUsuarios');
        var query = 'select * from '+tableN;
        executeQuery(res, query);
    },
}

var executeQuery = function (res, query) {
    console.log(query);

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(query)
    }).then(result => {
        let rows = result.recordset
        res.status(200).json(rows);
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: "" + err })
        sql.close();
    });
}
module.exports = rol;