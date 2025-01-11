(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        // Node.js
        const { RzutKoscmi } = require('./Rzut');
        const Bron = require('./Weapon');
        const { Kostka } = require('./Kostka.js');
        module.exports = factory(RzutKoscmi, Bron, Kostka);
    } else {
        // Przeglądarka
        global.Attack = factory(global.RzutKoscmi, global.Bron, global.Kostka);
    }
})(this, function (RzutKoscmi, Bron, Kostka) {
    class Attack {
        constructor(nazwaAtaku, bron, tablicaKosci, czyFigura = false, modyfikator = 0, trudnosc = 4) {
            if (typeof nazwaAtaku !== 'string' || nazwaAtaku.trim() === '') {
                throw new Error("Nazwa ataku musi być niepustym stringiem.");
            }
            if (!bron || typeof bron !== 'object' || bron.itemType.toLowerCase() !== 'weapon') {
                throw new Error("Bron musi być obiektem typu 'weapon'.");
            }
            if (!Array.isArray(tablicaKosci) || tablicaKosci.length === 0) {
                throw new Error("Tablica kości musi być niepustą tablicą.");
            }

            this.nazwaAtaku = nazwaAtaku;
            this.bron = bron;
            this.modyfikator = modyfikator + bron.attackPower;
            this.rzutKoscmi = RzutKoscmi.stworzRzut(
                tablicaKosci,
                czyFigura,
                modyfikator + bron.attackPower,
                trudnosc,
                console.log(`Atak: ${nazwaAtaku} przy użyciu ${bron.itemName}`)
            );

            if (!this.rzutKoscmi) {
                throw new Error("Nie udało się stworzyć rzutu kośćmi dla ataku.");
            }
        }

        wykonajAtak() {
            const wynik = this.rzutKoscmi.rzut();
            console.log("\n" + wynik.toString());
            return wynik;
        }
    }

    return Attack;
});