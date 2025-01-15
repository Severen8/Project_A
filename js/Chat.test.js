/**
 * @jest-environment jsdom
 */

const { obsluzKomende, ustawObslugeKlikniec } = require('./Chat');

jest.mock('./Postac.js', () => ({
    stworzPostac: jest.fn(() => ({
        atrybuty: new Map([
            ["siła", { IloscScian: 6 }],
            ["zręczność", { IloscScian: 8 }],
        ]),
        umiejetnosci: new Map([
            ["walka", { IloscScian: 10 }],
            ["skradanie", { IloscScian: 6 }],
        ]),
    })),
}));

jest.mock('./Kostka.js', () => ({
    stworzKostke: jest.fn((iloscScian) => ({ IloscScian: iloscScian })),
}));

jest.mock('./WynikRzut.js', () => ({
    obliczWyrazenie: jest.fn(),
}));

jest.mock('./Show.js', () => ({
    showPostac: jest.fn(),
}));

jest.mock('./Rzut.js', () => ({
    RzutKoscmi: jest.fn().mockImplementation(() => ({
        rzut: jest.fn(() => ({
            wynikKosciAtrybutu: [5, 3],
        })),
    })),
}));

describe('Chat module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('obsłużenie komendy "/r 2d6+3"', () => {
        const wynik = obsluzKomende('/r 2d6+3');
        expect(wynik).toContain('Wynik rzutu:');
        expect(wynik).toMatch(/Wynik rzutu: \d+, \d+/);
    });

    test('obsłużenie komendy "/r d6"', () => {
        const wynik = obsluzKomende('/r d6');
        expect(wynik).toContain('Wynik rzutu:');
        expect(wynik).toMatch(/Wynik rzutu: \d+/);
    });

    test('obsłużenie komendy "/r show"', () => {
        document.body.innerHTML = '<div id="postac-info"></div>';
        const wynik = obsluzKomende('/r show');
        expect(wynik).toBe('Informacje o postaci zostały wyświetlone w elemencie #postac-info.');
    });

    test('obsługa kliknięcia w element HTML', () => {
        document.body.innerHTML = `
            <button data-statystyka="siła">Rzut Siła</button>
            <button data-statystyka="zręczność">Rzut Zręczność</button>
        `;
        ustawObslugeKlikniec();

        const przyciskSila = document.querySelector('[data-statystyka="siła"]');
        const przyciskZrecznosc = document.querySelector('[data-statystyka="zręczność"]');

        console.log = jest.fn(); 

        przyciskSila.click();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Wynik rzutu:'));

        przyciskZrecznosc.click();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Wynik rzutu:'));
    });
});
