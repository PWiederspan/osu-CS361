import React, { useState, useEffect } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import PlantList from '../components/plant_list';
import { useHistory } from 'react-router-dom';

function Home({setPlantToEdit}) {
      const [plants, setPlant] = useState([]);
      const history = useHistory();
      const [location, setLocation] = useState([]);
      const [temp, setTemp] = useState([]);


      const onDelete = async _id => {
        const response = await fetch(`/plants/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setPlant(plants.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete plant with _id = ${_id}, status code = ${response.status}`);
        }
    };

      const onEdit = plant => {
          setPlantToEdit(plant);
          history.push("/edit-plant");
      }

      const loadPlant = async () => {
          const response = await fetch('/plants');
          const data = await response.json();
          setPlant(data);
      }

      useEffect(() => {
          loadPlant();
      }, []);

      return (
          <>
              <h2>List of Plants</h2>
              <h3>My Location: {location}</h3>
              <input
               type="text"
               placeholder="Enter location here"
               value={temp}
               onChange={e => setTemp(e.target.value)}/>
               <button onClick={e => setLocation(temp)}>Update Location</button>
              <PlantList plants={plants}onDelete={onDelete}onEdit={onEdit}></PlantList>

          </>
      );
  }

export default Home;
