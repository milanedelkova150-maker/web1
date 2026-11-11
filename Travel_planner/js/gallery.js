
const galerija = [
  { grad: "Амстердам", sliki: ["images/amsterdam1.jpg", "images/amsterdam2.jpg", "images/amsterdam3.jpg"] },
  { grad: "Санторини", sliki: ["images/santorini1.jpg", "images/santorini2.jpg", "images/santorini3.jpg"] },
  { grad: "Прага", sliki: ["images/praga1.jpg", "images/praga2.jpg", "images/praga3.jpg"] },
  { grad: "Дубровник", sliki: ["images/dubrovnik1.jpg", "images/dubrovnik2.jpg", "images/dubrovnik3.jpg"] },
  { grad: "Токио", sliki: ["images/tokio1.jpg", "images/tokio2.jpg", "images/tokio3.jpg"] },
  { grad: "Швајцарски Алпи", sliki: ["images/alpi1.jpg", "images/alpi2.jpg", "images/alpi3.jpg"] },
  { grad: "Истанбул", sliki: ["images/istanbul1.jpg", "images/istanbul2.jpg", "images/istanbul3.jpg"] },
  { grad: "Барселона", sliki: ["images/barcelona1.jpg", "images/barcelona2.jpg", "images/barcelona3.jpg"] }
];

let glasovi = JSON.parse(localStorage.getItem("glasovi")) || {};
let komentari = JSON.parse(localStorage.getItem("komentari")) || {};

function prikaziKopcinja(aktiven) {
  const kontejner = document.getElementById("kopcinja");
  kontejner.innerHTML = "";

  galerija.forEach(function (g, index) {
    let klasa = "nav-link";
    if (index === aktiven) {
      klasa = "nav-link active";
    }

    kontejner.innerHTML += `
      <li class="nav-item">
        <a class="${klasa}" href="#" onclick="otvoriGrad(${index}); return false;">${g.grad}</a>
      </li>
    `;
  });
}


function otvoriGrad(index) {
  prikaziKopcinja(index);
  const g = galerija[index];

  let html = `<h3 class="mb-3">${g.grad}</h3><div class="row">`;

  g.sliki.forEach(function (slika, i) {
    const broj = glasovi[slika] || { like: 0, dislike: 0 };
    const lista = komentari[slika] || [];

    let komentariHtml = "";
    lista.forEach(function (k) {
      komentariHtml += `<li class="list-group-item small">${k}</li>`;
    });

    html += `
      <div class="col-md-4 mb-4">
        <img src="${slika}" class="img-fluid slika-galerija">

        <div class="mt-2 text-center">
          <button class="btn btn-sm btn-outline-success" onclick="glasaj('${slika}', 'like', ${index})">👍 ${broj.like}</button>
          <button class="btn btn-sm btn-outline-danger" onclick="glasaj('${slika}', 'dislike', ${index})">👎 ${broj.dislike}</button>
        </div>

        <div class="input-group input-group-sm mt-2">
          <input type="text" id="komentar-${i}" class="form-control" placeholder="Напиши коментар...">
          <div class="input-group-append">
            <button class="btn btn-primary" onclick="dodajKomentar('${slika}', ${i}, ${index})">Испрати</button>
          </div>
        </div>

        <ul class="list-group mt-2">${komentariHtml}</ul>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("galerija").innerHTML = html;
}

// 4. LIKE / DISLIKE
function glasaj(slika, tip, gradIndex) {
  if (!glasovi[slika]) {
    glasovi[slika] = { like: 0, dislike: 0 };
  }

  glasovi[slika][tip]++;

  localStorage.setItem("glasovi", JSON.stringify(glasovi));
  otvoriGrad(gradIndex);
}


function dodajKomentar(slika, i, gradIndex) {
  const tekst = document.getElementById("komentar-" + i).value;

  if (tekst === "") {
    alert("Напиши коментар!");
    return;
  }

  if (!komentari[slika]) {
    komentari[slika] = [];
  }

  komentari[slika].push(tekst);

  localStorage.setItem("komentari", JSON.stringify(komentari));
  otvoriGrad(gradIndex);
}


prikaziKopcinja();


const parametri = new URLSearchParams(window.location.search);
const izbranGrad = parametri.get("grad");

if (izbranGrad) {
  const index = galerija.findIndex(function (g) {
    return g.grad === izbranGrad;
  });

  if (index !== -1) {
    otvoriGrad(index);
  }
}