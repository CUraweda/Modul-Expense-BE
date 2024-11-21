const bcrypt = require("bcrypt");

const SALT_ROUND = 10;

const hash = async (text) => {
    return bcrypt.hash(text, SALT_ROUND).then(function(hash) {
        return hash;
    });
}

const compare = async (text, hash) => {
    return bcrypt.compare(text, hash).then(function(result) {
        return result;
    });
}

module.exports = { hash, compare }