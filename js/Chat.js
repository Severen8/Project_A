const Kostka = globalThis.Kostka; // Import klasy Kostka
const WynikRzutu = globalThis.WynikRzutu; // Import klasy WynikRzutu

// Statystyki postaci
const postac = {
    sila: 15,       // Wartość statystyki
    zrecznosc: 12,  // Wartość statystyki
};

function obsluzKomende(komenda) {
    try {
        if (komenda.startsWith('/r ')) {
            const argument = komenda.slice(3).trim().toLowerCase();

            // Obsługa rzutu kostką (np. "2d8+3")
            const rzucenieKoscia = argument.match(/^(\d+)d(\d+)([+-]\d+)?$/);
            if (rzucenieKoscia) {
                const [, iloscKosci, iloscScian, modyfikator] = rzucenieKoscia;

                // Tworzenie kostki i wykonywanie rzutu
                const kostka = new Kostka(parseInt(iloscScian), parseInt(modyfikator || 0));
                const wyniki = Array.from({ length: parseInt(iloscKosci) }, () =>
                    Math.floor(Math.random() * kostka.IloscScian) + 1 + kostka.Modyfikator
                );

                // Tworzenie wyniku rzutu
                const wynik = new WynikRzutu(
                    wyniki,
                    0,                         // Brak modyfikatora statystyki
                    `Rzut ${iloscKosci}d${iloscScian}${modyfikator || ''}`,
                    [],
                    4                          // Trudność rzutu
                );

                return wynik.toString();
            }

            // Obsługa rzutu na statystykę (np. "sila d20+3")
            const rzutNaStatystyke = argument.match(/^([a-z]+) d(\d+)([+-]\d+)?$/);
            if (rzutNaStatystyke) {
                const [, statystyka, iloscScian, modyfikator] = rzutNaStatystyke;
                const wartoscStatystyki = postac[statystyka];

                if (wartoscStatystyki === undefined) {
                    return `Nieznana statystyka: ${statystyka}`;
                }

                // Tworzenie kostki i wykonanie rzutu
                const kostka = new Kostka(parseInt(iloscScian), parseInt(modyfikator || 0));
                const wynikKosci = [
                    Math.floor(Math.random() * kostka.IloscScian) + 1 + kostka.Modyfikator,
                ];

                // Tworzenie wyniku rzutu
                const wynik = new WynikRzutu(
                    wynikKosci,
                    wartoscStatystyki,         // Wartość statystyki
                    `Rzut na ${statystyka}`,
                    [],
                    4                          // Trudność rzutu
                );

                return wynik.toString();
            }

            return `Nieznana komenda: ${argument}`;
        }
        return `Wiadomość: ${komenda}`;
    } catch (error) {
        return `Błąd: ${error.message}`;
    }
}

// Przykładowe użycie
const komunikaty = [
    'Cześć wszystkim!',
    '/r 2d8+3',
    '/r sila d20+3',
    '/r zrecznosc d8',
    '/r inteligencja d12', // Nieznana statystyka
];

komunikaty.forEach(komenda => {
    console.log(obsluzKomende(komenda));
});
