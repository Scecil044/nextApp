const tokenTypes = {
    REFRESH: "Refresh",
    ACCESS:"Access",
    RESET:"Reset"
}

const tokenList = Object.values(tokenTypes);

module.exports = {
    tokenTypes,
    tokenList
}