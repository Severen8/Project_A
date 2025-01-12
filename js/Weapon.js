(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Przedmiot = require('./Item');
        module.exports = factory(Przedmiot);
    } else {
        //(Przegladarka)
        global.Weapon = factory(global.Przedmiot);
    }
})(this, function (Przedmiot) {
    class Bron extends Przedmiot {
        constructor(itemID, itemName, itemType, itemAttributes, itemDesc, attackPower) {
            super(itemID, itemName, itemType, itemAttributes, itemDesc);
            
            if (this.itemType.toLowerCase() == "weapon") {
                console.log("Broń\n" + this.getDescription() + "\nAtk: " + attackPower)
            } else {
                console.log("Inny Przedmiot\n" + this.getDescription());
            }
            
        }
    }

    return Bron;
});