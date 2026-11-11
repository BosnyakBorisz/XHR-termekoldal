function termekJSONMeghivas() {
    const http = new XMLHttpRequest();
    http.onload = function () {
        if (http.status !== 200) {
            hibaMegjelenitese("Betöltése nem sikerült.");
            return;
        }
        try {
            const termek = JSON.parse(http.responseText);
            termekMegjelenitese(termek);
        } catch (err) {
            hibaMegjelenitese(`Hiba: ${err}`);
        }
    };
    http.open("GET", "termek.json");
    http.send();
}

function termekMegjelenitese(termek) {
    document.getElementById("termek-neve").innerHTML = termek.name;
    document.getElementById("termek-leirasa").innerHTML = termek.description;
    document.getElementById("termek-ara").innerHTML = `${termek.price} ${termek.currency}`;
    document.getElementById("ertekeles").innerHTML =  `${termek.rating} (${termek.reviews.length} értékelés)`;
    document.getElementById("keszlet-szoveg").innerHTML = `Raktáron (${termek.stock} db)`;
    document.getElementById("gyarto").innerHTML = termek.manufacturer.name
    document.getElementById("orszag").innerHTML = termek.manufacturer.country
    document.getElementById("termek-kepe").src = termek.image;

    const indexkepek = document.getElementById("indexkepek");
    for (let index = 0; index < 4; index++) {
        const indexkep = document.createElement("img");
        indexkep.className = "indexkep";
        indexkep.src = termek.image;
        indexkep.alt = "";
        indexkepek.appendChild(indexkep);
    }

    const tulajdonsagLista = document.getElementById("tulajdonsag-lista");
    termek.features.forEach(function (tulajdonsag) {
        const elem = document.createElement("li");
        elem.innerHTML = tulajdonsag;
        elem.className = "list-group-item"
        tulajdonsagLista.appendChild(elem);
    });

    const velemenyLista = document.getElementById("velemeny-lista");
    termek.reviews.forEach(function (velemeny) {
        const elem = document.createElement("li");
        const jel = document.createElement("span");
        const tartalom = document.createElement("div");
        const nev = document.createElement("strong");
        const szoveg = document.createElement("p");
        elem.className = "velemeny-elem list-unstyled";
        jel.className = "velemeny-jel";
        jel.innerHTML = velemeny.user.charAt(0);
        nev.className = "velemeny-nev";
        nev.innerHTML = velemeny.user;
        szoveg.className = "velemeny-szoveg";
        szoveg.innerHTML = velemeny.comment;
        tartalom.appendChild(nev);
        tartalom.appendChild(szoveg);
        elem.appendChild(jel);
        elem.appendChild(tartalom);
        velemenyLista.appendChild(elem);
    });
}

function hibaMegjelenitese(uzenet) {
    document.getElementById("betoltesi-hiba").innerHTML = uzenet;
    document.getElementById("betoltesi-hiba").hidden = false;
}

document.addEventListener("DOMContentLoaded", termekJSONMeghivas);
