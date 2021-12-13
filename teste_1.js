
//Funcionamento do Redis
(async () => {

    const redis = require('async-redis');
    const client = redis.createClient();

    client.on("error", (error) => {
        console.error(error);
    });

    console.log("Registrando Juliano ")

    const result = await client.set("juliano", "15k");
    console.log(`result: ${result}`);



    console.log("1ºVez Buscando Juliano")

    const result2 = await client.get("juliano");
    console.log(`result2: ${result2}`);
 

})();