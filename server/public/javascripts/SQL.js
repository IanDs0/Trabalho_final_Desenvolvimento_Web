const conectar = async function (){
    if (global.conexao && global.conexao.statle != 'disconected') {
      return global.conexao
    }
    const mysql = require('mysql2/promise')//não sei pq mas ta ai
    const connection = mysql.createConnection({//login e tabela
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'test'
    });
    
    console.log("Banco de dados Conectado!!!")
  
    global.conexao=connection
    return connection;
  }
  
  const Usuarios = async function () {
  
    const conectado = await conectar()
    const [linhas] = await conectado.execute('SELECT * FROM `test`.`test` `title`WHERE `id`>0')
    
    console.log('Usuarios')

    return await linhas
  }

  const Add = async function (client) {
  
    const conectado = await conectar()
    const sql = 'INSERT INTO `test` (`title`, `completed`) VALUES (?,?)'

    const val = [client.user, client.password]
    await conectado.query(sql,val)
    
    console.log('Add')
  }

    const Update = async function (id,client) {
  
    const conectado = await conectar()
    const sql = 'UPDATE `test`.`test` SET `title` = ?, `completed` = ? WHERE `id` = ?'
    const val = [client.user, client.password, id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  const Delete = async function (id) {
  
    const conectado = await conectar()
    const sql = 'DELETE FROM `test`.`test` WHERE (`id` = ?)'
    const val = [id]
    await conectado.query(sql,val)

    console.log('Update')
    
  }

  module.exports = {Usuarios,Add,Update,Delete}