
const pocetniGradovi = [
  { ime: "Амстердам", drzava: "Холандија", slika: "images/amsterdam.jpg", opis: "Канали, велосипеди и музеи.", budzet: 900, kategorija: "култура" },
  { ime: "Санторини", drzava: "Грција", slika: "images/santorini.jpg", opis: "Бели куќи и најубавите зајдисонца.", budzet: 1100, kategorija: "плажа" },
  { ime: "Прага", drzava: "Чешка", slika: "images/praga.jpg", opis: "Бајковит стар град и мостови.", budzet: 600, kategorija: "култура" },
  { ime: "Дубровник", drzava: "Хрватска", slika: "images/dubrovnik.jpg", opis: "Ѕидини над Јадранското Море.", budzet: 750, kategorija: "плажа" },
  { ime: "Токио", drzava: "Јапонија", slika: "images/tokio.jpg", opis: "Спој на традиција и иднина.", budzet: 2000, kategorija: "авантура" },
  { ime: "Швајцарски Алпи", drzava: "Швајцарија", slika: "images/alpi.jpg", opis: "Планини, езера и скијање.", budzet: 1500, kategorija: "природа" },
  { ime: "Истанбул", drzava: "Турција", slika: "images/istanbul1.jpg", opis: "Град на два континента.", budzet: 500, kategorija: "култура" },
  { ime: "Барселона", drzava: "Шпанија", slika: "images/barcelona.jpg", opis: "Спој на културата и забавата.", budzet: 1000, kategorija: "култура" }
];

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email == "admin@gmail.com" && password == "12345") {
        document.getElementById("login").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    }
    else {
        alert("Погрешна е-пошта или лозинка!");
    }
}

function logout() {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("login").style.display = "block";
}


let gradovi = JSON.parse(localStorage.getItem("gradovi")) || pocetniGradovi;


function zacuvaj() {
  localStorage.setItem("gradovi", JSON.stringify(gradovi));
}


function prikaziGradovi(lista) {
  const kontejner = document.getElementById("gradovi");
  if (!kontejner) return;

  if (!lista) {
    lista = gradovi;
  }

  kontejner.innerHTML = "";

  if (lista.length === 0) {
    kontejner.innerHTML = `<p class="text-muted ml-3">Нема дестинации што одговараат на филтерот.</p>`;
    return;
  }

  lista.forEach(function (grad) {
    const index = gradovi.indexOf(grad);

    kontejner.innerHTML += `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card h-100 karticka-grad">
          <img src="${grad.slika}" class="card-img-top" alt="${grad.ime}">
          <div class="card-body">
            <h5 class="card-title">${grad.ime}</h5>
            <p class="text-muted small">${grad.drzava}</p>
            <p class="card-text">${grad.opis}</p>
            <a href="gallery.html?grad=${grad.ime}" class="btn btn-sm btn-outline-primary">Види повеќе</a>
            <button class="btn btn-sm btn-outline-danger" onclick="izbrisiGrad(${index})">Избриши</button>
          </div>
          <div class="card-footer bg-white d-flex justify-content-between">
            <span class="badge badge-pill badge-info">${grad.kategorija}</span>
            <strong>${grad.budzet} €</strong>
          </div>
        </div>
      </div>
    `;
  });
}


function dodajGrad() {
  const ime = document.getElementById("ime").value;
  const drzava = document.getElementById("drzava").value;
  const budzet = Number(document.getElementById("budzet").value);
  const kategorija = document.getElementById("kategorija").value;
  const slika = document.getElementById("slika").value;
  const opis = document.getElementById("opis").value;

  if (ime === "" || drzava === "") {
    alert("Внеси име на град и држава!");
    return;
  }

  gradovi.push({
    ime: ime,
    drzava: drzava,
    slika: "images/" + slika,
    opis: opis,
    budzet: budzet,
    kategorija: kategorija
  });

  zacuvaj();
  prikaziGradovi();
  popolniListaGradovi();
  document.getElementById("forma").reset();
}


function izbrisiGrad(index) {
  if (confirm("Дали сигурно сакаш да ја избришеш оваа дестинација?")) {
    gradovi.splice(index, 1);
    zacuvaj();
    prikaziGradovi();
    popolniListaGradovi();
  }
}


function filtriraj() {
  const kat = document.getElementById("filterKategorija").value;
  const maxBudzet = Number(document.getElementById("filterBudzet").value);

  const rezultat = gradovi.filter(function (grad) {
    let odgovara = true;

    if (kat !== "сите" && grad.kategorija !== kat) {
      odgovara = false;
    }

    if (maxBudzet > 0 && grad.budzet > maxBudzet) {
      odgovara = false;
    }

    return odgovara;
  });

  prikaziGradovi(rezultat);
}

function resetirajFilter() {
  document.getElementById("filterKategorija").value = "сите";
  document.getElementById("filterBudzet").value = "";
  prikaziGradovi();
}


function popolniListaGradovi() {
  const lista = document.getElementById("trosokGrad");
  if (!lista) return;

  lista.innerHTML = "";
  gradovi.forEach(function (grad) {
    lista.innerHTML += `<option>${grad.ime}</option>`;
  });
}

function presmetaj() {
  const grad = document.getElementById("trosokGrad").value;
  const prevoz = Number(document.getElementById("prevoz").value);
  const nokji = Number(document.getElementById("nokji").value);
  const smestuvanje = Number(document.getElementById("smestuvanje").value);
  const hrana = Number(document.getElementById("hrana").value);
  const lugje = Number(document.getElementById("lugje").value);

  if (nokji <= 0 || lugje <= 0) {
    alert("Внеси број на ноќи и број на луѓе!");
    return;
  }

  const poOsoba = prevoz + nokji * smestuvanje + nokji * hrana;
  const vkupno = poOsoba * lugje;

  document.getElementById("rezultat").innerHTML = `
    <div class="alert alert-success">
      Патување во <strong>${grad}</strong> за ${nokji} ноќи:<br>
      По човек: <strong>${poOsoba} €</strong><br>
      Вкупно за ${lugje} луѓе: <strong>${vkupno} €</strong>
    </div>
  `;
}


prikaziGradovi();
popolniListaGradovi();
