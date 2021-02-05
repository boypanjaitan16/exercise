exports.url = (req, path = null) => {
    const protocol  = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const fullUrl   = `${protocol}://${req.get('host')}${path}`;

    return fullUrl;
}