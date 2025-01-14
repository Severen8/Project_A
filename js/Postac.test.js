
const   Postac   = require('./Postac.js');
const { Kostka } = require('./Kostka.js');
const Przedmiot = require('./Item.js');
const  Cecha = require('./Trait.js');
const WynikRzutu = require('./WynikRzut.js');
const RzutKoscmi = require('./Rzut.js');
describe('Postac', () => {
    let postac;
    const defaultAtrybuty = new Map([
        ["siła", Kostka.stworzKostke(4)],
        ["zręczność", Kostka.stworzKostke(4)],
        ["wigor", Kostka.stworzKostke(4)],
        ["spryt", Kostka.stworzKostke(4)],
        ["duch", Kostka.stworzKostke(4)],
    ]);
    const defaultUmiejetnosci = new Map([
        ["Przekonywanie", Kostka.stworzKostke(4, -2)],
        ["Skradanie", Kostka.stworzKostke(4, -2)],
        ["Spostrzegawczość", Kostka.stworzKostke(4, -2)],
        ["Wiedza ogólna", Kostka.stworzKostke(4, -2)],
        ["Wysportowanie", Kostka.stworzKostke(4, -2)],
        ["Odwaga", Kostka.stworzKostke(4, -2)],
        ["Zastraszanie", Kostka.stworzKostke(4, -2)],
        ["Wyszukiwanie", Kostka.stworzKostke(4, -2)],
        ["Wypytywanie", Kostka.stworzKostke(4, -2)],
        ["Hazard", Kostka.stworzKostke(4, -2)],
        ["Wiedza (Język)", Kostka.stworzKostke(4, -2)],
        ["Rzucanie", Kostka.stworzKostke(4, -2)],
        ["Walka", Kostka.stworzKostke(4, -2)],
        ["Reperowanie", Kostka.stworzKostke(4, -2)],
        ["Strzelanie", Kostka.stworzKostke(4, -2)],
        ["Leczenie", Kostka.stworzKostke(4, -2)],
        ["Włamywanie", Kostka.stworzKostke(4, -2)],
        ["Sterowanie Pojazdami", Kostka.stworzKostke(4, -2)],
        ["Tropienie", Kostka.stworzKostke(4, -2)],
    ]);
    beforeEach(() => {
        console.log(new Postac("Testowa Postac", "Opis testowy", defaultAtrybuty, defaultUmiejetnosci) instanceof Postac);
         postac = Postac.stworzPostac("Testowa Postac", "Opis testowy", new Map(), new Map());
    });

     test('Powinien tworzyć postać z domyślnymi wartościami', () => {
        expect(postac.imie).toBe("Testowa Postac");
        expect(postac.opis).toBe("Opis testowy");
        expect(postac.fuksy).toBe(3);
        expect(postac.zloto).toBe(0);
        expect(postac.exp).toBe(0);
        expect(postac.dostepnyExp).toBe(0);
         expect(postac.figura).toBe(true);

       expect(postac.atrybutyKeys()).toEqual(
            ["siła","zręczność","wigor","spryt","duch"]);
            expect(postac.umiejetnosciKeys()).toEqual([
                   "Przekonywanie",
                  "Skradanie"
                ,"Spostrzegawczość"
                ,"Wiedza ogólna"
                ,"Wysportowanie"
                ,"Odwaga"
                ,"Zastraszanie"
                ,"Wyszukiwanie"
                ,"Wypytywanie"
                ,"Hazard"
                ,"Wiedza (Język)"
                ,"Rzucanie"
                ,"Walka"
                ,"Reperowanie"
                ,"Strzelanie"
                ,"Leczenie"
                ,"Włamywanie"
                ,"Sterowanie Pojazdami"
                ,"Tropienie"
            ]);

    });
     test('Powinien tworzyć postać z domyślnymi atrybutami', () => {
         const postac = Postac.stworzPostac("Testowa Postac", "Opis testowy");
        expect(postac.atrybutyKeys()).toEqual(
            ["siła","zręczność","wigor","spryt","duch"]);
            expect(postac.umiejetnosciKeys()).toEqual([
                "Przekonywanie",
                  "Skradanie"
                ,"Spostrzegawczość"
                ,"Wiedza ogólna"
                ,"Wysportowanie"
                ,"Odwaga"
                ,"Zastraszanie"
                ,"Wyszukiwanie"
                ,"Wypytywanie"
                ,"Hazard"
                ,"Wiedza (Język)"
                ,"Rzucanie"
                ,"Walka"
                ,"Reperowanie"
                ,"Strzelanie"
                ,"Leczenie"
                ,"Włamywanie"
                ,"Sterowanie Pojazdami"
                ,"Tropienie"
            ]);
    });
     test('Powinien tworzyć postać z podanymi wartościami', () => {
        const atrybuty = new Map([
            ["siła", Kostka.stworzKostke(6)],
            ["zręczność", Kostka.stworzKostke(8)]
        ]);
       const umiejetnosci = new Map([
            ["Walka", Kostka.stworzKostke(8)],
            ["Skradanie", Kostka.stworzKostke(4)]
        ]);
        const postac = Postac.stworzPostac("Testowa Postac", "Opis testowy", atrybuty,umiejetnosci);

        expect(postac.atrybut("siła").IloscScian).toBe(6);
         expect(postac.atrybut("zręczność").IloscScian).toBe(8);
        expect(postac.umiejetnosc("Walka").IloscScian).toBe(8);
       expect(postac.umiejetnosc("Skradanie").IloscScian).toBe(4);
    });
     test('Powinien zwracać null gdy imię jest nieprawidłowe', () => {
         expect(Postac.stworzPostac(null, "Opis testowy", defaultAtrybuty,defaultUmiejetnosci)).toBeNull();
        expect(Postac.stworzPostac(undefined, "Opis testowy", defaultAtrybuty,defaultUmiejetnosci)).toBeNull();
    });


    test('Powinien poprawnie używać fuksa', () => {
        expect(postac.fuksy).toBe(3);
        expect(postac.uzyjFuksa()).toBe(true);
         expect(postac.fuksy).toBe(2);
        expect(postac.uzyjFuksa()).toBe(true);
         expect(postac.fuksy).toBe(1);
         expect(postac.uzyjFuksa()).toBe(true);
         expect(postac.fuksy).toBe(0);
         expect(postac.uzyjFuksa()).toBe(false);
         expect(postac.fuksy).toBe(0);

    });
      test('Powinien poprawnie ustawiać i pobierać fuksy', () => {
         postac.fuksy = 2;
        expect(postac.fuksy).toBe(2);
    });
        test('Powinien poprawnie ustawiać i pobierać złoto', () => {
         postac.zloto = 20;
        expect(postac.zloto).toBe(20);
    });
         test('Powinien poprawnie pobierać atrybut', () => {
        expect(postac.atrybut("siła").IloscScian).toBe(4)
         expect(postac.atrybut("nie ma")).toBe(null);
    });

        test('Powinien poprawnie dodawać doświadczenie', () => {
        expect(postac.exp).toBe(0);
         expect(postac.dostepnyExp).toBe(0);
        postac.dodajExp(10);
         expect(postac.exp).toBe(10);
         expect(postac.dostepnyExp).toBe(10);
            postac.dodajExp(5);
          expect(postac.exp).toBe(15);
         expect(postac.dostepnyExp).toBe(15);
    });
          test('Powinien poprawnie dodawać złoto', () => {
        expect(postac.zloto).toBe(0);
        postac.dodajZloto(10);
         expect(postac.zloto).toBe(10);
            postac.dodajZloto(5);
           expect(postac.zloto).toBe(15);
    });
          test('Powinien poprawnie obliczać fuksy max', () => {
               expect(postac.fuksyMax).toBe(3);
               const przedmiot = new Przedmiot(1,"Zbroja", "zbroja", {"fuksy":1});
             postac.dodajPrzedmiot(przedmiot);
            expect(postac.fuksyMax).toBe(4);
            const cecha = new Cecha("Fuks", {"fuksy":2}, "Brak opisu");
             postac.dodajCeche(cecha);
              expect(postac.fuksyMax).toBe(6);
    });

       test('Powinien poprawnie obliczać obronę', () => {
            expect(postac.obrona).toBe(2 + Math.floor(defaultUmiejetnosci.get("Walka").IloscScian/2));
             const umiejetnosci = new Map([
            ["Walka", Kostka.stworzKostke(8)],
        ]);
         const postac2 = Postac.stworzPostac("Testowa Postac", "Opis testowy",defaultAtrybuty, umiejetnosci);
             expect(postac2.obrona).toBe(2 + Math.floor(umiejetnosci.get("Walka").IloscScian/2));

      });
          test('Powinien poprawnie obliczać wytrzymałość', () => {
         expect(postac.wytrzymalosc).toBe(2 + Math.floor(defaultAtrybuty.get("wigor").IloscScian/2));
       const atrybuty = new Map([
            ["wigor", Kostka.stworzKostke(8)],
        ]);
          const postac2 = Postac.stworzPostac("Testowa Postac", "Opis testowy",atrybuty, defaultUmiejetnosci);
             expect(postac2.wytrzymalosc).toBe(2 + Math.floor(atrybuty.get("wigor").IloscScian/2));
    });
     test('Powinien poprawnie obliczać wytrzymałość z pancerzem', () => {
        const przedmiot = new Przedmiot(1,"Zbroja", "zbroja", {"pancerz":2});
             postac.dodajPrzedmiot(przedmiot);
            expect(postac.wytrzymaloscPancerz).toBe(postac.wytrzymalosc + 2);
    });

     test('Powinien poprawnie zwracać poziom postaci', () => {
           expect(postac.poziom).toBe("Nowicjusz")
            postac.dodajExp(20);
            expect(postac.poziom).toBe("Doświadczony")
             postac.dodajExp(20);
            expect(postac.poziom).toBe("Weteran")
             postac.dodajExp(20);
           expect(postac.poziom).toBe("Heros")
            postac.dodajExp(20);
         expect(postac.poziom).toBe("Legendarny")
    });

     test('Powinien poprawnie dodawać przedmioty', () => {
        const przedmiot = new Przedmiot(1,"Zbroja", "zbroja", {"pancerz":2});
         postac.dodajPrzedmiot(przedmiot);
        expect(postac.eq).toHaveLength(1);
    });
       test('Powinien poprawnie dodawać cechy', () => {
        const cecha = new Cecha("Fuks", {"fuksy":2}, "Brak opisu");
         postac.dodajCeche(cecha);
        expect(postac.cechy).toHaveLength(1);
    });

    test('Powinien poprawnie dodawać obrażenia gdy postać nie jest w szoku', () => {
         const wynikRzutu = new WynikRzutu([1, 1, 3, 6],0, "true");
        postac.dodajObrazenia(wynikRzutu);
          expect(postac.rany).toBe(1);
         expect(postac.szok).toBe(true);
    });
     test('Powinien poprawnie dodawać obrażenia gdy postać jest w szoku', () => {
           const wynikRzutu = new WynikRzutu([1, 1, 3, 6],0, "true");
          postac.dodajObrazenia(wynikRzutu);
           const wynikRzutu2 = new WynikRzutu([1, 1, 3, 6],0, "true");
         postac.dodajObrazenia(wynikRzutu2);
          expect(postac.rany).toBe(3);
           expect(postac.szok).toBe(true);
    });
       test('Powinien poprawnie wyparowywać rany', () => {
           const wynikRzutu = new WynikRzutu([1, 1, 3, 6],0, "test");
            postac.dodajObrazenia(wynikRzutu);
              const wynikRzutu2 = new WynikRzutu([1, 1, 3, 6],0, "test");
            postac.dodajObrazenia(wynikRzutu2);
           expect(postac.rany).toBe(3);
        const mockRzut = jest.spyOn(RzutKoscmi,"stworzRzut").mockReturnValue({
        rzut: jest.fn().mockReturnValue({iloscSukcesow:()=>2})
        });
         expect(postac.wyparowywanieRan()).toBe(true);
           expect(postac.rany).toBe(1);
          mockRzut.mockRestore()
            const mockRzut2 = jest.spyOn(RzutKoscmi,"stworzRzut").mockReturnValue({
               rzut: jest.fn().mockReturnValue({iloscSukcesow:()=>1})
        });
           expect(postac.wyparowywanieRan()).toBe(true);
             expect(postac.rany).toBe(0);
                 expect(postac.szok).toBe(false);
                mockRzut2.mockRestore()
    });
     test('Powinien poprawnie sprawdzać czy można level up', () => {
        expect(postac.czyMoznaLevelUp()).toBe(false)
          postac.dodajExp(5);
             expect(postac.czyMoznaLevelUp()).toBe(true)
    });

   
    });