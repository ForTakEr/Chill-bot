module.exports = async (msg) => {
    if(msg.trim() !== '*ping'){
        return false;
    }
    return (new Date().getTime()).toString() - msg.createdTimestamp  + " ms";
}