import React, { useState, useEffect } from "react";
import Task from "./Task";
import Form from "./Form";

function Tasks() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    var val = e.target[0].value;
    e.target[0].value = "";
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
    })
  };

  return (
    <div id="App" className="App">
      <div id="todos">
        <h1>List of TODOs</h1>
        {tasks ? (
        tasks.map((task, i) => {
          return ( <Task key={i} title={task.title} />  );
        })
      ) : (
        <>Loading</>
      )}
      </div>
      <div>
        <h1>Create a ToDo</h1>
            <Form handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Tasks;
