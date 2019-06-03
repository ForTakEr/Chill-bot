const fs = require('fs');

module.exports = async (msg) => {
  if (msg.trim() !== '*8ball') {
    return false;
  }
  const random = fs.readFileSync('sayings.txt', 'utf8').toString().split('\n');
  const result = random[Math.floor(Math.random() * random.length + 0)];
  if (result.length <= 1) {
    return 'Oopsie!';
  }
  return result;
};
