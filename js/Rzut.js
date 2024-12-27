
const {isNumber, Kostka, stworzKostke} = require('./Kostka.js'); // Adjust the path if necessary

class RzutKoscmi {
    #tablicaKości;
    #modyfikator;
    #opis;
    #czyFigura;
    #trudnosc;
    #kosciFigury=6;
    constructor(tablicaKości, czyFigura, modyfikator = 0, trudnosc = 4, opis = "Rzut kośćmi") {
        if (!Array.isArray(tablicaKości) || tablicaKości.length === 0) {
            throw new Error("Tablica kości musi być niepustą tablicą.");
        }
        if (typeof modyfikator !== 'number') {
            throw new Error("Modyfikator musi byc liczba");
        }
        if (typeof opis !== 'string') {
            throw new Error("Opis musi byc stringiem");
        }
        if(typeof czyFigura !== 'boolean'){
            throw new Error("Czy figura musi być typu boolean");
        }
        if(typeof trudnosc !== 'number' || trudnosc <= 0){
            throw new Error("Trudnosc rzutu musi być liczbą dodatnią");
        }
        this.#tablicaKości = tablicaKości;
        this.#modyfikator = modyfikator;
        this.#opis = opis;
        this.#czyFigura = czyFigura;
        this.#trudnosc = trudnosc;
    }

    rzut() {
        var wynikiRzutow = this.#tablicaKości.map(kostka => {
            if (typeof kostka.getIloscScian() !== 'number' || kostka.getIloscScian() <= 0 ) throw new Error("Tablica kości zawiera niepoprawne dane")
                
                return Math.floor(Math.random() * kostka) + 1;
        });
            var j=0;
            var opis ="ATR: ";
        for(let i=0;j<this.#tablicaKości.length;i++){
            opis+="(d"+this.#tablicaKości[j].getIloscScian()+"):"+wynikiRzutow[i];
            while(wynikiRzutow[i]==this.#tablicaKości[j].getIloscScian()){
                i++;
                wynikiRzutow.splice(i,0,Math.floor(Math.random() * this.#tablicaKości[j].getIloscScian()) + 1);
                opis+="+AS(d"+this.#tablicaKości[j].getIloscScian()+"):"+wynikiRzutow[i];
                
            }
            if(j!=this.#tablicaKości.length-1)
            opis+="+";
            j++;
        }
        opis+="="+wynikiRzutow.reduce((a,b)=>a+b,0);
        opis+="\r\n";
        opis+="Figura: ";
        if(this.#czyFigura){
            
            var wynikFigury = [Math.floor(Math.random() * this.#kosciFigury) + 1];
            opis+="(d"+this.#kosciFigury+"):"+wynikFigury[0];
            var i=0;
            while(wynikFigury[i]==this.#kosciFigury){
                i++;
                wynikFigury.splice(i,0,Math.floor(Math.random() * this.#kosciFigury) + 1);
                opis+="+AS(d"+this.#kosciFigury+"):"+wynikFigury[i];
            }
            opis+="="+wynikFigury.reduce((a,b)=>a+b,0);
            return new WynikRzutu( wynikiRzutow, this.#modyfikator, this.#opis, wynikFigury,this.#trudnosc);
        }
         return new WynikRzutu( wynikiRzutow, this.#modyfikator, this.#opis, 0,this.#trudnosc);
    }
}

function stworzRzut(tablicaKości, czyFigura=false, modyfikator=0, trudnosc=4, opis="Rzut kośćmi") {
    if (!Array.isArray(tablicaKości) || tablicaKości.length === 0) {
        return null;
    }
    if (typeof modyfikator !== 'number') {
        return null;
    }
    if (typeof opis !== 'string') {
        return null;
    }
    if(typeof czyFigura !== 'boolean'){
        return null;
    }
    if(typeof trudnosc !== 'number' || trudnosc <= 0){
        return null;
    }
    return new RzutKoscmi(tablicaKości, czyFigura, modyfikator, trudnosc, opis);
}

module.exports = {RzutKoscmi, stworzRzut}; 