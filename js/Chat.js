(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        // Node.js
        const Postacc = require('./Postac.js');
        const Kostka = require('./Kostka.js');
        const WynikRzutu = require('./WynikRzut.js');
        const Show = require('./Show.js');
        const RzutKoscmi = require('./Rzut.js').RzutKoscmi;
        module.exports = factory(Postac, Kostka, WynikRzutu, Show, RzutKoscmi);
    } else {
        // Przeglądarka
        global.Chat = factory(global.Postac, global.Kostka, global.WynikRzutu, global.Show, global. RzutKoscmi);
    }
})(this, function (Postac, Kostka, WynikRzutu, Show, RzutKoscmi) {

    const postac = Postac.stworzPostac(
        "Bohater",
        "Przykładowy opis postaci",
       new Map([["siła", Kostka.stworzKostke(6)], ["zręczność", Kostka.stworzKostke(8)], ["wigor", Kostka.stworzKostke(4)], ["spryt", Kostka.stworzKostke(4)]]), // Atrybuty
        new Map([["walka", Kostka.stworzKostke(10)], ["skradanie", Kostka.stworzKostke(6)]]), // Umiejętności
        [], // Ekwipunek
        true, // Figura
        [], // Cechy
        20, // Exp
        5, // Dostępny Exp
        50 // Złoto
    );

    function obsluzKomende(komenda) {
         try {
            if (komenda.startsWith('/r ')) {
                const argument = komenda.slice(3).trim().toLowerCase();

                // Obsługa rzutu kostką (np. "2d8+3")
                const rzucenieKoscia = argument.match(/^(\d+)d(\d+)([+-]\d+)?$/);
                if (rzucenieKoscia) {
                    const [, iloscKosci, iloscScian, modyfikator] = rzucenieKoscia;
                    const mod = parseInt(modyfikator || 0)

                    const kosci = Array.from({ length: parseInt(iloscKosci) }, () => new RzutKoscmi([{ IloscScian: parseInt(iloscScian) }], false, mod));

                    const wynik = kosci.map(kosc => kosc.rzut());
                    return `Wynik rzutu: ${wynik.map(w => w.wynikKosciAtrybutu?.reduce((a, b) => a + b, 0)).join(", ")}`;
                }
                 const rzutNaKosc = argument.match(/^d(\d+)([+-]\d+)?$/)
                if(rzutNaKosc)
                {
                 const [, iloscScian, modyfikator] = rzutNaKosc;
                    const mod = parseInt(modyfikator || 0)
                   const kosc =  new RzutKoscmi([{ IloscScian: parseInt(iloscScian) }], false, mod)
                    const wynik = kosc.rzut();
                    return `Wynik rzutu: ${wynik.wynikKosciAtrybutu?.reduce((a, b) => a+b,0)}`;
                }
                // Obsługa wyświetlania szczegółów postaci
                 if (argument === "show") {
                    if (postac) {
                        const postacDiv = document.getElementById('postac-info'); // Załóżmy, że masz element z id 'postac-info'
                        Show.showPostac(postac, postacDiv);
                        return `Informacje o postaci zostały wyświetlone w elemencie #postac-info.`;
                    }
                    return "Błąd: Postać nie została zainicjalizowana.";
                }


                return `Nieznana komenda: ${argument}`;
            }
            return `Wiadomość: ${komenda}`;
        } catch (error) {
            return `Błąd: ${error.message}`;
        }
    }
   // Funkcja do obsługi kliknięcia w element HTML z atrybutami
    function ustawObslugeKlikniec() {
        document.querySelectorAll("[data-statystyka]").forEach(element => {
            element.addEventListener("click", () => {
                let komenda
                if(postac?.atrybuty?.has(element.dataset.statystyka))
                {
                    const iloscScian = postac.atrybuty.get(element.dataset.statystyka).IloscScian;
                     console.log(obsluzKomende(`/r d${iloscScian}`));
                } else if (postac?.umiejetnosci?.has(element.dataset.statystyka))
                {
                    const iloscScian = postac.umiejetnosci.get(element.dataset.statystyka).IloscScian;
                     console.log(obsluzKomende(`/r d${iloscScian}`));
                }
               
            });
        });
    }

    // Automatyczna inicjalizacja w przeglądarce
    if (typeof window !== "undefined") {
        document.addEventListener("DOMContentLoaded", () => {
            ustawObslugeKlikniec();
            // Inicjalizacja showPostac po załadowaniu strony
        });
    }


    return {
        obsluzKomende,
        ustawObslugeKlikniec
    };
});