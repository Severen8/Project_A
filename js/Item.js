(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Cecha = require('./Trait.js');
        module.exports = factory(Cecha);
    } else {
        //(Przegladarka)
        global.Przedmiot = factory(global.Cecha);
    }
})(this, function (Cecha) {
    class Przedmiot extends Cecha {
        constructor(itemID, itemName, itemType, itemAttributes, itemDesc, traitName, traitEffects, traitDesc) {
            super(traitName, traitEffects, traitDesc);
            this.itemID = itemID;
            this.itemName = itemName;
            this.itemType = itemType;
            this.itemAttributes = itemAttributes;
            this.itemDesc = itemDesc;
        }
    
        static create({itemID, itemName, itemType, itemAttributes, itemDesc, traitName, traitEffects, traitDesc}) {
            if (!itemID || !itemName || !itemType || !itemAttributes) {
                throw new Error("Błąd podczas tworzenia Przedmiotu -> nieodpowiednio wypełnione wszystkie parametry");
            }
    
            if (!Array.isArray(itemAttributes)) {
                throw new Error("Atrybuty muszą być tablicą");
            }
    
            return new Przedmiot(itemID, itemName, itemType, itemAttributes, itemDesc, traitName, traitEffects, traitDesc);
        }
    
        getDescription() {
            return `ID: ${this.itemID}, Przedmiot: ${this.itemName}, Typ: ${this.itemType}, Atrybuty: ${JSON.stringify(this.itemAttributes)}, \nDesc: ${this.itemDesc},\nCecha: ${super.getDescription()}`;
        }
    }

    return Przedmiot;
});