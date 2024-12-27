const {isNumber, Kostka, stworzKostke} = require('./Kostka.js'); // Adjust the path if necessary


describe('isNumber', () => {
    it('should return true for valid numbers', () => {
        expect(isNumber(5)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(-5)).toBe(true);
        expect(isNumber(3.14)).toBe(true);
    });
    it('should return false for invalid numbers', () => {
        expect(isNumber('abc')).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
        expect(isNumber(NaN)).toBe(false);
    });

});

describe('Kostka', () => {
    describe('constructor', () => {
        it('should create a Kostka object with the given number of sides and a default modifier of 0', () => {
            var kostka = new Kostka(6);
            expect(kostka.IloscScian).toBe(6);
            expect(kostka.Modyfikator).toBe(0);
        });

        it('should create a Kostka object with the given number of sides and modifier', () => {
            const kostka = new Kostka(10, 2);
            expect(kostka.IloscScian).toBe(10);
            expect(kostka.Modyfikator).toBe(2);
        });

        it('should throw an error if the number of sides is not a positive number', () => {
            expect(() => new Kostka(0)).toThrowError("Liczba ścian musi być liczbą dodatnią.");
            expect(() => new Kostka(-5)).toThrowError("Liczba ścian musi być liczbą dodatnią.");
            expect(() => new Kostka('abc')).toThrowError("Liczba ścian musi być liczbą dodatnią.");
            expect(() => new Kostka(NaN)).toThrowError("Liczba ścian musi być liczbą dodatnią.");
        });
      it('should handle undefined modifier by setting it to 0', () => {
            const kostka = new Kostka(6, undefined);
            expect(kostka.Modyfikator).toBe(0);
         });
        it('should handle not number modifier by setting it to 0', () => {
             const kostka = new Kostka(6, 'abc');
             expect(kostka.Modyfikator).toBe(0);
        });
    });

    describe('toString', () => {
        it('should return a string in the correct format for no modifier', () => {
            const kostka = new Kostka(6);
            expect(kostka.toString()).toBe('Kostka d6');
        });

        it('should return a string in the correct format for a positive modifier', () => {
            const kostka = new Kostka(10, 2);
            expect(kostka.toString()).toBe('Kostka d10+2');
        });

        it('should return a string in the correct format for a negative modifier', () => {
            const kostka = new Kostka(20, -3);
            expect(kostka.toString()).toBe('Kostka d20-3');
        });
    });
});


describe('stworzKostke', () => {
    it('should return a Kostka object if the number of sides is valid', () => {
        const kostka = stworzKostke(6);
        expect(kostka).toBeInstanceOf(Kostka);
        expect(kostka.IloscScian).toBe(6);
        expect(kostka.Modyfikator).toBe(0);

        const kostka2 = stworzKostke(10, 2);
        expect(kostka2).toBeInstanceOf(Kostka);
        expect(kostka2.IloscScian).toBe(10);
        expect(kostka2.Modyfikator).toBe(2);


    });
      it('should set the modifier to 0 if it is not a number', () => {
        const kostka = stworzKostke(6, 'abc');
        expect(kostka).toBeInstanceOf(Kostka);
        expect(kostka.Modyfikator).toBe(0);
      });

    it('should return null if the number of sides is invalid', () => {
        expect(stworzKostke(0)).toBeNull();
        expect(stworzKostke(-5)).toBeNull();
        expect(stworzKostke('abc')).toBeNull();
    });
});