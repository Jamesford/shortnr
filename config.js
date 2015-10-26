module.exports = {
  server: {
    port: 3000
  },
  
  auth: {
    privateKey: 'some_super_secret_key_dont_tell_anyone',
    tokenTTL: 30 * 60 * 1000 // 30 minutes in ms
  },

  redis: {
    port: 6379,
    host: 'localhost'
  }
}
