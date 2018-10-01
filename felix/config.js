// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'



const serverpath = {
 url: {
   host: 'http://paceviciusp.baltic-amadeus.lt',
   port: 8880
 }
};

const projectPath = {
  path: 'felix/web/pdo/system/'
}

const config = {
 API_URL: `${serverpath.url.host}:${serverpath.url.port}/${projectPath.path}`
};

module.exports = config;

