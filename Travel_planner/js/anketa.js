
document.getElementById("anketa").addEventListener("submit", function(event) {

    event.preventDefault();

    let ime = document.getElementById("imeprez").value;
    let vozrast = document.getElementById("vozrast").value;
    let grad = document.getElementById("grad").value;

  
    if (ime === "" || vozrast === "" || grad === "") {
        document.getElementById("poraka").innerHTML =
            "Ве молиме пополнете ги задолжителните полиња!";
        return;
    }

    let patuvanje = document.querySelector('input[name="patuvanje"]:checked');
    let doznal = document.querySelector('input[name="doznal"]:checked');
    let informacii = document.querySelector('input[name="informacii"]:checked');
    let preporaka = document.querySelector('input[name="preporaka"]:checked');

    if (!patuvanje || !doznal || !informacii || !preporaka) {
        document.getElementById("poraka").innerHTML =
            "Ве молиме одговорете на сите прашања!";
        return;
    }

  
    let funkcionalnosti = [];

    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(el) {
        funkcionalnosti.push(el.nextElementSibling.textContent.trim());
    });

   
    let odgovori = {
        ime: ime,
        vozrast: vozrast,
        grad: grad,
        cestotaNaPatuvanje: patuvanje.value,
        kakoDoznal: doznal.value,
        ocena: document.getElementById("ocena").value,
        funkcionalnosti: funkcionalnosti,
        informacii: informacii.value,
        destinacija: document.getElementById("destinacija").value,
        mislenje: document.getElementById("mislenje").value,
        preporaka: preporaka.value,
        email: document.getElementById("email").value
    };
    window.alert("Ви благодариме! Вашата анкета е успешно испратена!");

    console.log(odgovori);

    
    
       window.alert("Ви благодариме! Вашата анкета е успешно испратена!");

   
    document.getElementById("anketa").reset();

});
