const app = require('./app');
const colors = require('colors');

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${process.env.PORT}`.blue);
})