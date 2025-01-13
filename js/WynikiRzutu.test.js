const WynikRzutu = require('./WynikRzut.js'); 

describe('WynikRzutu', () => {
  describe('constructor', () => {
    it('should create a WynikRzutu object with valid parameters', () => {
      const wynik = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2, 2], 6);
      expect(wynik.wynikKosciAtrybutu).toEqual([3, 4, 5]);
      expect(wynik.wynikCałosciowyAtrybutu).toBe(14);
      expect(wynik.wynikKosciFigury).toEqual([2,2]);
      expect(wynik.wynikCałościowyFigury).toBe(6);
      expect(wynik.modyfikator).toBe(2);
      expect(wynik.opis).toBe('Test rzutu');
        expect(wynik.trudnoscRzutu).toBe(6);
    });

      it('should default trudnoscRzutu to 4 if not specified', () => {
        const wynik = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2, 2]);
        expect(wynik.trudnoscRzutu).toBe(4);
      });


    it('should handle non-number values in wynikKosciFigury by ignoring them', () => {
         const wynik = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2,'a', 2]);
         expect(wynik.wynikKosciFigury).toEqual([2,'a',2]);
        expect(wynik.wynikCałościowyFigury).toBe(0);
    });

    it('should handle non-number values in wynikKosciAtrybutu by ignoring them', () => {
        const wynik = new WynikRzutu([3,'a', 5], 2, 'Test rzutu', [2, 2]);
        expect(wynik.wynikKosciAtrybutu).toEqual([3,'a',5]);
        expect(wynik.wynikCałosciowyAtrybutu).toBe(10);
    });
    it('should throw an error if wynikKosciFigury is not an array', () => {
        expect(() => new WynikRzutu([3, 4, 5], 2, 'Test rzutu', 1)).toThrowError('Wynik musi być tablicą liczb.');
    });
     it('should throw an error if wynikKosciAtrybutu is not an array', () => {
         expect(() => new WynikRzutu(1, 2, 'Test rzutu', [2,2])).toThrowError('Wynik kości musi być tablicą liczb.');
     });
    it('should throw an error if modyfikator is not a number', () => {
         expect(() => new WynikRzutu([3, 4, 5], 'a', 'Test rzutu', [2,2])).toThrowError('Modyfikator musi byc liczba');
     });
    it('should throw an error if opis is not a string', () => {
         expect(() => new WynikRzutu([3, 4, 5], 2, 123, [2,2])).toThrowError('Opis musi byc stringiem');
     });
       it('should throw an error if trudnoscRzutu is not a positive number', () => {
           expect(() => new WynikRzutu([3, 4, 5], 2, 'Test', [2,2], 0)).toThrowError('Trudnosc rzutu musi byc liczba dodatnia');
           expect(() => new WynikRzutu([3, 4, 5], 2, 'Test', [2,2], -1)).toThrowError('Trudnosc rzutu musi byc liczba dodatnia');
           expect(() => new WynikRzutu([3, 4, 5], 2, 'Test', [2,2], 'a')).toThrowError('Trudnosc rzutu musi byc liczba dodatnia');
       });

  });
  describe('czyZdanę', () => {
      it('should return true if wynikCałościowyAtrybutu is greater or equal to trudnoscRzutu', () => {
          const wynik = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2,2], 6);
          expect(wynik.czyZdanę()).toBe(true);
      });
      it('should return true if wynikCałościowyFigury is greater or equal to trudnoscRzutu when bigger than wynikCałościowyAtrybutu', () => {
          const wynik = new WynikRzutu([3, 4, 1], 2, 'Test rzutu', [2,2, 10], 6);
           expect(wynik.czyZdanę()).toBe(true);
      });
      it('should return false if both are smaller than trudnoscRzutu', () => {
          const wynik = new WynikRzutu([1, 2, 1], 0, 'Test rzutu', [1,2], 6);
          expect(wynik.czyZdanę()).toBe(false);
      });
      it('should return false if only wynikCałościowyAtrybutu is smaller than trudnoscRzutu', () => {
          const wynik = new WynikRzutu([1, 2, 1], 1, 'Test rzutu', [2,2], 6);
          expect(wynik.czyZdanę()).toBe(false);
      });
        it('should return false if only wynikCałościowyFigury is smaller than trudnoscRzutu', () => {
          const wynik = new WynikRzutu([3, 5, 1], -4, 'Test rzutu', [1,1], 6);
          expect(wynik.czyZdanę()).toBe(false);
      });
  });
  describe('iloscSukcesow', () => {
    it('should return the correct number of successes based on wynikCałosciowyAtrybutu when bigger than wynikCałościowyFigury', () => {
      const wynik = new WynikRzutu([4, 4, 4, 4], 0, 'Test rzutu', [1,1], 4);
      expect(wynik.iloscSukcesow()).toBe(4);

        const wynik2 = new WynikRzutu([4, 4, 4, 4], 0, 'Test rzutu', [1,1], 5);
        expect(wynik2.iloscSukcesow()).toBe(3);
    });

      it('should return the correct number of successes based on wynikCałościowyFigury when bigger than wynikCałościowyAtrybutu', () => {
          const wynik = new WynikRzutu([1,1], 0, 'Test rzutu', [4,4,4,4], 4);
          expect(wynik.iloscSukcesow()).toBe(4);
            const wynik2 = new WynikRzutu([1,1], 0, 'Test rzutu', [4,4,4,4], 5);
             expect(wynik2.iloscSukcesow()).toBe(3);
      });

    it('should return 0 if result is smaller than difficulty', () => {
        const wynik = new WynikRzutu([1, 2, 1], 0, 'Test rzutu', [1, 1], 6);
        expect(wynik.iloscSukcesow()).toBe(0);

      const wynik2 = new WynikRzutu([1, 1], 0, 'Test rzutu', [1, 1, 1], 6);
      expect(wynik2.iloscSukcesow()).toBe(0);
    });
  });
    describe('iloscPrzebic', () => {
        it('should return the correct number of przebic', () => {
            const wynik = new WynikRzutu([4, 4, 4, 4], 0, 'Test rzutu', [1,1], 4);
            expect(wynik.iloscPrzebic()).toBe(3);

             const wynik2 = new WynikRzutu([1,1], 0, 'Test rzutu', [4,4,4,4], 4);
            expect(wynik2.iloscPrzebic()).toBe(3);
        });
        it('should return 0 if no przebic', () => {
            const wynik = new WynikRzutu([4, 4, 4], 0, 'Test rzutu', [1, 1], 4);
            expect(wynik.iloscPrzebic()).toBe(2);

            const wynik2 = new WynikRzutu([1,1], 0, 'Test rzutu', [4,4,4], 4);
            expect(wynik2.iloscPrzebic()).toBe(2);

            const wynik3 = new WynikRzutu([1, 2, 1], 0, 'Test rzutu', [1, 1], 6);
           expect(wynik3.iloscPrzebic()).toBe(0);
             const wynik4 = new WynikRzutu([1, 1], 0, 'Test rzutu', [1, 2, 1], 6);
            expect(wynik4.iloscPrzebic()).toBe(0);
        });
    });
    describe('toString', () => {
        it('should return a string that represents the object', () => {
            const wynik = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2, 2], 6);
            const expectedString = `Wynik Rzutu:
        Wynik Kości Atrybutu: 3,4,5
        Wynik Całościowy Atrybutu: 14
        Wynik Kości Figury: 2,2
        Wynik Całościowy Figury: 6
        Modyfikator: 2
        Opis: Test rzutu
        Trudność Rzutu: 6
        Czy Jest Figura: true
        Ilość Sukcesów: 3
        Ilość Przebić: 2`;
          expect(wynik.toString()).toBe(expectedString);

          const wynik2 = new WynikRzutu([3, 4, 5], 2, 'Test rzutu', [2,'a', 2], 6);
          const expectedString2 = `Wynik Rzutu:
        Wynik Kości Atrybutu: 3,4,5
        Wynik Całościowy Atrybutu: 14
        Wynik Kości Figury: 2,a,2
        Wynik Całościowy Figury: 6
        Modyfikator: 2
        Opis: Test rzutu
        Trudność Rzutu: 6
        Czy Jest Figura: false
        Ilość Sukcesów: 3
        Ilość Przebić: 2`;
           expect(wynik2.toString()).toBe(expectedString2);
        });
    });
});