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
var sql=require('mssql');

const tableN = "[dbo].[StatusRoles]";

var actor={
  getStatusR:function(req, res){
      console.log('AllStatusRoles');
      var query = 'select * from '+tableN;
      executeQuery(res, query);
    },
    getStatusRByRol:function(req, res){
      console.log('StatusByRol');
      var query = 'select * from '+tableN+' inner join [dbo].[Status] on Status.StaClave = StatusRoles.SRClaveSta  where SRClaveRol = '+req.params.id;
      console.log(query);
      executeQuery(res, query);
    },
    addStatusR:function(req, res){
      console.log('AddStatus');
      let u = req.body;
      var query = "insert into "+tableN+" values("+u.SRClaveRol+","+u.SRClaveSta+",'"+u.Permiso+"')";
      executeQuery(res, query);
    },

    updateStatusR:function(req, res){
        console.log('UpdateStatus');
        let u = req.body;
        var query = "update "+tableN+" set Permiso='"+u.Permiso+"' where SRClaveRol = "+req.params.id+" AND SRClaveSta = "+(u.SRClaveSta+1) ;
        executeQuery(res, query);
      },
}


var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    if(result.recordset === undefined){
      res.status(200).send({message: "Success"})
    }else{
      let rows = result.recordset
      res.status(200).json(rows);
    }

    sql.close();
  }).catch(err => {
    res.status(500).send({ message: ""+err})
    sql.close();
  });
}
module.exports=actor;
