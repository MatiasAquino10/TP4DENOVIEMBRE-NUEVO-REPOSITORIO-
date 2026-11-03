import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <p>Contenido principal de la app...</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
