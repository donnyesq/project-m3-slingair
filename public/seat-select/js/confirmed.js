const reservationId = window.location.search.split("=")[1];

const flight = document.getElementById("flight");
const seat = document.getElementById("seat");
const name = document.getElementById("name");
const email = document.getElementById("email");

const getData = async () => {
  const response = await fetch("/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();

  console.log("DATA FROM CONFIRMED FETCH: ", data);
  console.log(typeof data);

  const reservation = data.find((reservation) => {
    reservation.id === reservationId;
  });

  flight.innerHTML = reservation.flight;
  seat.innerHTML = reservation.seat;
  name.innerHTML = `${reservation.givenName} ${reservation.surname}`;
  email.innerHTML = reservation.email;
};

getData();
