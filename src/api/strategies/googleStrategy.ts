import config from '../../config';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId!,
    clientSecret: config.google.clientSecret!,
    callbackURL: 'http:localhost:8001/auth/google/callback',
    scope: ['profile', 'email'],
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      user: profile!.emails![0].value,
    };

    done(null, user);
  }
);
