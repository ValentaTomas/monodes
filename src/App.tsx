import React from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from './Game';
import logo from './logo.svg';


const App = Client({ game: Game });

export default App;
