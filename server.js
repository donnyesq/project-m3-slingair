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
  reservations.push(req.body);
  res.status(200).send(reservations);
};

const showReservation = (req, res) => {
  console.log(req.params);
  const idInput = req.params;
  console.log(idInput);

  const reso = reservations.find((element) => {
    return element.id === idInput.reservationId;
  });
  console.log(reso);
  res.status(200).json(reso);
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
  .get("/view-reservation/:reservationId", showReservation)
  .get("/users/:reservationId", (req, res) =>
    res.status(200).send({ reservations })
  )
  .post("/users", handleReservation)
  .use((req, res) => res.send("Not Found"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
