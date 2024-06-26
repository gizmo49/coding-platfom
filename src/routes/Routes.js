import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/pages/Home/Home';
import CreateChallengePage from '../components/pages/CreateChallengePage';
import AttemptChallengePage from '../components/pages/AttemptChallengePage/AttemptChallengePage';
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import PrivateRoute from './PrivateRoutes/PrivateRoutes';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/create-challenge" component={CreateChallengePage} />
      <Route path="/challenges/:codingProblemId" component={AttemptChallengePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  );
};

export default Routes;
