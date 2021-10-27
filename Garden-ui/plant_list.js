import React from 'react';
import Plant from './plant';

function PlantList({plants, onDelete, onEdit }) {
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
                {plants.map((plant, i) => <Plant plant={plant}key={i}/>)}
            </tbody>
        </table>
    );
}

export default PlantList;
