(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        module.exports = factory();
    } else {
        //(Przegladarka)
        global.Cecha = factory();
    }
})(this, function () {
    class Cecha {
        constructor(traitName, traitEffects, traitDesc) {
            this.traitName = traitName;
            this.traitEffects = traitEffects;
            this.traitDesc = traitDesc;
        }
    
        static create({traitName,traitEffects,traitDesc}) {
            if (!traitName || !traitEffects) {
                throw new Error("Błąd podczas tworzenia Cechy -> nieodpowiednio wypełnione wymagane parametry");
            }
    
            if (!Array.isArray(traitEffects)) {
                throw new Error("Efekty muszą być tablicą");
            }
    
            return new Cecha(traitName, traitEffects, traitDesc);
        }
    
        getDescription() {
            return `Nazwa Cechy: ${this.traitName}, Efekty: ${JSON.stringify(this.traitEffects)}, Opis: ${this.traitDesc}`;
        }
    }

    return Cecha;
});