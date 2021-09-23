const { readFile } = require('fs/promises');


exports.readApiEndpoints = async () => {
    const endpoints = await readFile('./endpoints.json')
    
    return JSON.parse(endpoints)
}