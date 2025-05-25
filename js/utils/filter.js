let displayedCards = 0;
function applyFilter() {
  /*const price = document.getElementById("price").value;*/
  const fuel = document.getElementById("fuel").value;
  const transmission = document.getElementById("transmission").value;
  const seats = document.getElementById("seats").value;
  displayedCards = 0;
  document.querySelectorAll(".car-card").forEach(card => {
    /*const matchPrice = !price || card.dataset.price === price;*/
    const matchFuel = !fuel || card.dataset.fuel === fuel;
    const matchTrans = !transmission || card.dataset.transmission === transmission;
    const matchSeats = !seats || card.dataset.seats === seats;

    card.style.display = (/*matchPrice &&*/ matchFuel && matchTrans && matchSeats) ? displayedCarsIncrease() :"none";
  });
  const carList = document.getElementById("car-list");
  if(displayedCards === 0){
    carList.innerHTML += `
          <div class="no-content">
        <img src="https://i.postimg.cc/brZc8H2Q/not-result.png" alt="لا يوجد محتوى">
        <h2>لا توجد سيارات متاحة حاليًا</h2>
        <p>الرجاء المحاولة لاحقًا أو تعديل الفلاتر.</p>
      </div>
    </div>
    `
  }else{
    const noContent = document.querySelector(" .no-content");
    if(noContent){
      noContent.remove();
    }
  }
}
function displayedCarsIncrease(){
  displayedCards++;
  return "block";
}