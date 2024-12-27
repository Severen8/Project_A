class WynikRzutu {
    #wynikCałosciowy;
    #wynikKosci;
    #modyfikator;
    #opis;
    #trudnoscRzutu;


    constructor(wynikCałosciowy, wynikKosci, modyfikator, opis, trudnoscRzutu = 4) {
        if (typeof wynikCałosciowy !== 'number') {
            throw new Error("Wynik calosciowy musi byc liczba");
        }
        if (!Array.isArray(wynikKosci)) {
            throw new Error("Wynik kości musi być tablicą liczb.");
        }
        if (typeof modyfikator !== 'number') {
            throw new Error("Modyfikator musi byc liczba");
        }
        if (typeof opis !== 'string') {
            throw new Error("Opis musi byc stringiem");
        }
        if (typeof trudnoscRzutu !== 'number' || trudnoscRzutu <= 0) {
            throw new Error("Trudnosc rzutu musi byc liczba dodatnia");
        }

        this.#wynikCałosciowy = wynikCałosciowy;
        this.#wynikKosci = wynikKosci;
        this.#modyfikator = modyfikator;
        this.#opis = opis;
        this.#trudnoscRzutu = trudnoscRzutu;
    }

    getWynikCałosciowy() {
        return this.#wynikCałosciowy;
    }

    getWynikKosci() {
        return this.#wynikKosci;
    }

    getModyfikator() {
        return this.#modyfikator;
    }

    getOpis() {
        return this.#opis;
    }
    getTrudnoscRzutu(){
        return this.#trudnoscRzutu;
    }
    czyZdanę(){
      return this.#wynikCałosciowy >= this.#trudnoscRzutu;
    }

    iloscSukcesow(){
        if(this.#wynikCałosciowy < this.#trudnoscRzutu) return 0;
        let sukcesy = 0;
        for(let i = this.#trudnoscRzutu; i <= this.#wynikCałosciowy; i=i+4){
            sukcesy++;
        }
        return sukcesy;
    }
    iloscPrzebic(){
        return this.iloscSukcesow()-1<0?0:this.iloscSukcesow()-1;
    }
    toString(){
        return `Wynik rzutu: ${this.#opis}, wynik: ${this.#wynikCałosciowy}, modyfikator: ${this.#modyfikator}, rzuty kości: ${this.#wynikKosci.join(', ')}, trudność rzutu: ${this.#trudnoscRzutu}`;
    }
}
