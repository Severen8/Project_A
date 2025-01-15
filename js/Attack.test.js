const Attack = require('./Attack');
const Bron = require('./Weapon');
const { Kostka } = require('./Kostka');
const RzutKoscmi = require('./Rzut');

describe('Attack', () => {
    let validWeapon;
    let validDiceArray;

    beforeEach(() => {
        validWeapon = new Bron(1, 'Miecz', 'Weapon', ['ostry', 'stalowy'], 'Miecz bojowy', 5);
        validDiceArray = [new Kostka(6), new Kostka(8)];
    });

    it('powinna poprawnie utworzyć instancję klasy Attack z poprawnymi danymi', () => {
        const attack = new Attack('Cięcie', validWeapon, validDiceArray, true, 2, 5);

        expect(attack.nazwaAtaku).toBe('Cięcie');
        expect(attack.bron).toBe(validWeapon);
        expect(attack.modyfikator).toBe(7); // 2 (modyfikator) + 5 (attackPower broni)
        expect(attack.rzutKoscmi).toBeInstanceOf(RzutKoscmi);
    });

    it('powinna rzucić wyjątek, jeśli nazwa ataku jest pusta', () => {
        expect(() => new Attack('', validWeapon, validDiceArray)).toThrow('Nazwa ataku musi być niepustym stringiem.');
    });

    it('powinna rzucić wyjątek, jeśli bron nie jest obiektem Weapon', () => {
        expect(() => new Attack('Cięcie', new Bron(2, 'Zwój Magiczny', 'Scroll', ['Magiczny', 'Czarna Magia'], 'Starożytny zwój czarnej magii', 15), validDiceArray)).toThrow("Bron musi być obiektem typu 'weapon'.");
    });

    it('powinna rzucić wyjątek, jeśli tablica kości jest pusta', () => {
        expect(() => new Attack('Cięcie', validWeapon, [])).toThrow('Tablica kości musi być niepustą tablicą.');
    });

    it('powinna poprawnie wykonać atak', () => {
        const attack = new Attack('Cięcie', validWeapon, validDiceArray, true, 2, 5);
        const rzutSpy = jest.spyOn(attack.rzutKoscmi, 'rzut').mockReturnValue('Wynik testowy');

        const wynik = attack.wykonajAtak();

        expect(rzutSpy).toHaveBeenCalled();
        expect(wynik).toBe('Wynik testowy');

        rzutSpy.mockRestore();
    });

    it('powinna rzucić wyjątek, jeśli nie uda się stworzyć rzutu kośćmi', () => {
        jest.spyOn(RzutKoscmi, 'stworzRzut').mockReturnValue(null);

        expect(() => new Attack('Cięcie', validWeapon, validDiceArray)).toThrow('Nie udało się stworzyć rzutu kośćmi dla ataku.');

        RzutKoscmi.stworzRzut.mockRestore();
    });
});
