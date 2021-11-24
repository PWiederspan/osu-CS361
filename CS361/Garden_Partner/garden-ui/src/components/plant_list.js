import React from 'react';
import Plant from './plant';

function PlantList({plants}) {
    return (
        <table id="plants">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Planting</th>
                    <th>Harvesting</th>
                </tr>
            </thead>
            <tbody>
                {plants.map((plant, i) => <Plant plant={plant}key={plant.Name} />)}
            </tbody>
        </table>
    );
}

export default PlantList;
