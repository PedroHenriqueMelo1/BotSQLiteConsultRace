const fs = require('fs').promises; // Use fs.promises para métodos assíncronos

const filePath = 'utils/data.csv'; // Caminho para o arquivo CSV

async function NodeData(filePath) {
  try {
    const readFile = await fs.readFile(filePath, 'utf-8');

    if (!readFile.trim()) {
      throw new Error('Arquivo vazio');
    }

    const lines = readFile.trim().split('\n');
    const headers = lines[0].split(';').map(header => header.trim()); // Remove espaços extras nos headers
    const users = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';').map(value => value.trim()); // Remove espaços extras nos valores
      const user = {};
      headers.forEach((header, index) => {
        user[header] = values[index] || ''; // Adiciona valor vazio caso não haja dado correspondente
      });
      users.push(user);
    }

   return users
  } catch (err) {

  }
}


async function FetchData() {
 const Date = await NodeData(filePath)



return Date

}

async function FetchPoint0() {
  const Date = await NodeData('utils/Point0.csv')

  return Date
}

FetchData()

module.exports = {FetchData, FetchPoint0}