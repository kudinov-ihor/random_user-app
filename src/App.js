import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import PhotoBg from './assets/bg-pattern-card.svg';

function App() {
  
  const [data, setData] = useState({});
  const [gender, setGender] = useState('');

  const _url = `https://randomuser.me/api/`;
  
  const _genderUrl = `https://randomuser.me/api/?gender=${gender}`;

  const generateRandomUser = () => {
    axios.get(_url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  };

  const generateGenderUser = () => {
    axios.get(_genderUrl).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  }


  useEffect(() => {
    generateRandomUser();
  }, [])
  return (
    <div className="App">
      <h1>Generate random user</h1>
      <div className="switch">
        <button 
            className='male'
            onClick={() => {setGender('male'); generateGenderUser() }}
            >
              Male
        </button>
        <button 
            className='female'
            onClick={() => {setGender('female'); generateGenderUser() }}
            >
          Female
        </button>
      </div>
      <div className="card">
        <div className="card-head">
          <img src={PhotoBg} alt="" className='profile-bg'/>
          {data.results ? <img src={data.results[0].picture.large} className="profile-img"></img> : null}
        </div>
        <div className="card-body">
          {data.results ? <h1>{data.results[0].name.first} {data.results[0].name.last} {data.results[0].dob.age}</h1>: null} 
          {data.results ? <h2>{data.results[0].gender}</h2> : null}
          <h4>Location</h4>
          {data.results ? <h2>{data.results[0].location.country } {data.results[0].location.city}</h2> : null}
          <h4>E-mail</h4>
          {data.results ? <h2>{data.results[0].email } </h2> : null}
          <h4>Username</h4>
          {data.results ? <h2>{data.results[0].login.username}</h2> : null}
          <h4>Password</h4>
          {data.results ? <h2>{data.results[0].login.password}</h2> : null}
        </div>


      </div>


    </div>
  );
}

export default App;
