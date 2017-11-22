var config = require('../dbconnection');
var sql=require('mssql');

const tableN = "[dbo]";

var usuario={
  getAllUsuarios:function(req, res){
    console.log('AllUsuarios');
    var query = 'SELECT * FROM dbo.Usuarios INNER JOIN dbo.Comisiones ON dbo.Usuarios.usrClave = dbo.Comisiones.ComClaveUsuario INNER JOIN dbo.Roles ON dbo.Roles.RolClave = dbo.Comisiones.ComClaveRol';
    executeQuery(res, query);
  },
  checkUsuario:function(req, res){
    console.log('CheckUsuario');
    var query = "EXEC uspLogin @user = "+req.body.usrName+", @pass ="+req.body.usrPassword

    //var query = "SELECT dbo.Usuarios.usrClave, dbo.Usuarios.usrNombre, dbo.Usuarios.usrRandom, dbo.Roles.RolNombre FROM dbo.Usuarios INNER JOIN dbo.Comisiones ON dbo.Usuarios.usrClave = dbo.Comisiones.ComClaveUsuario INNER JOIN dbo.Roles ON dbo.Roles.RolClave = dbo.Comisiones.ComClaveRol WHERE usrName = '"+req.body.usrName+"' and usrPassword = '"+req.body.usrPassword+"'";
    executeQuery(res, query);
  },
  getUsuarioById:function(req, res){
    console.log('getUsuarioById');
    var query = "select * from "+tableN+" where usrClave = "+req.params.id;
    executeQuery(res, query);
  },
  addUsuario:function(req, res){
    console.log('AddUsuario');
    let u = req.body;
    var query = "insert into "+tableN+" values("+u.usrClave+",'"+u.usrNombre+"','"+u.usrName+"','"+u.usrPassword+"','"+u.usrRandom+"','"+u.usrRol+"')";
    executeQuery(res, query);
  },
  deleteUsuario:function(req,res){
    console.log('deleteusuario');
    var query = "delete from "+tableN+" where usrClave="+req.params.id;
    executeQuery(res, query);
  },
  updateUsuario:function(req, res){
    console.log('updateUsuario');
    let u = req.body;
    console.log(req.body);
    var query = "update "+tableN+" set usrNombre='"+u.usrNombre+"',usrName='"+u.usrName+"',usrPassword='"+u.usrPassword+"', usrRandom='"+u.usrRandom+"', usrRol='"+u.usrRol+"' where usrClave = "+req.params.id;
    executeQuery(res, query);
  }
}

var executeQuery = function(res, query){
  console.log(query);

  new sql.ConnectionPool(config).connect().then(pool => {
  return pool.request().query(query)
  }).then(result => {
    let rows = result.recordset
    res.status(200).json(rows);
    sql.close();
  }).catch(err => {
    res.status(500).send({ message: ""+err})
    sql.close();
  });
}
module.exports=usuario;
