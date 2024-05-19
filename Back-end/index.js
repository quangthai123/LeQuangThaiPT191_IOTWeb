const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const mysql = require("mysql2");
const mqtt = require("mqtt");
const WebSocket = require("ws");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1Hitgapcu@",
  database: "iot_db",
});

const brokerURL = "mqtt://192.168.1.17";

const options = {
  username: "accB",
  password: "123",
  port: 667
};

const client = mqtt.connect(brokerURL, options);

client.on("connect", () => {
  console.log("Connected to broker!");

  client.subscribe("sensor_data", (err) => {
    if (err) console.log("Subscribe sensor_data error: " + err);
    else console.log("Topic sensor_data ok!");
  });

  client.subscribe("light_data", (err) => {
    if (err) console.log("Subscribe light_data error: " + err);
    else console.log("Topic light_data ok!");
  });

  client.subscribe("fan_data", (err) => {
    if (err) console.log("Subscribe fan_data error: " + err);
    else console.log("Topic fan_data ok!");
  });
});

client.on("reconnect", () => {
  console.log("Reconnecting...");
});

client.on("error", (err) => {
  console.error("Error:", err);
});

function handleDevice(msg, device) {
  client.publish(`device/${device}`, msg, (err) => {
    if (err) {
      console.log("Publish error: " + err);
    } else console.log(msg);
  });
}

app.get("/api/v1/device_control", (req, res) => {
  const device = req.query.device;
  const msg = req.query.state;
  //const {device, msg} = req.body;
  res.send("Device: " + device + " Message: " + msg);
  const queryString = "INSERT INTO action (device, mode, datetime) VALUES (?,?,NOW())";
  db.query(queryString, [device, msg == "1" ? "on" : "off"], (err) => {
    if (err) console.log(err);
  });
  handleDevice(msg, device);
});

app.get("/api/v1/get_chart_data", (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const query = `SELECT * FROM sensor ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/api/v1/get_sensor_data", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  const searchColumn = req.query.searchColumn || "all";
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "DESC";
  const searchTerm = req.query.searchTerm || "";

  const query =
    searchColumn !== "all"
      ? `SELECT * FROM sensor
                WHERE ${searchColumn} LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${limit} OFFSET ${offset}`
      : `SELECT * FROM sensor
      WHERE datetime LIKE "%${searchTerm}%" 
      OR temperature LIKE "%${searchTerm}%" 
      OR humidity LIKE "%${searchTerm}%" 
      OR brightness LIKE "%${searchTerm}%"
      OR id LIKE "%${searchTerm}%" 
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.get("/api/v1/get_action_history", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "DESC";
  const searchColumn = req.query.searchColumn || "all";
  const searchTerm = req.query.searchTerm || "";

  const query = searchColumn !== "all"
    ? `SELECT * FROM action
                WHERE ${searchColumn} LIKE "%${searchTerm}%"
                ORDER BY ${sortColumn} ${sortOrder}
                LIMIT ${limit} OFFSET ${offset}`
    : `SELECT * FROM action
      WHERE datetime LIKE "%${searchTerm}%" 
      OR device LIKE "%${searchTerm}%" 
      OR mode LIKE "%${searchTerm}%" 
      OR id LIKE "%${searchTerm}%" 
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

const PORT = 4000 || process.env.PORT;

const server = app.listen(PORT, () => console.log(`App start on ${PORT}`));
const wss = new WebSocket.Server({ noServer: true });

const handleSensorData = (message, ws) => {
  const [temperature, humidity, brightness] = message.toString().split(",");
  console.log("Sensor data message: " + message.toString());

  const queryString =
    "INSERT INTO sensor (temperature, humidity, brightness, datetime) VALUES (?, ?, ?, NOW())";
  db.query(queryString, [temperature, humidity, brightness], (err, result) => {
    if (err) {
      console.error("Error saving sensor data to the database:", err);
      return;
    }
    console.log("Sensor data saved to the database");
  });
  ws.send(JSON.stringify({ temperature, humidity, brightness }));
};

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

client.on("message", (topic, message) => {
  if (topic === "sensor_data") {
    wss.clients.forEach((ws) => {
      handleSensorData(message, ws);
    });
  }
  if (topic === "light_data") {
    wss.clients.forEach((ws) => {
      ws.send(JSON.stringify({ light_data: message.toString() }));
    });
  }
  if (topic === "fan_data") {
    wss.clients.forEach((ws) => {
      ws.send(JSON.stringify({ fan_data: message.toString() }));
    });
  }
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});


