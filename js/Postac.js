
(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const {Przedmiot} = require('./Item.js');
const {Cecha} = require('./Trait.js');
const {RzutKoscmi} = require('./Rzut'); // Adjust the path if necessary
const {WynikRzutu} = require('./WynikRzut');
const {isNumber, Kostka} = require('./Kostka.js'); // Adjust the path if necessary


        module.exports = factory( Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi);
    } else {
        //(Przegladarka)
        global.Postac = factory( global.Przedmiot, global.Cecha, global.Kostka, global.WynikRzutu, global.RzutKoscmi);
    }
})(this, function ( Przedmiot, Cecha, Kostka, WynikRzutu, RzutKoscmi) {

class Postac{
    #imię
    #opis
    #Atrybuty 
    #Umiejętności
    #EQ 
    #Figura
    #Cechy
    
    #EXP
    #dostepnyEXP
    #Fuksy 
    #FuksyAktualne
    #Rany
#Charyzma
#Szybkość
#zloto
#szok

constructor(imię,opis,Atrybuty,Umiejętności,EQ = [], Figura=true, Cechy=[], EXP=0,dostempnyExp = 0, zloto=0, Szybkość = Kostka.stworzKostke(6)){
    if(typeof imię !== 'string')
    throw new Error('Imię musi być typu string');
    else
    this.#imię=imię;

    if(typeof opis !== 'string')
    throw new Error('Opis musi być typu string');
    else
    this.#opis=opis;

    if(!(Atrybuty instanceof Map))
    throw new Error('Atrybuty muszą być typu Map');
    else
    this.#Atrybuty=Atrybuty;

    if(!(Umiejętności instanceof Map))
    throw new Error('Umiejętności muszą być typu Map');
    else
    this.#Umiejętności=Umiejętności;

    if(!Array.isArray(EQ))
    throw new Error('EQ musi być tablicą');
    else
    this.#EQ=EQ;

    if(typeof Figura !== 'boolean')
    throw new Error('Figura musi być typu boolean');
    else
    this.#Figura=Figura;

    if(!Array.isArray(Cechy))
    throw new Error('Cechy muszą być tablicą');
    else
    this.#Cechy=Cechy;

    if(typeof EXP !== 'number')
    throw new Error('EXP musi być liczbą');
    else
    this.#EXP=EXP;

       if(typeof zloto !== 'number')
    throw new Error('Złoto musi być liczbą');
    else
    this.#zloto=zloto;

    if(!(Szybkość instanceof Kostka))
    throw new Error('Szybkość musi być typu Kostka');
    else
    this.#Szybkość=Szybkość;

    if(typeof dostempnyExp !== 'number')
    throw new Error('Dostępny EXP musi być liczbą');
    else
    this.#dostepnyEXP=dostempnyExp;

    this.#Fuksy=3;

    this.#FuksyAktualne=3;

    this.#Rany=0;
    this.#szok = false;


    this.#Charyzma = this.#Cechy.filter(cecha=>cecha.traitEffects.charyzma != undefined).map(cecha=>cecha.traitEffects.charyzma).reduce((acc, val) => acc + val, 0);
    
}

get Imię(){
    return this.#imię;
}

get Opis(){
    return this.#opis;
}

get Fuksy(){
    return this.#FuksyAktualne;
}

set Fuksy(value){
    if(typeof value !== 'number')
    throw new Error('Fuksy muszą być liczbą');
    else
    this.#FuksyAktualne=value;
}

uzyjFuksa(){
    if(this.#FuksyAktualne>0){
        this.#FuksyAktualne--;
        return true;
    }
    else{
        return false;}
}

get Szybkość(){
    return this.#Szybkość;
}
get Charyzma(){
    return this.#Charyzma;
}

get Szybkość(){
    return this.#Szybkość;
}

get Pancerz(){
    return this.#EQ.filter(przedmiot=>typeof przedmiot =="Przedmiot").filter(przedmiot=>przedmiot.itemAttributes.pancerz != undefined).map(przedmiot=>przedmiot.itemAttributes.pancerz).reduce((acc, val) => acc + val, 0);
}

get EXP(){
    return this.#EXP;}

    get dostepnyEXP(){
        return this.#dostepnyEXP;}

    dodajEXP(value){
        if(typeof value !== 'number')
        throw new Error('EXP musi być liczbą');
        else
        this.#EXP+=value;
        this.#dostepnyEXP+=value;
    }

    get Złoto(){
        return this.#zloto;}
        set Złoto(value){
            if(typeof value !== 'number')
            throw new Error('Złoto musi być liczbą');
            else
            this.#zloto=value;
        }

        dodajZloto(value){
            if(typeof value !== 'number')
            throw new Error('Złoto musi być liczbą');
            else
            this.#zloto+=value;
        }

get FuksyMax(){
    
    let fuksyZCech=this.#EQ.filter(cecha=>typeof cecha =="Cecha").filter(cecha=>cecha.traitEffects.fuksy != undefined).map(cecha=>cecha.traitEffects.fuksy).reduce((acc, val) => acc + val, 0);
    let fuksyZPrzedmiotów=this.#EQ.filter(przedmiot=>typeof przedmiot =="Przedmiot").filter(przedmiot=>przedmiot.itemAttributes.fuksy != undefined).map(przedmiot=>przedmiot.itemAttributes.fuksy).reduce((acc, val) => acc + val, 0);
    return this.#Fuksy+fuksyZCech+fuksyZPrzedmiotów;
}

get Figura(){
    return this.#Figura;}

get Obrona(){
    return this.#Umiejętności.get("walka").IloscScian/2+2;}

    get Wytrzymałość(){
        return this.#Atrybuty.get("wigor").IloscScian/2+2;}

    get WytrzymałośćPancerz(){
        return this.Wytrzymałość+this.Pancerz;}
    get Rany(){ return this.#Rany;}


    get Poziom(){
        if(this.#EXP<20)return "Nowicjusz";
        else if(this.#EXP<40)return "Doświadczony";
        else if(this.#EXP<60)return "Weteran";
        else if(this.#EXP<80)return "Heros";
        else return "Legendarny";
    }
  Atrybut(key){
    if(this.#Atrybuty.has(key))
    return this.#Atrybuty.get(key);
    else
    return null;}

    AtrybutyKeys(){
        return this.#Atrybuty.keys();}

    
    Umiejętność(key){
    if(this.#Umiejętności.has(key))
    return this.#Umiejętności.get(key);
    else
    return null;}

    UmiejętnościKeys(){
        return this.#Umiejętności.keys();}  

    #ObliczMod(key){
        let mod=0;
        if(this.#EQ.length>0){
            this.#Cechy.filter(cecha=>typeof cecha =="Cecha").filter(cecha=>cecha.traitEffects.mod != undefined).map(cecha=>cecha.traitEffects.mod).forEach(mod=>mod+=mod);
            this.#EQ.filter(przedmiot=>typeof przedmiot =="Przedmiot").filter(przedmiot=>przedmiot.itemAttributes.mod != undefined).map(przedmiot=>przedmiot.itemAttributes.mod).forEach(mod=>mod+=mod);
        }
        return mod;
    }

    #aktualizacjaModyfikatorow(){
        this.#Atrybuty.keys().forEach((key)=>{
            let mod = this.#ObliczMod(key);
            if(this.#Atrybuty.get(key).Modyfikator != mod){
                let sciany = this.#Atrybuty.get(key).IloscScian;
                this.#Atrybuty.delete(key);
                this.#Atrybuty.set(key, Kostka.stworzKostke(sciany,mod));
            }
        });
    }

    dodajPrzedmiot(przedmiot){
        if(przedmiot instanceof Przedmiot){
            this.#EQ.push(przedmiot);
        }
        this.#aktualizacjaModyfikatorow();
    }

    dodajCeche(cecha){
        if(cecha instanceof Cecha){
            this.#EQ.push(cecha);
        }
        this.#aktualizacjaModyfikatorow();
    }

    dodajObrażenia(obrażenia){
        if(obrażenia instanceof WynikRzutu){
            if(this.#szok){
                this.#Rany+=obrażenia.iloscSukcesow();
            }else{
                this.#szok=true;
                this.#Rany+=obrażenia.iloscPrzebic();
            }
        
        if(this.#Rany<0){
            this.#Rany=0;
        }
    }
    }

    wyparowywanieRan(){
        if(this.uzyjFuksa()){
            let rzut = RzutKoscmi.stworzRzut(this.#Atrybuty.get("Wigor"),this.#Figura,0,4,"Wyparowywanie ran");
            let wynik = rzut.rzut();
            this.#Rany-=wynik.iloscSukcesow();
            if(this.#Rany<0){
                this.#Rany=0;
            }
            if(this.#Rany==0){
                this.#szok=false;
            }
            return true;
        }else{
            return false;
        }
    }


    czyMoznaLevelUp(){
        return this.#dostepnyEXP>=5;
    }

    levelUp(key = undefined, Cecha = undefined){
        if(this.czyMoznaLevelUp()){
            this.#dostepnyEXP-=5;
            if(typeof Cecha == "Cecha"){
                this.#Cechy.push(Cecha);
            }else{
                if(key == undefined)
                    return;
                if(this.#Atrybuty.has(key)){
                    let sciany = this.#Atrybuty.get(key).IloscScian;
                    let mod = this.#Atrybuty.get(key).Modyfikator;
                    this.#Atrybuty.set(key, Kostka.stworzKostke(sciany+2,mod));
                }else{
                    let sciany = this.#Umiejętności.get(key).IloscScian;
                    let mod = this.#Umiejętności.get(key).Modyfikator;
                    this.#Umiejętności.set(key, Kostka.stworzKostke(sciany+2,mod));
                }
            }
                
            
        }
    }

    toString(){
        return `Imię: ${this.#imię}, Opis: ${this.#opis}, Atrybuty: ${JSON.stringify(this.#Atrybuty)}, Umiejętności: ${JSON.stringify(this.#Umiejętności)}, EQ: ${JSON.stringify(this.#EQ)}, Figura: ${this.#Figura}, Cechy: ${JSON.stringify(this.#Cechy)}, EXP: ${this.#EXP}, Dostępny EXP: ${this.#dostepnyEXP}, Fuksy: ${this.#Fuksy}, Fuksy Aktualne: ${this.#FuksyAktualne}, Rany: ${this.#Rany}, Charyzma: ${this.Charyzma}, Szybkość: ${this.#Szybkość}, Złoto: ${this.#zloto}, Szok: ${this.#szok}`;
    }

}
return Postac;
});