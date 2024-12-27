function isNumber(liczba){
     if (typeof liczba!== 'number'|| isNaN(liczba)) return false;
     return true;
}



class Kostka {
    #iloscScian;
    #modyfikator;
    constructor(iloscScian, modyfikator=0) {
        if (!isNumber(iloscScian) || iloscScian <= 0) {
            throw new Error("Liczba ścian musi być liczbą dodatnią.");
        }
        this.#iloscScian = iloscScian;
        if(isNumber(modyfikator)) this.#modyfikator = modyfikator;
        else this.#modyfikator = 0;
    }

    get IloscScian(){
        return this.#iloscScian;
    }

    get Modyfikator(){
        return this.#modyfikator;
    }

    toString() {
      return `Kostka d${this.#iloscScian}${this.#modyfikator > 0 ? '+' + this.#modyfikator : this.#modyfikator < 0 ? this.#modyfikator : ''}`;
    }
}

function stworzKostke(iloscScian, modyfikator) {
    if (!isNumber(iloscScian) || iloscScian <= 0) {
        return null;
    }
    if(!isNumber(modyfikator))  modyfikator=0;
        return new Kostka(iloscScian, modyfikator);
}

module.exports ={isNumber, Kostka,stworzKostke}
