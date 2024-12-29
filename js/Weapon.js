import { Przedmiot } from './Item.js';

export class Bron extends Przedmiot {
    constructor(itemID, itemName, itemType, itemAttributes, itemDesc) {
        super(itemID, itemName, itemType, itemAttributes, itemDesc);

        if (toString(this.itemType).toLowerCase() == "weapon") {
            console.log("Broń" + this.getDescription())
        } else {
            console.log("Inny Przedmiot" + this.getDescription());
        }
    }
}