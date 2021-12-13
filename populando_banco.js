
(async () => {
    
    /* Conexão com o MYSQL */
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({host: 'localhost', user: 'juliano', password:'paocumovo1', database:'redis_sd'});
    await conn.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
      });

    
    await conn.query(`CREATE TABLE clientes (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(150) DEFAULT NULL,
        idade int DEFAULT NULL,
        uf varchar(2) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      `)
    
      for(let i=0; i < 1000; i++){
          await conn.query(`INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);`, [`nome${i}`, i, 'RS']);
      }

})();

