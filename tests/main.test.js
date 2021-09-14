//? starting local db
// cd ~
// cd ..
// cd .. 
// cd "Program Files"
// cd MongoDB/Server/5.0/bin 
// ./mongod.exe

// test('Async test demo', (next) => {
//   setTimeout(() => {
//     expect(1).toBe(2);

//     //? the code will not continue till next is called
//     next()
//   }, 2000)
// })

const request = require("supertest");
const app = require("../src/app");
const validator = require("validator");

const SUCCESS = 'success';
const ERROR = 'error';

test('Does server work', async () => {
  await request(app).get('/').expect(200);
})

test("Is strong password", () => {
  expect()
})
