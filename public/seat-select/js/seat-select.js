const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = (arrOfSeats) => {
  document.querySelector(".form-container").style.display = "block";

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...

      const flight = document.querySelector("#flight");

      const seatFound = arrOfSeats.find((seat) => {
        return seat.id === seatNumber;
      });

      if (!seatFound.isAvailable) {
        seat.innerHTML = seatOccupied;
      } else {
        seat.innerHTML = seatAvailable;
      }
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];

  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = async (event) => {
  const flightNumber = flightInput.value;

  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?
  const regex = /^SA[0-9]{3}/;

  if (regex.test(flightInput.value)) {
    const res = await fetch(`/flights/${flightNumber}`);
    const data = await res.json();

    renderSeats(data);
  }

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
};

const randomId = Math.floor(Math.random() * 1001);

const handleConfirmSeat = (event) => {
  event.preventDefault();
  // TODO: everything in here!
  fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      id: randomId.toString(),
      flight: flightInput.value,
      seat: selection,
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("DATA FROM POST REQUEST: ", data);
      window.location = `/seat-select/confirmed.html?reservationId=${randomId}`;
    });
};

flightInput.addEventListener("blur", toggleFormContent);
