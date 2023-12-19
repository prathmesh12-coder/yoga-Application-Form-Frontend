import React, { useState } from 'react';
import './App.css';

function App() {
  const [respErr, setRespErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    email: '',
    batch: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://subtle-syrniki-90dc7b.netlify.app/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 400) {
        setRespErr(true);
        setErrMsg(result.error || 'Bad Request');
      } else {
        setRespErr(false);
        setErrMsg('');
        console.log(result);
      }
    } catch (error) {
      console.error(error);
      setRespErr(true);
      setErrMsg('Something went wrong');
    }
  };

  return (
    <div className="App">
      <h1 className="header">Yoga Admission Form</h1>
      <form className="form">
        <label className="form-label">
          Name:
          <br/>
          <input type="text" name="name" onChange={handleInputChange} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Age:
          <br/>
          <input type="number" name="age" onChange={handleInputChange} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Mobile Number:
          <input type="tel" name="mobile" onChange={handleInputChange} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Email:
          <br/>
          <input type="email" name="email" onChange={handleInputChange} className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Batch:
          <br/>
          <select name="batch" onChange={handleInputChange} className="form-input">
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleSubmit} className="form-button">
          Enroll
        </button>
        {respErr && <p className="error-message">{errMsg}</p>}
      </form>
    </div>
  );
}

export default App;
