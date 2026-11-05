function Vozac(ime,tim, brzina, vestina, gumi, vreme, status){
    this.ime=ime;
    this.tim=tim;
    this.brzina=brzina;
    this.vestina=vestina;
    this.gumi=gumi;
    this.vreme=vreme;
    this.status=status;
    this.pitStop = false;
    this.brojPitStop = 0;
    this.spun=false;
    this.pitLap = Math.floor(Math.random() * 5) + 3;
    this.spunThisLap = false;
    this.pocetniGumi = gumi;
}
let vozaci = [
    new Vozac("Max Verstappen", "Red Bull", 96, 95, "Soft", 0, "Active"),
    new Vozac("Lewis Hamilton", "Ferrari", 93, 97, "Hard", 0, "Active"),
    new Vozac("Charles Leclerc", "Ferrari", 95, 94, "Soft", 0, "Active"),
    new Vozac("Lando Norris", "McLaren", 94, 93, "Hard", 0, "Active"),
    new Vozac("Oscar Piastri", "McLaren", 92, 91, "Soft", 0, "Active"),
    new Vozac("George Russell", "Mercedes", 93, 92, "Hard", 0, "Active"),
    new Vozac("Fernando Alonso", "Aston Martin", 90, 96, "Soft", 0, "Active"),
    new Vozac("Carlos Sainz", "Williams", 91, 93, "Hard", 0, "Active"),
    new Vozac("Pierre Gasly", "Alpine", 89, 88, "Soft", 0, "Active"),
    new Vozac("Yuki Tsunoda", "Racing Bulls", 88, 87, "Hard", 0, "Active")
];
let vozaciPoRedosled = [...vozaci];


function prikaziTabela(){
let tabela = document.getElementById("raceTable");
tabela.innerHTML = `
        <tr>
            <th>Возач</th>
            <th>Тим</th>
            <th>Брзина</th>
            <th>Вештина</th>
            <th>Гуми</th>
            <th>Време</th>
            <th>Статус</th>
        </tr>
    `;
for (let i = 0; i < vozaci.length; i++) {

   tabela.innerHTML += `
            <tr>
                <td>${vozaci[i].ime}</td>
                <td>${vozaci[i].tim}</td>
                <td>${vozaci[i].brzina}</td>
                <td>${vozaci[i].vestina}</td>
                <td>${vozaci[i].gumi}</td>
                <td>${vozaci[i].vreme.toFixed(2)}</td>
                <td>${vozaci[i].status}</td>
            </tr>
        `;
}
}
let krug = 0;
let safetyCar = false;
let safetyCarKrugovi = 0;
function odigrajKrug() {
    if (krug >= 10) {
    return;
}
  
    if (safetyCar === false && Math.random() < 0.05) {
    safetyCar = true;
    safetyCarKrugovi = 2;
    }
    
    for (let i = 0; i < vozaci.length; i++) {
        let vremeKrug=100+(100- vozaci[i].brzina)*0.2+(100-vozaci[i].vestina)*0.1
        vozaci[i].spunThisLap = false;
        vozaci[i].vreme+=vremeKrug;
        if (safetyCar) {
        vozaci[i].vreme += 10;
        }
        let vlezBoks=false;
         if (krug + 1 === vozaci[i].pitLap && vozaci[i].pitStop === false) {

        vozaci[i].vreme += 20;

        if (vozaci[i].gumi === "Soft") {
            vozaci[i].gumi = "Hard";
        } else {
            vozaci[i].gumi = "Soft";
        }

        vozaci[i].pitStop = true;
        vozaci[i].brojPitStop++;
         vlezBoks = true;
   
    }
    if(Math.random()<0.05 && vozaci[i].spun === false)
    {
        vozaci[i].spun=true;
        vozaci[i].vreme+=30;
        vozaci[i].spunThisLap = true;
    }
    if (vlezBoks) {
        vozaci[i].status = "Pit Stop";
    } 
    else if (vozaci[i].spunThisLap) {
        vozaci[i].status = "Spun";
    } 
    else if (safetyCar) {
    vozaci[i].status = "Safety Car";
    }
    else {
        vozaci[i].status = "Active";
    }

    }
    for (let i = 0; i < vozaci.length - 1; i++) {
     for (let j = 0; j< vozaci.length-1-i; j++) {
        if (vozaci[j].vreme > vozaci[j + 1].vreme) {
            let temp=vozaci[j];
            vozaci[j]=vozaci[j+1];
            vozaci[j+1]=temp;
            }
        }
   
    }
prikaziTabela();
prikaziStatus();
if (krug === 9) {
    prikaziPobednik();
    document.getElementById("nextLap").disabled = true;
}
if (safetyCar) {
    safetyCarKrugovi--;

    if (safetyCarKrugovi === 0) {
        safetyCar = false;
    }
}
krug++;
console.log("Моментален круг: " + krug)
}
function prikaziStatus() {
    let tabela = document.getElementById("statusTable");

    tabela.innerHTML = `
        <tr>
            <th>Возач</th>
            <th>Статус</th>
        </tr>
    `;

    for (let i = 0; i < vozaciPoRedosled.length; i++) {
        tabela.innerHTML += `
            <tr>
                <td>${vozaciPoRedosled[i].ime}</td>
                <td>${vozaciPoRedosled[i].status}</td>
            </tr>
        `;
    }
}
function prikaziPobednik() {
    let pobednik = vozaci[0];

   
    setTimeout(function () {
        alert(
            "🏆 ШАМПИОН!!! 🏆\n\n" +
            "Возач: " + pobednik.ime + "\n" +
            "Тим: " + pobednik.tim + "\n" +
            "Вкупно време: " + pobednik.vreme.toFixed(2) + " секунди\n\n" +
            "🏁 ЧЕСТИТКИ! 🏁"
        );
    }, 200);
}

function zapocniTrka() {
   
    krug = 0;
    safetyCar = false;
    safetyCarKrugovi = 0;

   
    for (let i = 0; i < vozaciPoRedosled.length; i++) {
        vozaciPoRedosled[i].vreme = 0;
        vozaciPoRedosled[i].status = "Active";
        vozaciPoRedosled[i].gumi = vozaciPoRedosled[i].pocetniGumi;
        vozaciPoRedosled[i].pitStop = false;
        vozaciPoRedosled[i].brojPitStop = 0;
        vozaciPoRedosled[i].spun = false;
        vozaciPoRedosled[i].spunThisLap = false;
        vozaciPoRedosled[i].pitLap = Math.floor(Math.random() * 5) + 3;
    }

    
    vozaci = [...vozaciPoRedosled];

    document.getElementById("nextLap").disabled = false;

    prikaziTabela();
    prikaziStatus();
    console.log("Трката е рестартирана!");
}

document.getElementById("startRace").addEventListener("click", zapocniTrka);
document.getElementById("nextLap").addEventListener("click",odigrajKrug);
 prikaziTabela();
 prikaziStatus();