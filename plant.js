import React from 'react';

function Plant({plant}) {
    return (
        <tr>
            <td>{plant.name}</td>
            <td>{plant.details}</td>
            <td>{plant.planting}</td>
            <td>{plant.harvesting}</td>
        </tr>
    );
}

export default Plant;
