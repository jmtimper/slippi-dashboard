const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const {SlippiGame} = require("@slippi/slippi-js");

const app = express();

app.use(fileUpload());

// Upload new file to folder
app.post('/upload', (req, res) => {
    if (req.files === null) {
        console.log(req)
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/slippi-dashboard/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    });
});

// Fetch all file data
app.get('/fetch/files/all', (req, res) => {
    fs.readdir(`${__dirname}/slippi-dashboard/public/uploads/`, (e, files) => {
        files.forEach(file => {
            console.log(file)
            const game = new SlippiGame(`${__dirname}/slippi-dashboard/public/uploads/` + file);

// Get game settings – stage, characters, etc
            const settings = game.getSettings();
            console.log(settings);

// Get metadata - start time, platform played on, etc
            const metadata = game.getMetadata();
            console.log(metadata);

// Get computed stats - openings / kill, conversions, etc
            const stats = game.getStats();
            console.log(stats);
        })
    })
    res.send(
        200
    )
});

// Fetch single game file if exists
app.get('/fetch/files/specific', (req, res) => {
    const filename = req.query.file
    const game = new SlippiGame(`${__dirname}/slippi-dashboard/public/uploads/` + filename + '.slp');

    res.status(
        200
    ).json({
        settings: game.getSettings(),
        stats: game.getStats().overall
    })
});

app.listen(5000, () => console.log('Server Started...'));