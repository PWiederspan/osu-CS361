import React from 'react';

function Plant({plant}) {
    return (
        <tr>
            <td>{plant.Name}</td>
            <td>{plant.Details}</td>
            <td>{plant.Planting}</td>
            <td>{plant.Harvesting}</td>
        </tr>
    );
}

export default Plant;
