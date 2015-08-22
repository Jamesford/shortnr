// Update to regular bcrypt when not on windows
import bcrypt from 'bcrypt-nodejs';

let start = new Date().getTime();

let s = bcrypt.genSaltSync(6);
let h = bcrypt.hashSync('password', s);

let test = bcrypt.compareSync('password', h);

let finish = new Date().getTime();

console.log(finish - start + 'ms', '-', h, test);