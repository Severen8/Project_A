(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        // Node.js
        module.exports = factory(
            require('./Kostka'), 
            require('./WynikRzut')
        );
    } else {
        // Przeglądarka
        global.Chat = factory(global.Kostka, global.WynikRzutu);
    }
})(this, function (Kostka, WynikRzutu) {
    const postac = {
        sila: 15,
        zrecznosc: 12,
    };

    function obsluzKomende(komenda) {
        try {
            if (komenda.startsWith('/r ')) {
                const argument = komenda.slice(3).trim().toLowerCase();

                const rzucenieKoscia = argument.match(/^(\d+)d(\d+)([+-]\d+)?$/);
                if (rzucenieKoscia) {
                    const [, iloscKosci, iloscScian, modyfikator] = rzucenieKoscia;
                    const kostka = new Kostka(parseInt(iloscScian), parseInt(modyfikator || 0));
                    const wyniki = Array.from({ length: parseInt(iloscKosci) }, () =>
                        Math.floor(Math.random() * kostka.IloscScian) + 1 + kostka.Modyfikator
                    );

                    const wynik = new WynikRzutu(
                        wyniki,
                        0,
                        `Rzut ${iloscKosci}d${iloscScian}${modyfikator || ''}`,
                        [],
                        4
                    );

                    return wynik.toString();
                }

                const rzutNaStatystyke = argument.match(/^([a-z]+) d(\d+)([+-]\d+)?$/);
                if (rzutNaStatystyke) {
                    const [, statystyka, iloscScian, modyfikator] = rzutNaStatystyke;
                    const wartoscStatystyki = postac[statystyka];

                    if (wartoscStatystyki === undefined) {
                        return `Nieznana statystyka: ${statystyka}`;
                    }

                    const kostka = new Kostka(parseInt(iloscScian), parseInt(modyfikator || 0));
                    const wynikKosci = [
                        Math.floor(Math.random() * kostka.IloscScian) + 1 + kostka.Modyfikator,
                    ];

                    const wynik = new WynikRzutu(
                        wynikKosci,
                        wartoscStatystyki,
                        `Rzut na ${statystyka}`,
                        [],
                        4
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

    return {
        obsluzKomende,
    };
});
