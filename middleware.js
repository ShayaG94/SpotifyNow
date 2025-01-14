const axios = require('axios');

module.exports.validateAccessToken = (user, spotifyAuth) => {
    console.log(Date.now(), user.token.expires_in);
    if (Date.now() < user.token.expires_in) return true;
    return false;
};

module.exports.refreshAccessToken = (user, spotifyAuth) => {
    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            grant_type: 'authorization_code',
            code: user.token.refresh_token,
            redirect_uri: spotifyAuth.redirectUri,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: spotifyAuth.authorizationHeaderString,
        },
    })
        .then((response) => {
            return response;
        })
        .catch((e) => {
            return e.response.data;
        });
};
