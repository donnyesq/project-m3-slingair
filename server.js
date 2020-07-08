"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { response } = require("express");
const { reservations } = require("./test-data/reservations");

const PORT = process.env.PORT || 8000;

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  console.log(flightNumber);
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  if (allFlights.includes(flightNumber)) {
    res.status(200).send(flights[flightNumber]);
  } else {
    res.status(400).send("Flight number does not exist");
  }
};

const handleReservation = (req, res) => {
  console.log("REQ.BODY", req.body);

  reservations.push(req.body);
  res.status(200).send(reservations);
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("flights", (req, res) => res.status(200).send(flights))
  .get("/flights/:flightNumber", handleFlight)
  .get("/users", (req, res) => res.status(200).send(reservations))
  .post("/users", handleReservation)
  .use((req, res) => res.send("Not Found"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
