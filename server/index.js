const express= require( 'express');
const mysql = require('mysql2');
// const  cors =require('cors') ;

const app = express();
// app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   host: 'localhost',
    user: 'root',
    password: '1Hitgapcu@',
    database: 'iot_db',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
})

app.get('/getAllSensor', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const sql = `SELECT * FROM sensor LIMIT ?, ?`;
    const values = [offset, pageSize];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});

app.post('/insertSensor', (req, res) => {
    const { temperature, humidity, brightness } = req.body;

    const sql = "INSERT INTO sensor (temperature, humidity, brightness, datetime) VALUES (?, ?, ?, NOW())";
    const values = [temperature, humidity, brightness];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json({ Message: 'success' });
    });
});

app.get('/sortDataSensor', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';
    const sortBy = req.query.sortBy; // Trường muốn sắp xếp

    let sql = '';
    let values = [];

    switch (sortBy) {
        case 'temperature':
        case 'humidity':
        case 'brightness':
        case 'datetime':
            sql = `SELECT * FROM sensor ORDER BY ${sortBy} ${sortOrder} LIMIT ?, ?`;
            values = [offset, pageSize];
            break;
        default:
            return res.json({ Message: 'Invalid sort field' });
    }

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});



app.get('/searchDataSensor', (req, res) => {
    const { type, value, page, pageSize } = req.query;

    if (!type || !value) {
        return res.status(400).json({ Message: 'Type and value are required in query parameters' });
    }

    const parsedPage = parseInt(page) || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset = (parsedPage - 1) * parsedPageSize;

    let sql = '';
    let errorMessage = '';

    switch (type) {
        case 'temperature':
            sql = 'SELECT * FROM sensor WHERE temperature = ? LIMIT ?, ?';
            errorMessage = 'Temperature is required in query parameters';
            break;
        case 'humidity':
            sql = 'SELECT * FROM sensor WHERE humidity = ? LIMIT ?, ?';
            errorMessage = 'Humidity is required in query parameters';
            break;
        case 'brightness':
            sql = 'SELECT * FROM sensor WHERE brightness = ? LIMIT ?, ?';
            errorMessage = 'Brightness is required in query parameters';
            break;
        case 'datetime':
            sql = 'SELECT * FROM sensor WHERE DATE(datetime) = ? LIMIT ?, ?';
            errorMessage = 'datetime is required in query parameters';
            break;
        default:
            return res.status(400).json({ Message: 'Invalid type specified' });
    }

    const values = [value, offset, parsedPageSize];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(`Error while searching ${type}:`, err);
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});

//actionHistory
app.get('/getActionHistory', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const sql = `SELECT * FROM action LIMIT ?, ?`;
    const values = [offset, pageSize];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});

app.post('/insertActionHistory', (req, res) => {
    const { device, mode } = req.body;

    const sql = "INSERT INTO action (device, mode, datetime) VALUES (?, ?, NOW())";
    const values = [device, mode];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json({ Message: 'success' });
    });
});

app.get('/filterDeviceActionHistory', (req, res) => {
    const { device, page, pageSize } = req.query;
    if (!device) {
        return res.status(400).json({ Message: 'Device are required in query parameters' });
    }
    const parsedPage = parseInt(page) || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset = (parsedPage - 1) * parsedPageSize;
    let sql = '';
    switch(device) {
        case 'led1':
            sql = 'SELECT * FROM (SELECT * FROM action LIMIT ?, ?) AS sub_query WHERE device = "led1"';
            break;
        case 'led2':
            sql = 'SELECT * FROM (SELECT * FROM action LIMIT ?, ?) AS sub_query WHERE device = "led2"';
            break;
        case 'fan':
            sql = 'SELECT * FROM (SELECT * FROM action LIMIT ?, ?) AS sub_query WHERE device = "fan"';
            break;
        default:
            return res.status(400).json({ Message: 'Invalid device specified' });
    }
    const values = [offset, parsedPageSize];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(`Error while filtering ${device}:`, err);
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});
app.get('/filterModeActionHistory', (req, res) => {
    const { mode, page, pageSize } = req.query;
    if (!mode) {
        return res.status(400).json({ Message: 'Mode are required in query parameters' });
    }
    const parsedPage = parseInt(page) || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset = (parsedPage - 1) * parsedPageSize;
    let sql = '';
    switch(mode) {
        case 'ON':
            sql = 'SELECT * FROM (SELECT * FROM action LIMIT ?, ?) AS sub_query WHERE mode = 1';
            break;
        case 'OFF':
            sql = 'SELECT * FROM (SELECT * FROM action LIMIT ?, ?) AS sub_query WHERE mode = 0';
            break;
        default:
            return res.status(400).json({ Message: 'Invalid mode specified' });
    }
    const values = [offset, parsedPageSize];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(`Error while filtering ${mode}:`, err);
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});
app.get('/searchDateActionHistory', (req, res) => {
    const { date, page, pageSize } = req.query;

    if (!date) {
        return res.status(400).json({ Message: 'Date is required in query parameters' });
    }

    const parsedPage = parseInt(page) || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset = (parsedPage - 1) * parsedPageSize;
    // const order = sortOrder && sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    const sql = 'SELECT * FROM action WHERE DATE(datetime) = ? LIMIT ?, ?';
    const values = [date, offset, parsedPageSize];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error while searching actions by date:", err);
            return res.status(500).json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});

app.get('/sortDateActionHistory', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    let sql = `SELECT * FROM action ORDER BY datetime ${sortOrder} LIMIT ?, ?`;
    let values = [offset, pageSize];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});

app.listen(8081, ()=>{
    console.log("Listening");
})
