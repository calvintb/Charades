import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { AppRegistry } from "react-native";

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
