let id;

const content = document.querySelector(".content");
const form = document.createElement("form");
const label = document.createElement("label");
const input = document.createElement("input");
const button = document.createElement("button");
button.innerText = "Submit";
button.style.backgroundColor = "gray";

button.addEventListener("click", (event) => {
  console.log("*****");
  event.preventDefault();
  // 88a33c23-3332-4ef2-bd71-be7a6430485f
  id = input.value;
  console.log("ID:", id);
  getData();
});

content.appendChild(form);
form.appendChild(label);
form.appendChild(input);
form.appendChild(button);

const div = document.createElement("div");
const flight = document.createElement("p");
const seat = document.createElement("p");
const name = document.createElement("p");
const email = document.createElement("p");

document.body.append(div);
div.appendChild(name);
div.appendChild(flight);
div.appendChild(seat);
div.appendChild(email);

const getData = async () => {
  const response = await fetch(`/view-reservation/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((reservation) => {
      // console.log("IN VIEW RESERVATION", await response.json());
      // const { reservation } = await response.json();
      console.log("DATA FROM RESERVATION VIEW FETCH: ", reservation);

      // const reservation = reservations.find((element) => {
      //   console.log(typeof element.id);
      //   console.log(typeof id);
      //   console.log(element.id);
      //   console.log(id);
      //   console.log(element.id === id);
      //   return element.id === id;
      // });

      flight.innerHTML = reservation.flight;
      seat.innerHTML = reservation.seat;
      name.innerHTML = `${reservation.givenName} ${reservation.surname}`;
      email.innerHTML = reservation.email;
    });
};
