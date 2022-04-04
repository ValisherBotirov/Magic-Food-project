const inputSearch = document.querySelector(".input");
const btnSearch = document.querySelector(".btn--search");
const renderHtml = document.querySelector("#appHtml");

const closesPopup = document.querySelector(".close--popup");
const popup = document.querySelector(".popup");

// foods = ["Corba", "Burek", "Kumpir", "Pancakes","Moussaka"];
const searchFood = function (food) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
      .then((responsive) => responsive.json())
      .then(function (res) {
        let data = res;
        resolve(data);
      });
  });
};

let setHtml = function (img, name, youtobeLink) {
  let html = ` <div class="boxApi--item">
  <img
    src="${img}"
    alt=""
    class="imgFood"
  />
  <div class="item--box">
    <p class="food--name">${name}</p>
    <button class="btnRetsep">Get Recipe</button>
  </div>
 </div>`;
  renderHtml.insertAdjacentHTML("beforeend", html);
  const btnRetsep = document.querySelector(".btnRetsep");
  btnRetsep.addEventListener("click", function (e) {
    e.preventDefault();

    let html2 = ` <div class="popup__box">
      <p class="close--popup">✖</p>
      <div class="container">
        <h3 class="popup--name">${name}</h3>
        <button class="btn--popup">Checkan</button>
        <p class="popup__text--retsep">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corrupti quasi eum veritatis totam, animi ut et dolor dolorum
          harum dicta ratione tempore perspiciatis? Consectetur
          praesentium, quam possimus ex nisi animi Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Corporis, laudantium illum
          beatae possimus doloribus, hic magni maiores quaerat sed velit,
          at aliquam ab eligendi voluptatum libero aspernatur molestias
          sapiente sunt.
        </p>
        <div class="popup__img"></div>
        <a href="${youtobeLink}" class="btn--youtobe">Watch video</a>
      </div>
     </div>`;
    popup.insertAdjacentHTML("afterbegin", html2);
  });
};

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();

  let data = "";
  searchFood(inputSearch.value).then((data) => {
    data = data;
    console.log(data);
    console.log(data.meals[0].strYoutube);
    setHtml(
      data.meals[0].strMealThumb,
      data.meals[0].strMeal,
      data.meals[0].strYoutube
    );
  });
});
