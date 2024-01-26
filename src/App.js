import DetailsCardComponent from "./components/DetailsCardComponent";
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [recordData, setRecordData] = useState([]);

  console.log("process.env:", process.env);
  console.log("process.env.REACT_APP_NODE_ENV:", process.env.REACT_APP_NODE_ENV);
  console.log("process.env.REACT_APP_SERVER_BASE_URL:", process.env.REACT_APP_SERVER_BASE_URL);
  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

  useEffect(() => {
   axios.get(`${base_url}/getUsers`).then(res => { setRecordData(res.data) }).catch(err => alert(`Some error occured ==>${err}`));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${base_url}/addUser`, formData).then(res => { setFormData({ name: "", email: "" }); alert("User created successfully") }).catch(err => alert(`Some error occured ==>${err}`));
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light mb-2">
        <a class="navbar-brand" href="https://www.youtube.com/@IntegrationNinjas">
          <img src="./logo_p.png" width="50" height="50" class="d-inline-block" alt="" />
          Integration Ninja
        </a>
      </nav>
      <div className='container'>
        <div className="row">
          <div className="col">
            <h3 className="text-center">Users List</h3>
            <ul>
              {recordData.map((r, i) => <tl key={i}><DetailsCardComponent email={r.email} sn={i+1} userN={r.name} /></tl>)}
            </ul>
          </div>
          <div className="col">
            <h2>Add Users</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputUser">User Name</label>
                <input type="text" name="name" className="form-control" id="exampleInputUser" value={formData.name} onChange={handleChange} placeholder="Enter user name" />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail">Email</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail" value={formData.email} onChange={handleChange} placeholder="Enter email" />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
