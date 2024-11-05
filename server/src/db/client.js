import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'staycation',
    host: 'localhost',
    database: 'staycation',
    password: 'password',
    port: 5432
})
client.connect()

export default client
