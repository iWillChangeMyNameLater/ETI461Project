const { Client } = require('pg');

const client = new Client({
  connectionString: "process.env.postgres://xeaqyuzavhaovm:5d96d65295fc40c74f7f0825677f921c773ec32dfb46aa839882279d32bb618a@ec2-54-173-77-184.compute-1.amazonaws.com:5432/dd648dlvbd9beb",
  ssl: {
    rejectUnauthorized: false
  }
});
//module.exports(client);