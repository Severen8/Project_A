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

            let atrybuty = document.createElement('div');
            atrybuty.textContent = "Atrybuty:";
            for(let key of character.AtrybutyKeys()){
                let atrybut = document.createElement('p');
                atrybut.id = key;
                atrybut.textContent = `${key}: d${character.Atrybut(key).toString()}`;

                atrybut.addEventListener('click', function(){
                    console.log(`Kliknięto atrybut ${key} o wartości ${character.Atrybut(key).toString()}`);
                    // tutaj ma być wysłane zapytanie do chatu
                });
                atrybuty.appendChild(atrybut);
            }
            kontener.appendChild(atrybuty);
            let umiejetnosci = document.createElement('div');
            umiejetnosci.textContent = "Umiejętności:";
            for(let key of character.UmiejętnościKeys() ){
                let umiejetnosc = document.createElement('p');
                umiejetnosc.id = key;
                umiejetnosc.textContent = `${key}: ${character.Umiejętność(key)}`;

                umiejetnosc.addEventListener('click', function(){
                    console.log(`Kliknięto umiejętność ${key} o wartości ${ character.Umiejętność(key)}`);
                    // tutaj ma być wysłane zapytanie do chatu
                });
                umiejetnosci.appendChild(umiejetnosc);
            }
            kontener.appendChild(umiejetnosci);

            let eq = document.createElement('div');
                eq.textContent = "Ekwipunek:";
            for(let item of character.EQ){
                let przedmiot = document.createElement('p');
                przedmiot.id = item.itemID;
                przedmiot.textContent = `${item.itemName}: ${item.itemDesc}`;

                
                eq.appendChild(przedmiot);
            }
            kontener.appendChild(eq);

            let cechy = document.createElement('div');
                cechy.textContent = "Cechy:";
            for(let cecha of character.Cechy){
                let cechaElement = document.createElement('p');
                cechaElement.id = cecha.traitName;
                cechaElement.textContent = `${cecha.traitName}: ${cecha.traitDesc}`;

                
                cechy.appendChild(cechaElement);
            }
            kontener.appendChild(cechy);

            let zloto = document.createElement('p');
            zloto.id = "złoto";
            zloto.textContent = `Złoto: ${character.Złoto}`;

            kontener.appendChild(zloto);

            let fuksy = document.createElement('p');
            fuksy.id = "fuksy";
            fuksy.textContent = `Fuksy: ${character.Fuksy}/${character.FuksyMax}`;

            kontener.appendChild(fuksy);

            let exp = document.createElement('p');
            exp.id = "exp";

            exp.textContent = `EXP: ${character.dostepnyEXP} Pozion: ${character.Poziom}`;

            kontener.appendChild(exp);




            document.body.appendChild(kontener);
            

        }
    }
    return Show;
});