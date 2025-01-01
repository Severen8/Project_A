export class Character {
    constructor(/*characterType*/ characterName, characterRace, characterSkills, characterEquipment, characterHistory, characterStats) {
       // this.characterType = characterType //albo zrobić tak jak na dole
        this.characterName = characterName;
        this.characterRace = characterRace;
        this.characterSkills = characterSkills;
        this.characterEquipment = characterEquipment;
        this.characterHistory = characterHistory;
        this.characterStats = characterStats;
    }

    static create({characterType, characterName, characterRace, characterSkills, characterEquipment, characterHistory, characterStats}) {
        if (!characterType || !characterName || !characterRace || !characterSkills || !characterEquipment || !characterHistory || !characterStats) {
            throw new Error("Błąd podczas tworzenia Postaci -> nieodpowiednio wypełnione wszystkie parametry");
        }

        // if (!Array.isArray(characterEquipment)) {
        //     throw new Error("Ekwipunek musi być tablicą");
        // }

        // if (!Array.isArray(characterStats)) {
        //     throw new Error("Statystyki muszą być tablicą");
        // }

        return new (characterType, characterName, characterRace, characterSkills, characterEquipment, characterHistory, characterStats);
    }

    getDescription() {
        return `Rodzaj: ${this.characterType}, Nazwa: ${this.characterName}, Rasa: ${this.characterRace}, Skills: ${JSON.stringify(this.itemSkills)}, 
        \nHistoria: ${this.characterHistory}, Statystyki: ${JSON.stringify(this.characterStats)}`;
    }
}

// export class Player extends Character {
    
// }

// export class NPC extends Character {

// }