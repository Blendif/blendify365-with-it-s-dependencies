import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import EbookPage from './components/EbookPage';
import ServicePage from './components/ServicePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ebooks/:id" component={EbookPage} />
        <Route path="/services/proofreading" component={ServicePage} />
      </Switch>
    </Router>
  );
}

export default App;
