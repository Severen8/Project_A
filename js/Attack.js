const { RzutKoscmi } = require('./Rzut');
const Bron = require('./Weapon');
const {isNumber, Kostka} = require('./Kostka.js');
const WynikRzutu = require('./WynikRzut');


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
        this.rzutKoscmi = RzutKoscmi.stworzRzut(
            tablicaKosci,
            czyFigura,
            modyfikator + bron.attackPower,
            trudnosc,
            `\nAtak: ${nazwaAtaku} przy użyciu ${bron.itemName}`
        );

        if (!this.rzutKoscmi) {
            throw new Error("Nie udało się stworzyć rzutu kośćmi dla ataku.");
        }
    }

    wykonajAtak() {
        const wynik = this.rzutKoscmi.rzut();
        console.log(`Atak: ${this.nazwaAtaku} przy użyciu ${this.bron.itemName}`);
        console.log(wynik.toString());
        return wynik;
    }
}

module.exports = Attack;


// Tworzenie broni
const topor = Bron.create({
    itemID: 1,
    itemName: "Topór",
    itemType: "weapon",
    itemAttributes: [
        { attr: "str", value: 3 },
        { attr: "vit", value: 2 }
    ],
    itemDesc: "Topór ma zardzewiały metalowy obuch, z tego względu nie jest pierwszorzędną bronią.",
    attackPower: 3
});

// Tworzenie ataku
const atak = new Attack("Cios Toporem", topor, [new Kostka(6), new Kostka(8)], true, 2, 3);

// Wykonanie ataku
atak.wykonajAtak();