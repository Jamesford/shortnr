import bcrypt from 'bcrypt-nodejs';

let salt = bcrypt.genSaltSync(6);
let password = bcrypt.hashSync('password', salt);

// Temp DB for Development ONLY
module.exports = {
  'e7a4477e-9456-4c10-8e46-ec7b8fc2c485': {
    username: 'jamie',
    passhash: password,
    access: ['admin']
  },
  '60240db1-cc90-4b93-8c61-b4957d39e100': {
    username: 'raynor',
    passhash: password,
    access: ['user']
  }
}
