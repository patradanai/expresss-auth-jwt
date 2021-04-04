const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT || 6379);
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

// Get Key
const getCache = (key) => {
  return new Promise(async (resolve, reject) => {
    if (!key) {
      reject(new Error("Key not existing"));
    }

    try {
      const value = await getAsync(key);
      console.log(1);
      resolve(value);
    } catch (err) {
      console.log(2);
      reject(new Error(err));
    }
  });
};

// Set Key
const setCache = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      client.set(key, value, () => {
        resolve();
      });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

// Set Key
const setCacheEx = (key, value, ex) => {
  return new Promise((resolve, reject) => {
    try {
      client.setex(key, ex, value, () => {
        resolve();
      });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

// Del Key
const delCache = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.del(key, (err, res) => {
        if (res == 1) {
          resolve();
        } else {
          reject(new Error(err));
        }
      });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

module.exports = {
  getCache: getCache,
  setCache: setCache,
  setCacheEx: setCacheEx,
  delCache: delCache,
};
