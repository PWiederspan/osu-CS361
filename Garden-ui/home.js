import React, { useState, useEffect } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import PlantList from '../components/plant_list';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function Home({setPlantToEdit}) {
      const [plants, setPlant] = useState([]);
      const history = useHistory();
      const [location, setLocation] = useState([]);
      const [temp, setTemp] = useState([]);
      const [url, setURL] = useState([]);


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

      //creating IP state
      const [ip, setIP] = useState('');

      //creating function to load ip address from the API
      const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv)
        const res2 = await axios.get('http://localhost:5002/location_service/?ip_address='+res.data.IPv4)
          console.log("Location updated to :" + res2.data.city);
          setCity(res2.data.city)
          setLocation(city)

      }

      useEffect( () => {
        //passing getData method to the lifecycle method
        getData()

      }, []);

      //creating IP state
      const [city, setCity] = useState('');

      const loadPlant = async () => {
          const response = await fetch('/plants');
          const data = await response.json();
          setPlant(data);
      };

      useEffect(() => {
          loadPlant();
      }, []);

      return (
          <>
              <h2>List of Plants</h2>
              <h3>My Location: {location}</h3>
               <button onClick={e => getData()}>Update Location</button>
              <PlantList plants={plants}onDelete={onDelete}onEdit={onEdit}></PlantList>

          </>
      );
  }

export default Home;
