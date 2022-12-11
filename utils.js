const formatMongooseResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map((d) => {
            const { __v, ...rest } = d._doc;
            return rest;
        });
    }
    const { __v, ...rest } = data._doc;
    return rest;
}

module.exports = {
    formatMongooseResponse
}