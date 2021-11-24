import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Search({navigation}) {
  const [name, setName] = useState("");
  const [plants, setPlant] = useState([]);
  const [foundPlant, setFoundPlant] = useState(plants);

  const loadPlant = async () => {
      const response = await fetch(`/plants`);
      const data = await response.json();
      setPlant(data);
  };

  useEffect(() => {
      loadPlant();
  }, []);


  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = plants.filter((plant) => {
        return plant.Name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundPlant(results);
    } else {
      setFoundPlant(plants);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Enter plant name ..."
      />

      <div className="user-list">
        {foundPlant && foundPlant.length > 0 ? (
          foundPlant.map((plant) => (
        <ul id='searchUL'>
            <li key={plant._id} className="plant">
              <span className="plant-name">{plant.Name}</span>
            </li>
        </ul>
          ))) : (
            plants.map((plant) => (
          <ul id='searchUL'>
              <li key={plant._id} className="plant">
                <span className="plant-name">{plant.Name}</span>
              </li>
          </ul>
            )))
        }
      </div>
    </div>
  );
}


export default Search;
