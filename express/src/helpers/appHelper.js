exports.url = (req, path = null) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${path}`;

    return fullUrl;
}