
(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        module.exports = factory();
    } else {
        //(Przegladarka)
        global.WynikRzutu = factory();
    }
})(this, function () {
    
    class WynikRzutu {
    
    #wynikKosciAtrybutu;
    #wynikCałosciowyAtrybutu;
    #wynikKosciFigury;
    #wynikCałościowyFigury
    #modyfikator;
    #opis;
    #trudnoscRzutu;
    #czyJestFigura;


    constructor( wynikKosciAtrybutu, modyfikator, opis, wynikKosciFigury=0,trudnoscRzutu = 4) {
        if (!Array.isArray(wynikKosciFigury)) {
            throw new Error("Wynik musi być tablicą liczb.");
        }else{
            this.#wynikKosciFigury = wynikKosciFigury;
            this.#czyJestFigura = true;
            this.#wynikCałościowyFigury = this.#wynikKosciFigury
                .filter(wynik => {
                    if (typeof wynik !== 'number') {
                        this.#czyJestFigura = false;
                        return false;
                    }
                    return true;
                })
                .reduce((acc, val) => acc + val, 0);
        }
        if (!Array.isArray(wynikKosciAtrybutu)) {
            throw new Error("Wynik kości musi być tablicą liczb.");
        }else{
            this.#wynikKosciAtrybutu = wynikKosciAtrybutu;
            this.#wynikCałosciowyAtrybutu = this.#wynikKosciAtrybutu
                .filter(wynik => {
                    if (typeof wynik !== 'number') {
                        return false;
                    }
                    return true;
                })
                .reduce((acc, val) => acc + val, 0);
        }
        if (typeof modyfikator !== 'number') {
            throw new Error("Modyfikator musi byc liczba");
        }else{
            this.#modyfikator = modyfikator;
            this.#wynikCałosciowyAtrybutu += this.#modyfikator;
            this.#wynikCałościowyFigury += this.#modyfikator;
        }
        if (typeof opis !== 'string') {
            throw new Error("Opis musi byc stringiem");
        }
        if (typeof trudnoscRzutu !== 'number' || trudnoscRzutu <= 0) {
            throw new Error("Trudnosc rzutu musi byc liczba dodatnia");
        }


        this.#opis = opis;
        this.#trudnoscRzutu = trudnoscRzutu;
    }

    

    get modyfikator() {
        return this.#modyfikator;
    }

    get opis() {
        return this.#opis;
    }

    get wynikKosciAtrybutu() {
        return this.#wynikKosciAtrybutu;
    }

    get wynikCałosciowyAtrybutu() {
        return this.#wynikCałosciowyAtrybutu;
    }

    get wynikKosciFigury() {
        return this.#wynikKosciFigury;
    }

    get wynikCałościowyFigury() {
        if(this.#czyJestFigura){
            return this.#wynikCałościowyFigury;
        }
        return 0;
    }

    get trudnoscRzutu() {
        return this.#trudnoscRzutu;
    }

    get czyJestFigura() {
        return this.#czyJestFigura;
    }

    czyZdanę(){
        if(this.#wynikCałosciowyAtrybutu>this.#wynikCałościowyFigury){
            return this.#wynikCałosciowyAtrybutu>=this.#trudnoscRzutu;
        }else{
            return this.#wynikCałościowyFigury>=this.#trudnoscRzutu;
        }
      
    }

    iloscSukcesow(){
        if(this.#wynikCałosciowyAtrybutu>this.#wynikCałościowyFigury){
            if(this.#wynikCałosciowyAtrybutu < this.#trudnoscRzutu) return 0;
            let sukcesy = 0;
            for(let i = this.#trudnoscRzutu; i <= this.#wynikCałosciowyAtrybutu; i=i+4){
                sukcesy++;
            }
            return sukcesy;
        }else{
            if(this.#wynikCałościowyFigury < this.#trudnoscRzutu) return 0;
            let sukcesy = 0;
            for(let i = this.#trudnoscRzutu; i <= this.#wynikCałościowyFigury; i=i+4){
                sukcesy++;
            }
            return sukcesy;
        }
    }
    iloscPrzebic(){
        return this.iloscSukcesow()-1<0?0:this.iloscSukcesow()-1;
    }
    toString() {
        return `Wynik Rzutu:
        Wynik Kości Atrybutu: ${this.#wynikKosciAtrybutu}
        Wynik Całościowy Atrybutu: ${this.#wynikCałosciowyAtrybutu}
        Wynik Kości Figury: ${this.#wynikKosciFigury}
        Wynik Całościowy Figury: ${this.#wynikCałościowyFigury}
        Modyfikator: ${this.#modyfikator}
        Opis: ${this.#opis}
        Trudność Rzutu: ${this.#trudnoscRzutu}
        Czy Jest Figura: ${this.#czyJestFigura}
        Ilość Sukcesów: ${this.iloscSukcesow()}
        Ilość Przebić: ${this.iloscPrzebic()}`;
    }
}

return WynikRzutu;

});
