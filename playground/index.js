const colors = require("colors");

const file1 = "challenge.jpg";
const file2 = "challenge.png";
const file3 = "challenge.jpeg";

let concat = 0;

const test = (file) => {
  if (
    file.slice(file.length - 3, file.length) === "jpg" ||
    file.slice(file.length - 3, file.length) === "png"
  )
    concat = 3;
  else if (file.slice(file.length - 4, file.length) === "jpeg") concat = 4;
}
test(file3);
console.log(colors.green(file1.slice(0, file1.length-concat)));
// console.log(colors.green(file.slice(file.length-3, file.length)))
