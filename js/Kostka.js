class Kostka {
    constructor(iloscScian, modyfikator=0) {
        if (typeof iloscScian !== 'number' || iloscScian <= 0) {
            throw new Error("Liczba ścian musi być liczbą dodatnią.");
        }
        this.iloscScian = iloscScian;
        this.modyfikator = modyfikator === undefined ? 0 : modyfikator;
    }


    toString() {
      return `Kostka d${this.iloscScian}${this.modyfikator > 0 ? '+' + this.modyfikator : this.modyfikator < 0 ? this.modyfikator : ''}`;
    }
}

function stworzKostke(iloscScian, modyfikator) {

    return new Kostka(iloscScian, modyfikator);
  }


module.exports = stworzKostke;