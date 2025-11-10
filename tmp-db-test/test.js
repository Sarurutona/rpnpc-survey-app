const { Client } = require('pg');
const cs = process.env.PG_CS;
const client = new Client({ connectionString: cs, ssl: { rejectUnauthorized: false } });
(async ()=>{
  try{
    await client.connect();
    console.log('CONNECTED OK');
    const res = await client.query('SELECT NOW() AS now');
    console.log('SERVER TIME:', res.rows[0].now);
    await client.end();
    process.exit(0);
  }catch(err){
    console.error('CONNECTION ERROR:', err.message || err);
    process.exit(1);
  }
})();
