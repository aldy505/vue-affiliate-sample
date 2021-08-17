import e from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import {sql} from 'sql-dsl';

const db = mysql.createPool(String(process.env.DB_URL));

const app = e();

app.use(cors({origin: '*'}));

// Get users list
app.get('/users', async (req, res) => {
  try {
    const query = sql`SELECT users.id, users.name, users.email, users.affiliator, affiliate.token FROM users INNER JOIN affiliate ON users.id = affiliate.id`.formatQuestion();
    const [data] = await db.execute(query.sql, query.values);
    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/affiliate', async (req, res) => {
  try {
    const query = sql`SELECT * FROM affiliate`.formatQuestion();
    const [data] = await db.execute(query.sql, query.values);
    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.post('/register', e.json(), async (req, res) => {
  try {
    const {affiliate, name, email} = req.body;
    console.log(req.body);
    // Validate if the affiliate token is valid
    const affiliateQuery = sql`SELECT * FROM affiliate WHERE token = ${affiliate}`.formatQuestion();
    const [affiliateData] = await db.execute(affiliateQuery.sql, affiliateQuery.values);

    if (affiliateData.length < 1) {
      res.status(404).json({message: 'affiliate token is invalid'});
      return;
    }

    console.log(affiliateData[0].id);
    // OK, it's valid. Let's insert the data to the database.
    // Note that the `affiliator` is from the affiliateQuery's id.
    const registerQuery = sql`INSERT INTO users (name, email, affiliator) VALUES (${name}, ${email}, ${affiliateData[0].id});`.formatQuestion();
    const [registerData] = await db.execute(registerQuery.sql, registerQuery.values);
    res.status(200).json({message: registerData, data: {name, email, affiliator: affiliateData[0].id}});
  } catch (error) {
    res.status(500).json({error});
  }
});

app.listen(process.env.PORT || 5000, async () => {
  await setupTable();
  console.log(`listening on http://localhost:${process.env.PORT || 3000}`);
});

async function setupTable() {
  await db.execute(`CREATE TABLE IF NOT EXISTS affiliate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE
  );`);
  await db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    affiliator INT REFERENCES affiliate (id)
  );`);
  const query = sql`INSERT IGNORE INTO affiliate (token) VALUES (${'akewubowcmnv'}), (${'cbsytoycyxhi'})`.formatQuestion();
  await db.execute(query.sql, query.values);
}
