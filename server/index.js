const express = require('express');
const app = express();
const port = 80;
const path = require('path');

app.use(express.static(
    path.join(__dirname, '../dist/')
));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});