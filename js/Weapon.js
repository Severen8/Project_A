(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Przedmiot = require('./Item');
        module.exports = factory(Przedmiot);
    } else {
        //(Przegladarka)
        global.Bron = factory(global.Przedmiot);
    }
})(this, function (Przedmiot) {
    class Bron extends Przedmiot {
        constructor(itemID, itemName, itemType, itemAttributes, itemDesc, attackPower, traitName, traitEffects, traitDesc) {
            super(itemID, itemName, itemType, itemAttributes, itemDesc, traitName, traitEffects, traitDesc);
            this.attackPower = attackPower;
            
            if (this.itemType.toLowerCase() == "weapon") {
                console.log("Broń\n" + this.getDescription() + "\nAtk: " + attackPower)
            } else {
                console.log("Inny Przedmiot\n" + this.getDescription());
            }
        }

        static create({itemID, itemName, itemType, itemAttributes, itemDesc, attackPower = 0, traitName, traitEffects, traitDesc}) {
            return new Bron(itemID, itemName, itemType, itemAttributes, itemDesc, attackPower, traitName, traitEffects, traitDesc);
        }
    }

    return Bron;
});