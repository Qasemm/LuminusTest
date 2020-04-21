const
    express = require("express"),
    bodyParser = require('body-parser'),
    app = express(),
    port = 5000,
    {TwingEnvironment, TwingLoaderFilesystem} = require('twing'),
    loader = new TwingLoaderFilesystem('./src/templates'),
    twing = new TwingEnvironment(loader),
    {insertDragon, updateDragon, getAllDragons, getDragon} = require('./Dragons/dragons'),
    {getAllLocations} = require('./Locations/locations')
;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

app.get('/', (req, res) => {
    getAllDragons((error, result) => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }
        
        twing.render('./main/main.twig', {dragons: result}).then(output => {
            res.end(output);
        });
    });
});

app.get('/create', (req, res) => {
    getAllLocations((error, result) => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }
        
        const locations = result.map(location => {
            return {
                id: location.id,
                name: location.name,
            }
        });

        twing.render('./form/form.twig', {locations, isCreate: true}).then(output => {
            res.end(output);
        });
    });
});

app.post('/insert', (req, res) => {
    insertDragon(req.body, error => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    getDragon(req.params.id, (error, dragon) => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        getAllLocations((error, locations) => {
            if (error) {
                res.status(500).send(error.sqlMessage);
                return;
            }
            
            twing.render('./form/form.twig', {dragon, locations, isCreate: false}).then(output => {
                res.end(output);
            });
        });
    });
});

app.post('/update/:id', (req, res) => {
    updateDragon(req.params.id, req.body, error => {
        if (error) {
            res.status(500).send(error.sqlMessage);
            return;
        }

        res.redirect('/');
    });
});

app.listen(port, () => console.log(
    `API is listening on port ${port} with version ${process.version} :)`
));
