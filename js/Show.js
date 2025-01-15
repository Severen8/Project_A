(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const {Postac} = require('./Postac.js');
        const {Przedmiot} = require('./Item.js');
        const {Cecha} = require('./Trait.js');
        const {RzutKoscmi} = require('./Rzut'); // Adjust the path if necessary
        const {WynikRzutu} = require('./WynikRzut');
        const {isNumber, Kostka} = require('./Kostka.js'); // Adjust the path if necessary

        module.exports = factory( Postac, Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi);
    } else {
        //(Przegladarka)
        global.Show = factory(  global.Postac, global.Przedmiot, global.Cecha, global.Kostka, global.WynikRzutu, global.RzutKoscmi);
    }
})(this, function ( Postac, Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi) {
    class Show {
        static showText(text) {
            console.log(text);
        }
        static showPostac(character) {
            
            let kontener = document.createElement('div');
            let imie = document.createElement('h1');
            imie.textContent = character.Imię;
            kontener.appendChild(imie);

            let opis = document.createElement('p');
            opis.textContent = character.Opis;
            kontener.appendChild(opis);

            let obrona = document.createElement('p');
            obrona.textContent = `Obrona: ${character.obrona}`;
            kontener.appendChild(obrona);

            let wytrzymalosc = document.createElement('p');
            wytrzymalosc.textContent = `Wytrzymałość: ${character.wytrzymalosc}`;
            kontener.appendChild(wytrzymalosc);
            
            let atrybuty = document.createElement('div');
            atrybuty.textContent = "Atrybuty:";
            for(let key of character.atrybutyKeys()){
                let atrybut = document.createElement('p');
                atrybut.id = key;
                atrybut.textContent = `${key}: ${character.atrybut(key).toString()}`;

                atrybut.addEventListener('click', function(){
                    console.log(`Kliknięto atrybut ${key} o wartości ${character.atrybut(key).toString()}`);
                    // tutaj ma być wysłane zapytanie do chatu
                });
                atrybuty.appendChild(atrybut);
            }
            kontener.appendChild(atrybuty);
            let umiejetnosci = document.createElement('div');
            umiejetnosci.textContent = "Umiejętności:";
            for(let key of character.umiejetnosciKeys() ){
                let umiejetnosc = document.createElement('p');
                umiejetnosc.id = key;
                umiejetnosc.textContent = `${key}: ${character.umiejetnosc(key)}`;

                umiejetnosc.addEventListener('click', function(){
                    console.log(`Kliknięto umiejętność ${key} o wartości ${ character.umiejetnosc(key)}`);
                    // tutaj ma być wysłane zapytanie do chatu
                });
                umiejetnosci.appendChild(umiejetnosc);
            }
            kontener.appendChild(umiejetnosci);

            let eq = document.createElement('div');
                eq.textContent = "Ekwipunek:";
            for(let item of character.eq){
                let przedmiot = document.createElement('p');
                przedmiot.id = item.itemID;
                przedmiot.textContent = `${item.itemName}: ${item.itemDesc}`;

                
                eq.appendChild(przedmiot);
            }
            kontener.appendChild(eq);

            let cechy = document.createElement('div');
                cechy.textContent = "Cechy:";
            for(let cecha of character.cechy){
                let cechaElement = document.createElement('p');
                cechaElement.id = cecha.traitName;
                cechaElement.textContent = `${cecha.traitName}: ${cecha.traitDesc}`;

                
                cechy.appendChild(cechaElement);
            }
            kontener.appendChild(cechy);

            let zloto = document.createElement('p');
            zloto.id = "złoto";
            zloto.textContent = `Złoto: ${character.zloto}`;

            kontener.appendChild(zloto);

            let fuksy = document.createElement('p');
            fuksy.id = "fuksy";
            fuksy.textContent = `Fuksy: ${character.fuksy}/${character.fuksyMax}`;

            kontener.appendChild(fuksy);

            let exp = document.createElement('p');
            exp.id = "exp";

            exp.textContent = `EXP: ${character.dostepnyExp} Pozion: ${character.poziom}`;

            kontener.appendChild(exp);




            document.body.appendChild(kontener);
            

        }
    }
    return Show;
});