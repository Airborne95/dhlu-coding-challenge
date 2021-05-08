import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const url = "http://localhost:8000";

function App() {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);
  const [addUserInput, setAddUserInput] = useState(''); // Used to clear textbox after a new user was entered
  const [refreshKey, setRefreshKey] = useState(0); // Used to refresh user list after a new user is added

  const fetchUsers = async () => {
    setFetching(true);

    let json;
    try {
      const data = await fetch(url + "/users/");
      json = await data.json();
      console.log(json);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    if (json) {
      setUsers(json);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(addUserInput)
  };

  function addUser(user) {
    setAddUserInput(''); //Clear input textbox

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name: user })
    };
    fetch(url + "/users/add/", requestOptions) // Make POST request
    .catch(error => console.log(error));
    setRefreshKey(oldKey => oldKey +1) // Trigger to refresh list
   }


  return (
    <div className="App">
      <header className="App-header">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users?.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        )}
        <div>
          <form onSubmit={handleSubmit}>
              <label>
                <p>Add User</p>
                <input type="text" placeholder="John" onChange={event => setAddUserInput(event.target.value)} value={addUserInput}/>
              </label>
              <button type="submit">Submit</button>
            </form>
        </div>
      </header>
    </div>
  );
}

export default App;
