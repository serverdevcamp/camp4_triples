import { google } from 'googleapis';
import googleClient from '../config/google.json';
import { OAuth2Client } from 'googleapis-common';

const googleConfig = {
  clientId: googleClient.web.client_id,
  clientSecret: googleClient.web.client_secret,
  redirect: googleClient.web.redirect_uris[0]
};

const scopes = [
  'http://www.googleapis.com/auth/plus.me'
];

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
)

const url = oauth2Client.generateAuthUrl({
  access_type: 'offiline',
  scope: scopes
});

function getGooglePlusApi(auth: string | OAuth2Client){
  return google.plus({ version: 'v1', auth });
}

async function googleLogin(code: string){
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  oauth2Client.on('tokens', (tokens) =>{
    //refreshtoken 레디스 등록,
  });
  const plus = getGooglePlusApi(oauth2Client);
  const res = await plus.people.get({ userId:'me' });
  console.log(`Hello ${res.data.displayName} ! ${res.data.id}`);
  return res.data.displayName;
}