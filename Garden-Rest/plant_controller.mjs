import * as plant from './plant_model.mjs';
import express from 'express';
import * as http from 'http';


const PORT = 3000;

const app = express();
let ip_address = '';

let options = {
  host: 'http://v6.ipv6-test.com/api/myip.php',
  port: 80,
  path: '/'
};

app.use(express.static('public'));


app.use(express.json());


/**
 * Create a new Plant with the name, reps, weight, unit, and date provided in the body
 */
app.post('/plants', (req, res) => {
    plant.createPlant(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then( plant => {
            res.status(201).json(plant);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(500).json({ Error: 'Request failed' });
        });
});


http.get('http://v4.ipv6-test.com/api/myip.php', (resp) => {

  // A chunk of data has been received.
  resp.on('ip_address', (chunk) => {
    ip_address += chunk;
    console.log(ip_address);
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(ip_address);
    return ip_address
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});



/**
 * Retrive plant.
 * If the query parameters include a year, then only the plant for that year are returned.
 * Otherwise, all plants are returned.
 */

 app.get('/plants/:_id', (req, res) => {
     const plantId = req.params._id;
     plant.findPlantById(plantId)
         .then(plant => {
             if (plant !== null) {
                 res.status(200).json(plant);
             } else {
                 res.status(500).json({ Error: 'Resource not found' });
             }
         })
         .catch(error => {
             console.error(error);
             res.status(500).json({ Error: 'Request failed' });
         });
 });


app.get('/plants', (req, res) => {
    let filter = {};
    // Is there a query parameter named name? If so add a filter based on its value.
    if (req.query.name !== undefined) {
        filter = { name: req.query.name };
    }
    plant.findPlant(filter, '', 0)
        .then(plant => {
            res.status(200).json(plant);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Update the plant whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/plants/:_id', (req, res) => {
    plant.replacePlant(req.params._id, req.body.name, req.body.details, req.body.planting, req.body.harvesting)
        .then(numUpdated => {
            if (numUpdated === 1) {
                console.log({ _id: req.params._id, name: req.body.name, details: req.body.details, planting: req.body.planting, harvesting: req.body.harvesting })
                res.status(200).json({_id: req.params._id, name: req.body.name, details: req.body.details, planting: req.body.planting, harvesting: req.body.harvesting  })
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the plant whose id is provided in the query parameters
 */
app.delete('/plants/:_id', (req, res) => {
    plant.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
