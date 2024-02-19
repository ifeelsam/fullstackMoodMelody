import querystring from 'querystring';
import fetch from 'node-fetch';
import express from 'express';
const app = new express()

const client_id = "a02a9d7ed5ed4a638979730150ae1589"
const client_secret = "4621147b447645939fc7dbc5130e76ed"
var redirect_uri = 'https://localhost:5173/callback';

function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

app.get('/login', function(req, res) {

  let state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
app.get('/callback', function(req, res) {

  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }
 
});
// This function is called when Spotify redirects the user back to your site

//   const params = {
//     grant_type: 'authorization_code',
//     code: code  ,
//     redirect_uri: redirect_uri,
//   };

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': 'Basic ' + (btao(client_id + ':' + client_secret).toString('base64')),
//   };

//   fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     body: querystring.stringify(params),
//     headers: headers,
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

app.listen(3000)