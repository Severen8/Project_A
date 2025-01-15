(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const WynikRzutu = require('./WynikRzut.js'); 
        const {isNumber, Kostka} = require('./Kostka.js'); // Adjust the path if necessary

        module.exports = factory(WynikRzutu,isNumber, Kostka);
    } else {
        //(Przegladarka)
        global.RzutKoscmi = factory(global.WynikRzutu, global.isNumber, global.Kostka);
    }
})(this, function (WynikRzutu, isNumber, Kostka) {

    class RzutKoscmi {
        #tablicaKości;
        #modyfikator;
        #opis;
        #czyFigura;
        #trudnosc;
        #kosciFigury = 6;
    
        constructor(tablicaKości, czyFigura = false, modyfikator = 0, trudnosc = 4, opis = "Rzut kośćmi") {
            this.#tablicaKości = this.#validateArray(tablicaKości, "Tablica kości");
            this.#modyfikator = this.#validateNumber(modyfikator, "Modyfikator");
            this.#opis = this.#validateString(opis, "Opis");
            this.#czyFigura = this.#validateBoolean(czyFigura, "Czy figura");
            this.#trudnosc = this.#validateTrudnosc(trudnosc, "Trudnosc");
    
    
        }
    
        #validateString(value, name) {
            if (typeof value !== 'string') {
                throw new Error(`${name} musi byc stringiem`);
            }
            return value;
        }
    
        #validateNumber(value, name) {
            if (typeof value !== 'number') {
                throw new Error(`${name} musi byc liczba`);
            }
            return value;
        }
    
        #validateBoolean(value, name) {
            if (typeof value !== 'boolean') {
                 throw new Error(`${name} musi być typu boolean`);
            }
            return value;
        }
        #validateArray(value, name) {
            if (!Array.isArray(value) || value.length === 0) {
                 throw new Error(`${name} musi być niepustą tablicą.`);
            }
            return value;
        }
      
      

        #validateTrudnosc(value, name) {
              if(typeof value !== 'number' || value <= 0){
                 throw new Error(`${name} rzutu musi być liczbą dodatnią`);
            }
            return value;
        }
      
      
        rzut() {
          const wynikiRzutow = this.#tablicaKości.map(kostka => {
              if (typeof kostka.IloscScian !== 'number' || kostka.IloscScian <= 0) {
                  throw new Error("Tablica kości zawiera niepoprawne dane");
                }
                return this.#losujWynikZKosci(kostka.IloscScian);
            });
            let opis = "ATR: ";
            let wynikiRzutowZBonusami = [...wynikiRzutow];
    
            let j = 0;
            for (let i = 0; j < this.#tablicaKości.length; i++) {
              opis += `(d${this.#tablicaKości[j].IloscScian}):${wynikiRzutowZBonusami[i]}`;
            
                while (wynikiRzutowZBonusami[i] === this.#tablicaKości[j].IloscScian) {
                  i++;
                const bonusRoll = this.#losujWynikZKosci(this.#tablicaKości[j].IloscScian);
                wynikiRzutowZBonusami.splice(i, 0, bonusRoll);
                   opis += `+AS(d${this.#tablicaKości[j].IloscScian}):${bonusRoll}`;
                }
                if (j !== this.#tablicaKości.length - 1)
                   opis += "+";
                j++;
            }
              opis += "=" + wynikiRzutowZBonusami.reduce((a, b) => a + b, 0);
              opis += "\r\n";
              opis += "Figura: ";
               let wynikFigury;
    
            if (this.#czyFigura) {
                    wynikFigury = [this.#losujWynikZKosci(this.#kosciFigury)];
                     opis+= `(d${this.#kosciFigury}):${wynikFigury[0]}`;
                    let i = 0;
                    while(wynikFigury[i] == this.#kosciFigury){
                        i++;
                         const bonusRoll = this.#losujWynikZKosci(this.#kosciFigury);
                        wynikFigury.splice(i,0,bonusRoll);
                        opis+=`+AS(d${this.#kosciFigury}):${bonusRoll}`;
                    }
                opis += "=" + wynikFigury.reduce((a, b) => a + b, 0);
                console.log(opis)
                 return new WynikRzutu(wynikiRzutowZBonusami, this.#modyfikator, this.#opis, wynikFigury,this.#trudnosc);
    
             }
            console.log(opis)
              return new WynikRzutu(wynikiRzutowZBonusami, this.#modyfikator, this.#opis, [0], this.#trudnosc);
    
    
        }
    
         #losujWynikZKosci(sides) {
            return Math.floor(Math.random() * sides) + 1;
        }
    
        static stworzRzut(tablicaKości, czyFigura = false, modyfikator = 0, trudnosc = 4, opis = "Rzut kośćmi") {
             try {
                    return new RzutKoscmi(tablicaKości, czyFigura, modyfikator, trudnosc, opis);
                }
             catch (e) {
                return null;
            }
        }
    }

return RzutKoscmi;

});