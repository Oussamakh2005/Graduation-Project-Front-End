
function applyFilter() {
  const price = document.getElementById("price").value;
  const fuel = document.getElementById("fuel").value;
  const transmission = document.getElementById("transmission").value;
  const seats = document.getElementById("seats").value;

  document.querySelectorAll(".car-card").forEach(card => {
    const matchPrice = !price || card.dataset.price === price;
    const matchFuel = !fuel || card.dataset.fuel === fuel;
    const matchTrans = !transmission || card.dataset.transmission === transmission;
    const matchSeats = !seats || card.dataset.seats === seats;

    card.style.display = (matchPrice && matchFuel && matchTrans && matchSeats) ? "block" : "none";
  });
}