# redis-cache-sentinel
<p align="center">
    <img src="http://dacom.cm.utfpr.edu.br:88/sd/lib/exe/fetch.php?cache=&media=redis_logo.png"/>
</p>
Cache com redis com replicação e alta disponibilidade.

## Sumário
- [redis-cache-sentinel](#redis-cache-sentinel)
  - [Sumário](#sumário)
  - [Instalação & Configuração](#instalação--configuração)
    - [Instalação do Redis](#instalação-do-redis)
    - [Para a configuração da maquina local:](#para-a-configuração-da-maquina-local)
    - [Replicando o Redis em outro nó](#replicando-o-redis-em-outro-nó)
    - [Colocando Sentinelas](#colocando-sentinelas)
    - [Projeto Node](#projeto-node)



## Instalação & Configuração
Pre-requisitos:
> mysql 8.0.27
> 
> node v16.13.1


### Instalação do Redis

```bash 
sudo apt install redis-server
```

### Para a configuração da maquina local:
Edite o arquivo /etc/redis/redis.conf
```bash
vim /etc/redis.conf
```

em vez de localhost coloque o ip da maquina local.
```bash
bind:  192.168.1.7
```
para ligar o servidor com as configurações digite:

```bash
redis-server /etc/redis.conf
```

Entrando no cliente do banco de dados redis:
```bash
redis-cli -h 192.168.1.7 -p 6379
```
Alguns comandos que poderá ser executado nesse cliente:

| Comando             | Descrição                                 |
|---------------------|-------------------------------------------|
| ping                | Verifica se o servidor redis esta online. |
| set 'chave' 'valor' | Cria um novo elemento.                    |
| get 'chave'         | Busca um elemento pela chave              |
| scan 0              | Mostra parte dos elementos do redis       |
| info replication    | Mostra as informações da replication.     |

### Replicando o Redis em outro nó

Editando o arquivo /etc/redis.conf 
```bash
vim redis.conf
```
Procure a opção [replicaof](https://redis.io/commands/replicaof) e troque pelo ip e porta da sua maquina local.

```
replicaof 192.168.1.7 6379
```

Execute o programa com o seguinte comando:
```bash
redis-server /etc/redis/redis.conf
```

### Colocando Sentinelas

As sentinelas do redis irá ajudar a redirecionar o fluxo de acesso se um nó cair.

Tanto na maquina local como no nó remoto edite o arquivo /etc/sentinelconf:
```bash 
vim sentinel.conf
```

e mude o ip e a porta para o ip da maquina local.
```bash
sentinel monitor mymaster 192.168.1.7 6379 2
```

logo a seguir execute o seguinte comando para rodar as sentinelas:
```bash
redis-sentinel sentinel.conf
```

### Projeto Node
Para usar o projeto node entre no repositorio e digite o seguinte comando

```
npm install
```

E para executar
```
node index.js
```