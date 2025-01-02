//Test uruchamiany w Gitbash uzywając: npx jest
const Przedmiot = require('./Item');

describe('Przedmiot', () => {
    describe('Konstruktor', () => {
        it('powinien poprawnie przypisać wartości do pól', () => {
            const przedmiot = new Przedmiot(1, 'Miecz', 'Bron', ['ostry', 'stalowy'], 'Miecz bojowy');

            expect(przedmiot.itemID).toBe(1);
            expect(przedmiot.itemName).toBe('Miecz');
            expect(przedmiot.itemType).toBe('Bron');
            expect(przedmiot.itemAttributes).toEqual(['ostry', 'stalowy']);
            expect(przedmiot.itemDesc).toBe('Miecz bojowy');
        });
    });

    describe('Metoda create', () => {
        it('powinna utworzyć poprawny obiekt Przedmiot, jeśli wszystkie parametry są prawidłowe', () => {
            const przedmiotData = {
                itemID: 2,
                itemName: 'Tarcza',
                itemType: 'Zbroja',
                itemAttributes: ['ciężka', 'drewniana'],
                itemDesc: 'Solidna tarcza obronna'
            };

            const przedmiot = Przedmiot.create(przedmiotData);

            expect(przedmiot).toBeInstanceOf(Przedmiot);
            expect(przedmiot.itemID).toBe(2);
            expect(przedmiot.itemName).toBe('Tarcza');
            expect(przedmiot.itemType).toBe('Zbroja');
            expect(przedmiot.itemAttributes).toEqual(['ciężka', 'drewniana']);
            expect(przedmiot.itemDesc).toBe('Solidna tarcza obronna');
        });

        it('powinna rzucić błąd, jeśli któregokolwiek parametru brakuje', () => {
            const invalidData = {
                itemID: 3,
                itemName: 'Łuk',
                itemType: 'Bron',
                itemAttributes: null,
                itemDesc: 'Lekki łuk myśliwski'
            };

            expect(() => Przedmiot.create(invalidData)).toThrow(
                'Błąd podczas tworzenia Przedmiotu -> nieodpowiednio wypełnione wszystkie parametry'
            );
        });

        it('powinna rzucić błąd, jeśli itemAttributes nie jest tablicą', () => {
            const invalidData = {
                itemID: 4,
                itemName: 'Młot',
                itemType: 'Bron',
                itemAttributes: 'ciężki',
                itemDesc: 'Potężny młot bojowy'
            };

            expect(() => Przedmiot.create(invalidData)).toThrow('Atrybuty muszą być tablicą');
        });
    });

    describe('Metoda getDescription', () => {
        it('powinna zwrócić poprawny opis przedmiotu', () => {
            const przedmiot = new Przedmiot(5, 'Hełm', 'Zbroja', ['metalowy', 'wytrzymały'], 'Hełm rycerski');

            const description = przedmiot.getDescription();

            expect(description).toBe(
                'ID: 5, Przedmiot: Hełm, Typ: Zbroja, Atrybuty: ["metalowy","wytrzymały"], \nDesc: Hełm rycerski'
            );
        });
    });
});
