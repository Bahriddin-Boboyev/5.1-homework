import React from "react";
import "./App.css";
import {Header} from "./components/header/header";
import { Main } from "./components/main/main";

function App() {
  return (
    <>
    <header className="App-header">
    <Header/>
    </header>

    <main className="App-main">
    <Main/>
    </main>

    <footer className="App-footer">

    </footer>
    </>
  );
}

export default App;
