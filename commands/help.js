module.exports = async (msg) => {
    if (msg.trim() !== '*help') {
      return false;
    }
    return `I have the following commands available: 
     * *help - show help about commands 
     * *ping - sends the response time between of the bot
     * *8ball - sends a random message from a collection
     `;
  };
  