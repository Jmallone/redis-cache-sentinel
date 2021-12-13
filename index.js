
(async () => {
    
    /* Conexão com o MYSQL */
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({host: 'localhost', user: 'juliano', password:'paocumovo1', database:'redis_sd'});
    await conn.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
      });

    /* Conexão do REDIS */
    const redis = require('async-redis');
    const client = redis.createClient({host: '192.168.1.7',port:'6379'});
    client.on("error", (error) => {
        console.error(error);
    })

    async function busca_com_db(debug = true){
        
        for(let i=11; i <= 1010; i++){
          const [rows] = await conn.query(`select * from clientes where id=? limit 1`, [i]);
          if (debug) console.log(rows[0]);
        }
        
    }

    /* Função redis com db */
    async function busca_com_redis( debug = true){
        
        for(let idCliente=11; idCliente <= 1010; idCliente++){

            let cliente = await client.get(`${idCliente}`);
            if (!cliente) {
                const [rows] = await conn.query(`select * from clientes where id=? limit 1`, [idCliente]);
                cliente = rows[0];
                await client.set(`${idCliente}`, JSON.stringify(cliente));
                if (debug) console.log(cliente);
            }
            else
                if (debug) console.log(JSON.parse(cliente));
        }

        
    }

    /* Acessando registros (Only: DB)*/
    console.log("BANCO DE DADOS --- Acessando 1000 registros!");

    console.time("dbsave");
    busca_com_db(false);
    console.timeEnd("dbsave");
 
    /* Chama pela primeira vez (search: DB)*/
    console.log("\nREDIS --- Acessando 1000 registros pela primeira vez!");
    
    console.time("redissave");
    busca_com_redis(false);
    console.timeEnd("redissave");
    
    /* Chama pela Segunda vez (in memory: REDIS) */
    console.log("\nREDIS --- Acessando 1000 registros pela segunda vez!");

    console.time("redissave");
    busca_com_redis(false);
    console.timeEnd("redissave");
    
})();

