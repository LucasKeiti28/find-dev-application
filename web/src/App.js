import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Aside.css";
import "./Main.css";

import Dev from "./components/DevItem";
import Form from "./components/FormItem";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, [devs]);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Form onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return <Dev key={dev._id} dev={dev} />;
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
