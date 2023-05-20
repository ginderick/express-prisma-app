import express from 'express';
import routes from '../api';
import passport from 'passport';

const expressLoader = ({app}: {app: express.Application}) => {
  app.use(express.json());
  app.use(passport.initialize());
  app.use('/', routes());
};

export default expressLoader;
