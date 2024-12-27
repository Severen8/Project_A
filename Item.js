class Przedmiot {
    constructor(itemName, itemType, itemSlotID, itemAttributes) {
        this.itemName = itemName;
        this.itemType = itemType;
        this.itemSlotID = itemSlotID;
        this.itemAttributes = itemAttributes;
    }

    static create({itemName, itemType, itemSlotID, itemAttributes}) {
        if (!itemName || !itemType || !itemSlotID || !itemAttributes) {
            throw new Error("Błąd podczas tworzenia Przedmiotu -> nieodpowiednio wypełnione wszystkie parametry");
        }

        if (!Array.isArray(itemAttributes)) {
            throw new Error("Atrybuty muszą być tablicą");
        }

        return new Przedmiot(itemName, itemType, itemSlotID, itemAttributes);
    }

    getDescription() {
        return `Przedmiot: ${this.itemName}, Typ: ${this.itemType}, Slot: ${this.itemSlotID}, Atrybuty: ${JSON.stringify(this.itemAttributes)}`;
    }
}

// Przykład użycia
const item = Przedmiot.create({
    itemName: "Zardzewiały Topór",
    itemType: "weapon",
    itemSlotID: 1,
    itemAttributes: [
        { attr: "str", value: 2 },
        { attr: "vit", value: 1 }
    ]
});

console.log(item.getDescription());