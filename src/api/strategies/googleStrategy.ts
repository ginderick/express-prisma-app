import config from '../../config';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId!,
    clientSecret: config.google.clientSecret!,
    callbackURL: '/auth/google/callback', // Replace with your redirect URL
    scope: ['profile', 'email'],
  },
  (accessToken, refreshToken, profile, done) => {
    // Extract the user information from the profile object
    console.log('Access Token:', accessToken);
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile!.emails![0].value,
    };
    console.log(accessToken);

    // You can perform additional actions here, such as verifying the user or saving the user to a database

    // Call the done() callback with the user object
    done(null, accessToken);
  }
);
