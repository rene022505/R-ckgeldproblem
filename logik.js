document.getElementById("button").onclick = function() {
    let cents = document.getElementById("cents").value;

    if (!isNaN(cents)) {
        cents = parseInt(cents);
        gibRückgeld(cents);
    } else {
        console.log(">:(");
    }
};

function gibRückgeld(cents) {
    let kombinationen = {};
    let münzen = [];

    // Nimm die Münzen welche ausgewählt wurden und schieb sie in
    for (box of document.getElementsByName("münzen")) {
        if (box.checked == true) {
            münzen.push(box.value);
            kombinationen[box.value] = 0;
        }
    }

    // Gibt  eine Ausgabe sollte der Wert kleiner 1 oder nichts sein
    if (cents < 1 || document.getElementById("cents").value === "") {
        return (document.getElementById("ausgabe").innerHTML = "Error!");
    }

    // Berechnet die Münzen
    for (let i = 0; i < münzen.length; i++) {
        let tempCents = cents;
        let anzahlMünzen = 0;

        // Erstelle alle kombinationen um die Ausgabe zu erfüllen
        for (let j = i; j < münzen.length; j++) {
            if (tempCents === 0) {
                break;
            }
            anzahlMünzen += Math.floor(tempCents / münzen[j]);
            tempCents -= Math.floor(tempCents / münzen[j]) * münzen[j];
        }
        if (tempCents === 0) {
            kombinationen[münzen[i]] = anzahlMünzen;
        } else {
            kombinationen[münzen[i]] = 0;
        }
    }

    // Wähle die KOmbination mit den wenigsten Münzen
    for (let i = 0; i < münzen.length; i++) {
        if (i === 0) {
            wenigsteMünzen = kombinationen[münzen[i]];
        }

        if (
            kombinationen[münzen[i]] < wenigsteMünzen &&
            kombinationen[münzen[i]] !== isNaN
        ) {
            wenigsteMünzen = kombinationen[münzen[i]];
        }
    }

    // Gib das Ergebnis aus
    return wenigsteMünzen === 0
        ? (document.getElementById("ausgabe").innerHTML = `Error!`)
        : (document.getElementById(
              "ausgabe"
          ).innerHTML = `${wenigsteMünzen} Münzen Ausgabe!`);
}
