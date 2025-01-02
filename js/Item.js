(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        module.exports = factory();
    } else {
        //(Przegladarka)
        global.Przedmiot = factory();
    }
})(this, function () {
    class Przedmiot {
        constructor(itemID, itemName, itemType, itemAttributes, itemDesc) {
            this.itemID = itemID;
            this.itemName = itemName;
            this.itemType = itemType;
            this.itemAttributes = itemAttributes;
            this.itemDesc = itemDesc;
        }
    
        static create({itemID, itemName, itemType, itemAttributes, itemDesc}) {
            if (!itemID || !itemName || !itemType || !itemAttributes) {
                throw new Error("Błąd podczas tworzenia Przedmiotu -> nieodpowiednio wypełnione wszystkie parametry");
            }
    
            if (!Array.isArray(itemAttributes)) {
                throw new Error("Atrybuty muszą być tablicą");
            }
    
            return new Przedmiot(itemID, itemName, itemType, itemAttributes, itemDesc);
        }
    
        getDescription() {
            return `ID: ${this.itemID}, Przedmiot: ${this.itemName}, Typ: ${this.itemType}, Atrybuty: ${JSON.stringify(this.itemAttributes)}, \nDesc: ${this.itemDesc}`;
        }
    }

    return Przedmiot;
});