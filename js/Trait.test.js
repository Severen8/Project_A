const Cecha = require('./Trait.js');

describe('Cecha Class', () => {
    describe('create method', () => {
        it('should create an instance of Cecha when valid parameters are provided', () => {
            const traitName = 'Odporność';
            const traitEffects = ['+10% do obrony', '+2 do Siły'];
            const traitDesc = 'Zwiększa wytrzymałość kosztem szybkości.';

            const cecha = Cecha.create({ traitName, traitEffects, traitDesc });

            expect(cecha).toBeInstanceOf(Cecha);
            expect(cecha.traitName).toBe(traitName);
            expect(cecha.traitEffects).toEqual(traitEffects);
            expect(cecha.traitDesc).toBe(traitDesc);
        });

        it('should throw an error when traitName is missing', () => {
            expect(() => {
                Cecha.create({ traitEffects: ['+10% do obrony'], traitDesc: 'Opis cechy.' });
            }).toThrow('Błąd podczas tworzenia Cechy -> nieodpowiednio wypełnione wymagane parametry');
        });

        it('should throw an error when traitEffects is not an array', () => {
            expect(() => {
                Cecha.create({ traitName: 'Odporność', traitEffects: '+10% do obrony', traitDesc: 'Opis cechy.' });
            }).toThrow('Efekty muszą być tablicą');
        });
    });

    describe('getDescription method', () => {
        it('should return a correct description string', () => {
            const traitName = 'Odporność';
            const traitEffects = ['+10% do obrony', '-5% do prędkości'];
            const traitDesc = 'Zwiększa wytrzymałość kosztem szybkości.';

            const cecha = Cecha.create({ traitName, traitEffects, traitDesc });
            const description = cecha.getDescription();

            expect(description).toBe(
                `Nazwa Cechy: ${traitName}, Efekty: ${JSON.stringify(traitEffects)}, Opis: ${traitDesc}`
            );
        });

        it('should handle empty traitDesc gracefully', () => {
            const traitName = 'Odporność';
            const traitEffects = ['+10% do obrony'];
            const traitDesc = '';

            const cecha = Cecha.create({ traitName, traitEffects, traitDesc });
            const description = cecha.getDescription();

            expect(description).toBe(
                `Nazwa Cechy: ${traitName}, Efekty: ${JSON.stringify(traitEffects)}, Opis: ${traitDesc}`
            );
        });
    });
});