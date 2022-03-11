import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [val, setVal] = useState("");
  const [tasks, setTasks] = useState(undefined);
  const [haveToupdate, setHaveToUpdate] = useState(false);

  const fetchAllTasks = () => {
    fetch('http://localhost:8000/todos/')
      .then(res => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
        console.log("Successfully made a get request:)");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllTasks();
  }, [haveToupdate]);

  const handleClick = () => {
    if (!val || val === "") return;
    fetch('http://localhost:8000/todos/', {
      method: 'POST',
      body: JSON.stringify({
        title: val
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((res) => {
      if (res.status === 200) return res.json()
      else console.log('something went wrong:(');
    })
    .then(data => {
      console.log(data)
      setHaveToUpdate((haveToupdate) => !haveToupdate);
      setVal("");
    })
  };

  return (
    <div id="App" className="App">
      <div id="todos">
        <h1>List of TODOs</h1>
        {tasks ? (
        tasks.map((task, i) => {
          return ( <li key={i}>{task.title}</li>  );
        })
      ) : (
        <>Loading</>
      )}
      </div>
      <div>
        <h1>Create a ToDo</h1>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} id="input_box" />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button id="add_button" onClick={handleClick}>Add ToDo!</button>
          </div>
      </div>
    </div>
  );
}

export default App;
