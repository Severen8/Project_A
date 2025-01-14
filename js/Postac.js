
(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Przedmiot = require('./Item.js');
const Cecha= require('./Trait.js');
const RzutKoscmi = require('./Rzut.js'); // Adjust the path if necessary
const WynikRzutu = require('./WynikRzut.js');
const {isNumber, Kostka} = require('./Kostka.js'); // Adjust the path if necessary


        module.exports = factory( Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi);
    } else {
        //(Przegladarka)
        global.Postac = factory( global.Przedmiot, global.Cecha, global.Kostka, global.WynikRzutu, global.RzutKoscmi);
    }
})(this, function ( Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi) {

    class Postac {
        #imie;
        #opis;
        #atrybuty;
        #umiejetnosci;
        #eq;
        #figura;
        #cechy;
        #exp;
        #dostepnyExp;
        #fuksyMax = 3;
        #fuksyAktualne;
        #rany;
        #charyzma;
        #szybkosc;
        #zloto;
        #szok;
    
        constructor(imie, opis, atrybuty, umiejetnosci, eq = [], figura = true, cechy = [], exp = 0, dostepnyExp = 0, zloto = 0, szybkosc = Kostka.stworzKostke(6)) {
            this.#imie = this.#validateString(imie, "Imię");
            this.#opis = this.#validateString(opis, "Opis");
            this.#atrybuty = this.#validateMap(atrybuty, "Atrybuty");
            this.#umiejetnosci = this.#validateMap(umiejetnosci, "Umiejętności");
            this.#eq = this.#validateArray(eq, "EQ");
            this.#figura = this.#validateBoolean(figura, "Figura");
            this.#cechy = this.#validateArray(cechy, "Cechy");
            this.#exp = this.#validateNumber(exp, "EXP");
            this.#zloto = this.#validateNumber(zloto, "Złoto");
            this.#szybkosc = this.#validateKostka(szybkosc, "Szybkość");
            this.#dostepnyExp = this.#validateNumber(dostepnyExp, "Dostępny EXP");
    
            this.#fuksyAktualne = this.#fuksyMax;
            this.#rany = 0;
            this.#szok = false;
    
            this.#charyzma = this.#calculateCharyzma();
        }
    
         // Metody walidacyjne - DRY (Don't Repeat Yourself)
        #validateString(value, name) {
            if (typeof value !== 'string') {
                throw new Error(`${name} musi być typu string`);
            }
            return value;
        }
    
        #validateNumber(value, name) {
            if (typeof value !== 'number') {
                throw new Error(`${name} musi być liczbą`);
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
            if (!Array.isArray(value)) {
                throw new Error(`${name} musi być tablicą`);
            }
            return value;
        }
    
        #validateMap(value, name) {
            if (!(value instanceof Map)) {
                throw new Error(`${name} musi być typu Map`);
            }
            return value;
        }
         #validateKostka(value,name){
             if (!(value instanceof Kostka)) {
                throw new Error(`${name} musi być typu Kostka`);
            }
            return value;
        }
    
        // Gettery (bez settera dla pól, które nie powinny być zmieniane z zewnątrz bezpośrednio)
        get imie() { return this.#imie; }
        get opis() { return this.#opis; }
        get fuksy() { return this.#fuksyAktualne; }
        get szybkosc() { return this.#szybkosc; }
        get charyzma() { return this.#charyzma; }
        get exp() { return this.#exp; }
        get dostepnyExp() { return this.#dostepnyExp; }
        get zloto() { return this.#zloto; }
        get figura() { return this.#figura; }
        get eq() { return this.#eq; }
        get cechy() { return this.#cechy; }
        get rany() { return this.#rany; }
        get szok() { return this.#szok; }
    
        set fuksy(value) {
            this.#fuksyAktualne = this.#validateNumber(value, "Fuksy");
        }
    
        set zloto(value) {
            this.#zloto = this.#validateNumber(value, "Złoto");
        }
    
        // Obliczanie charyzmy - wyciągnięte do osobnej metody
        #calculateCharyzma() {
            return this.#cechy
                .filter(cecha => cecha.traitEffects?.charyzma !== undefined)
                .map(cecha => cecha.traitEffects.charyzma)
                .reduce((acc, val) => acc + val, 0);
        }
    
        uzyjFuksa() {
            if (this.#fuksyAktualne > 0) {
                this.#fuksyAktualne--;
                return true;
            }
            return false;
        }
    
        get pancerz() {
             return this.#eq
            .filter(item => item instanceof Przedmiot)
            .filter(item => item.itemAttributes?.pancerz !== undefined)
            .map(item => item.itemAttributes.pancerz)
            .reduce((acc, val) => acc + val, 0);
        }
    
        dodajExp(value) {
            this.#exp += this.#validateNumber(value, "Dodawany EXP");
            this.#dostepnyExp += this.#validateNumber(value, "Dodawany EXP");
        }
    
    
        dodajZloto(value) {
            this.#zloto += this.#validateNumber(value, "Dodawane Złoto");
        }
    
         get fuksyMax() {
        let fuksyZCech = this.#cechy
            .filter(item => item instanceof Cecha)
            .filter(item => item.traitEffects?.fuksy !== undefined)
            .map(item => item.traitEffects.fuksy)
            .reduce((acc, val) => acc + val, 0);
    
        let fuksyZPrzedmiotow = this.#eq
            .filter(item => item instanceof Przedmiot)
            .filter(item => item.itemAttributes?.fuksy !== undefined)
            .map(item => item.itemAttributes.fuksy)
            .reduce((acc, val) => acc + val, 0);
    
        return this.#fuksyMax + fuksyZCech + fuksyZPrzedmiotow;
        }
    
        get obrona() {
              const walka = this.#umiejetnosci.get("Walka");
            return walka ? Math.floor(walka.IloscScian / 2) + 2 : 2;
        }
    
       get wytrzymalosc() {
         const wigor = this.#atrybuty.get("wigor");
            return wigor ? Math.floor(wigor.IloscScian / 2) + 2 : 2;
        }
    
        get wytrzymaloscPancerz() {
            return this.wytrzymalosc + this.pancerz;
        }
    
        get poziom() {
            if (this.#exp < 20) return "Nowicjusz";
            if (this.#exp < 40) return "Doświadczony";
            if (this.#exp < 60) return "Weteran";
            if (this.#exp < 80) return "Heros";
            return "Legendarny";
        }
    
        atrybut(key) {
            return this.#atrybuty.get(key) || null;
        }
    
        atrybutyKeys() {
            return [...this.#atrybuty.keys()];
        }
    
        umiejetnosc(key) {
            return this.#umiejetnosci.get(key) || null;
        }
    
        umiejetnosciKeys() {
            return [...this.#umiejetnosci.keys()];
        }
    
        #obliczMod(key) {
            let mod = 0;
            if (this.#eq.length > 0) {
                mod = this.#eq.reduce((acc, item) => {
                    let modValue = 0;
                     if (item instanceof Cecha && item.traitEffects?.mod != undefined) {
                       modValue += item.traitEffects.mod;
                     }
                     if (item instanceof Przedmiot && item.itemAttributes?.mod != undefined) {
                     modValue += item.itemAttributes.mod;
                      }
                    return acc + modValue;
                }, 0);
            }
            return mod;
        }
    
        #aktualizacjaModyfikatorow() {
            for (const key of this.#atrybuty.keys()) {
                 const mod = this.#obliczMod(key);
                 const atrybut = this.#atrybuty.get(key);
                if(atrybut.Modyfikator != mod){
                    const sciany = atrybut.IloscScian;
                     this.#atrybuty.set(key, Kostka.stworzKostke(sciany, mod));
                    }
            }
        }
    
    
        dodajPrzedmiot(przedmiot) {
            if (przedmiot instanceof Przedmiot) {
                this.#eq.push(przedmiot);
                console.log(przedmiot);
                this.#aktualizacjaModyfikatorow();
            }
        }
    
        dodajCeche(cecha) {
            if (cecha instanceof Cecha) {
                 this.#cechy.push(cecha);
                 this.#aktualizacjaModyfikatorow();
            }
        }
    
         dodajObrazenia(obrazenia) {
            if (obrazenia instanceof WynikRzutu) {
                if (this.#szok) {
                    this.#rany += obrazenia.iloscSukcesow();
                } else {
                    this.#szok = true;
                    this.#rany += obrazenia.iloscPrzebic();
                }
    
                if (this.#rany < 0) {
                    this.#rany = 0;
                }
            }
        }
    
        wyparowywanieRan() {
            if (this.uzyjFuksa()) {
                const rzut = RzutKoscmi.stworzRzut(this.#atrybuty.get("Wigor"), this.#figura, 0, 4, "Wyparowywanie ran");
                const wynik = rzut.rzut();
                this.#rany -= wynik.iloscSukcesow();
                if (this.#rany < 0) {
                    this.#rany = 0;
                }
                if (this.#rany == 0) {
                    this.#szok = false;
                }
                return true;
            } else {
                return false;
            }
        }
    
        czyMoznaLevelUp() {
            return this.#dostepnyExp >= 5;
        }
    
        levelUp(key = undefined, cecha = undefined) {
            if (this.czyMoznaLevelUp()) {
                this.#dostepnyExp -= 5;
                if (cecha instanceof Cecha) {
                    this.#cechy.push(cecha);
                } else {
                    if (!key) return;
                    if (this.#atrybuty.has(key)) {
                        const atrybut = this.#atrybuty.get(key);
                        const sciany = atrybut.IloscScian;
                        const mod = atrybut.Modyfikator;
                        this.#atrybuty.set(key, Kostka.stworzKostke(sciany + 2, mod));
                    } else if (this.#umiejetnosci.has(key)) {
                        const umiejetnosc = this.#umiejetnosci.get(key);
                        const sciany = umiejetnosc.IloscScian;
                        const mod = umiejetnosc.Modyfikator;
                        this.#umiejetnosci.set(key, Kostka.stworzKostke(sciany + 2, mod));
                    }
                }
            }
        }
    
        toString() {
            return `Imię: ${this.#imie}, Opis: ${this.#opis}, Atrybuty: ${JSON.stringify(Array.from(this.#atrybuty.entries()))}, Umiejętności: ${JSON.stringify(Array.from(this.#umiejetnosci.entries()))}, EQ: ${JSON.stringify(this.#eq)}, Figura: ${this.#figura}, Cechy: ${JSON.stringify(this.#cechy)}, EXP: ${this.#exp}, Dostępny EXP: ${this.#dostepnyExp}, Fuksy: ${this.#fuksyMax}, Fuksy Aktualne: ${this.#fuksyAktualne}, Rany: ${this.#rany}, Charyzma: ${this.#charyzma}, Szybkość: ${this.#szybkosc}, Złoto: ${this.#zloto}, Szok: ${this.#szok}`;
        }
    
          static #defaultAtrybuty = ["siła", "zręczność", "wigor", "spryt", "duch"];
        static #defaultUmiejetnosci = [
            "Przekonywanie", "Skradanie", "Spostrzegawczość",
            "Wiedza ogólna", "Wysportowanie", "Odwaga",
            "Zastraszanie", "Wyszukiwanie", "Wypytywanie",
            "Hazard", "Wiedza (Język)", "Rzucanie", "Walka",
            "Reperowanie", "Strzelanie", "Leczenie",
            "Włamywanie", "Sterowanie Pojazdami", "Tropienie"
        ];
    
        static stworzPostac(imie, opis = "", atrybuty = new Map(), umiejetnosci = new Map(), eq = [], figura = true, cechy = [], exp = 0, dostepnyExp = 0, zloto = 0, szybkosc = Kostka.stworzKostke(6)) {
                if (!imie) {
                    return null;
                }
            const atrybutyMap = Postac.#processStats(atrybuty, Postac.#defaultAtrybuty, 4);
            const umiejetnosciMap = Postac.#processStats(umiejetnosci, Postac.#defaultUmiejetnosci, 4, -2);
    
                let postac = new Postac(imie, opis, atrybutyMap, umiejetnosciMap, eq, figura, cechy, exp, dostepnyExp, zloto, szybkosc);

                if(postac instanceof Postac){
                    return postac;
                }else{
                    return null;
                }
        }
    
    
        static #processStats(stats, defaultKeys, kostkaSize, modifier = 0) {
            const statsMap = new Map();
            if(stats instanceof Map){
                for (const key of defaultKeys) {
                    let value = stats.get(key);
                    if (value instanceof Kostka) {
                            statsMap.set(key, value);
                        }else {
                             statsMap.set(key, Kostka.stworzKostke(kostkaSize, modifier));
                        }
                }
            }else{
              for(const key of defaultKeys){
                    statsMap.set(key, Kostka.stworzKostke(kostkaSize, modifier));
                }
            }
    
            return statsMap;
        }
    
    
           static stworzNPC(imie, opis = "", atrybuty = new Map(), umiejetnosci = new Map(), eq = [], figura = false, cechy = [], exp = 0, dostepnyExp = 0, zloto = 0, szybkosc = Kostka.stworzKostke(6)) {
            return Postac.stworzPostac(imie, opis, atrybuty, umiejetnosci, eq, figura, cechy, exp, dostepnyExp, zloto, szybkosc);
        }
    }
return Postac;
});