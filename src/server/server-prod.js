import path from 'path';
import express from 'express';
import api from "./api/index";


const app = express(),
    CLIENT_DIR = `${__dirname}/../client`,
    HTML_FILE = path.join(CLIENT_DIR, 'index.html');

console.log(__dirname);

app.use(express.static(CLIENT_DIR));

app.use("/api", api);

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});