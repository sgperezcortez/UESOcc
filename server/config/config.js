module.exports = {
  dev: {
    JWT_SECRET: 'uesoccwebsite',
    port: process.env.port || 3000,
    db: process.env.DB_LINK || 'mongodb://localhost/uesocc'
  },
  prod: {
    
  }
}