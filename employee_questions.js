const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
let connection;
main();
async function main() {
  try {
    await connect();
  } catch(err) {
    console.error(err);
  } finally {
    connection.end();
  }
}

async function connect() {
  connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'top_songsdb',
  });
  console.log(`Connected as id: ${connection.threadId}`);
}

async function searchByArtist(artist) {
    const answer = await inquirer.prompt({
        name: '',
        type: '',
        message: 'What would you like to pick?',
        choices: ['', '']
    })
}