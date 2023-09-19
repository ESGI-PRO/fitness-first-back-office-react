import express from 'express';
// const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);

app.listen(80, () => {
    console.log(`Server started on port ${80}`);
});