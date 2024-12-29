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

// Przykład użycia
const item_id_1 = Przedmiot.create({
    itemID: 1,
    itemName: "Zardzewiały Topór",
    itemType: "weapon",
    itemAttributes: [
        { attr: "str", value: 2 },
        { attr: "vit", value: 1 }
    ],
    itemDesc: "Topór ma zardzewiały metalowy obuch, z tego względu nie jest pierwszorzędną bronią. Trzon wykonany jest z nieznanego gatunku drewna."
});

console.log(item_id_1.getDescription());