const RzutKoscmi = require('./Rzut'); // Adjust the path if necessary
const WynikRzutu = require('./WynikRzut');
const {isNumber, Kostka} = require('./Kostka.js'); // Adjust the path if necessary




describe('stworzRzut', () => {
    it('should create a RzutKoscmi object with valid parameters', () => {
        const rzut = RzutKoscmi.stworzRzut([new Kostka(6), new Kostka(6)], true, 2, 5, "Test rzutu");
        expect(rzut).toBeInstanceOf(RzutKoscmi);
    });
    it('should default to proper values', () => {
        const rzut = RzutKoscmi.stworzRzut([new Kostka(6),new Kostka(6)]);
        expect(rzut).toBeInstanceOf(RzutKoscmi);
        expect(rzut.rzut().modyfikator).toBe(0);
        expect(rzut.rzut().trudnoscRzutu).toBe(4);
        expect(rzut.rzut().opis).toBe("Rzut kośćmi");
    });

    it('should return null for invalid parameters', () => {
        expect(RzutKoscmi.stworzRzut(123)).toBeNull();
        expect(RzutKoscmi.stworzRzut([new Kostka(6),new Kostka(6)], false, 'a')).toBeNull();
        expect(RzutKoscmi.stworzRzut([new Kostka(6),new Kostka(6)], false, 2, 'a')).toBeNull();
        expect(RzutKoscmi.stworzRzut([new Kostka(6),new Kostka(6)], false, 2, 2, 123)).toBeNull();
        expect(RzutKoscmi.stworzRzut([new Kostka(6),new Kostka(6)], 1, 2, 2, 'test')).toBeNull();
        expect(RzutKoscmi.stworzRzut([], false, 2, 2, 'test')).toBeNull();
    });
});


describe('RzutKoscmi', () => {
    describe('constructor', () => {
        it('should create a RzutKoscmi object with valid parameters', () => {
            const rzut = new RzutKoscmi([new Kostka(6), new Kostka(6)], true, 2, 5, "Test rzutu");
            expect(rzut).toBeInstanceOf(RzutKoscmi);
        });
        it('should throw an error when invalid parameters provided', () => {
            expect(() => new RzutKoscmi(123)).toThrowError('Tablica kości musi być niepustą tablicą.');
            expect(() => new RzutKoscmi([new Kostka(6), new Kostka(6)], false,'a')).toThrowError('Modyfikator musi byc liczba');
            expect(() => new RzutKoscmi([new Kostka(6), new Kostka(6)], false, 2, 'a')).toThrowError('Trudnosc rzutu musi być liczbą dodatnią');
            expect(() => new RzutKoscmi([new Kostka(6), new Kostka(6)], false, 2,2, 123)).toThrowError('Opis musi byc stringiem');
            expect(() => new RzutKoscmi([new Kostka(6), new Kostka(6)], 1, 2,2, 'test')).toThrowError('Czy figura musi być typu boolean');

        });
    });
    describe('rzut', () => {
        it('should return a WynikRzutu object', () => {
            const rzut = new RzutKoscmi([new Kostka(6), new Kostka(6)], true, 2, 5, "Test rzutu");
            const wynikRzutu = rzut.rzut();
            expect(wynikRzutu).toBeInstanceOf(WynikRzutu);
        });
        it('should throw error if tablica kości contains invalid values', () => {
            const rzut = new RzutKoscmi([new Kostka(6), 123], true, 2, 5, "Test rzutu");
            expect(() => rzut.rzut()).toThrowError('Tablica kości zawiera niepoprawne dane');

        });

        it('should return a WynikRzutu object with the correct values when figura is not provided', () => {
            const rzut = new RzutKoscmi([new Kostka(4), new Kostka(6)], false, 2,4, "Test rzutu");
            const wynikRzutu = rzut.rzut();
            expect(wynikRzutu.modyfikator).toBe(2);
            expect(wynikRzutu.opis).toBe("Test rzutu");
            expect(wynikRzutu.wynikKosciFigury).toEqual([0]);
             expect(wynikRzutu.trudnoscRzutu).toBe(4);
        });
        it('should return a WynikRzutu object with the correct values when figura is  provided', () => {
            const rzut = new RzutKoscmi([new Kostka(4),new Kostka(6)], true, 2,5, "Test rzutu", );
            const wynikRzutu = rzut.rzut();
            expect(wynikRzutu.modyfikator).toBe(2);
            expect(wynikRzutu.opis).toBe("Test rzutu");
            expect(Array.isArray(wynikRzutu.wynikKosciFigury)).toBe(true);
            expect(wynikRzutu.trudnoscRzutu).toBe(5);
        });
        

        it('should perform automatic success roll when figure roll is true', () => {
             const rzut = new RzutKoscmi([new Kostka(6)], true, 0, 4, "Test rzutu");
            const wynikRzutu = rzut.rzut();
            let success = false;
            wynikRzutu.wynikKosciFigury.forEach(el=>{if(el === 6) success = true});
           if(success){
             expect(wynikRzutu.wynikKosciFigury.length).toBe(2)
         }
        });
    });
});