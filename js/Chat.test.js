const { obsluzKomende } = require('./Chat');
const Kostka = require('./Kostka');
const WynikRzutu = require('./WynikRzut');

jest.mock('./Kostka', () => {
    return jest.fn().mockImplementation((iloscScian, modyfikator) => ({
        IloscScian: iloscScian,
        Modyfikator: modyfikator,
        rzuc: jest.fn(() => Math.floor(Math.random() * iloscScian) + 1 + modyfikator),
    }));
});

jest.mock('./WynikRzut', () => {
    return jest.fn().mockImplementation((wyniki, wartoscStatystyki, opis, dodatki, trudnosc) => ({
        toString: jest.fn(() => `Mocked WynikRzutu: ${opis}, suma: ${wyniki.reduce((a, b) => a + b, 0)}`),
    }));
});

describe('Chat - obsluzKomende', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('powinno obsłużyć rzut kostkami "/r 2d8+3"', () => {
        const wynik = obsluzKomende('/r 2d8+3');
        expect(wynik).toContain('Mocked WynikRzutu: Rzut 2d8+3');
    });

    it('powinno obsłużyć rzut na statystykę "/r sila d20+3"', () => {
        const wynik = obsluzKomende('/r sila d20+3');
        expect(wynik).toContain('Mocked WynikRzutu: Rzut na sila');
    });

    it('powinno zwrócić błąd dla nieznanej komendy', () => {
        const wynik = obsluzKomende('/r unknown');
        expect(wynik).toBe('Nieznana komenda: unknown');
    });

    it('powinno zwrócić wiadomość dla zwykłego tekstu', () => {
        const wynik = obsluzKomende('Cześć wszystkim!');
        expect(wynik).toBe('Wiadomość: Cześć wszystkim!');
    });
});
