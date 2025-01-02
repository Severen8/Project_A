(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Przedmiot = require('./Przedmiot');
        module.exports = factory(Przedmiot);
    } else {
        //(Przegladarka)
        global.Weapon = factory(global.Przedmiot);
    }
})(this, function (Przedmiot) {
    class Bron extends Przedmiot {
        constructor(itemID, itemName, itemType, itemAttributes, itemDesc) {
            super(itemID, itemName, itemType, itemAttributes, itemDesc);
    
            if (toString(this.itemType).toLowerCase() == "weapon") {
                console.log("Broń" + this.getDescription())
            } else {
                console.log("Inny Przedmiot" + this.getDescription());
            }
            
        }
    }

    return Bron;
});