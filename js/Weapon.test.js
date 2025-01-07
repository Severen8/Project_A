//Test uruchamiany w Gitbash uzywając: npx jest
const Przedmiot = require('./Item');
const Bron = require('./Weapon');

describe('Bron', () => {
    it('powinna dziedziczyć właściwości z klasy Przedmiot', () => {
        const bron = new Bron(1, 'Miecz', 'Weapon', ['ostry', 'stalowy'], 'Miecz bojowy', 5);

        expect(bron.itemID).toBe(1);
        expect(bron.itemName).toBe('Miecz');
        expect(bron.itemType).toBe('Weapon');
        expect(bron.itemAttributes).toEqual(['ostry', 'stalowy']);
        expect(bron.itemDesc).toBe('Miecz bojowy');
    });

    it('powinna wyświetlić poprawny komunikat, jeśli typ to "Weapon"', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        new Bron(2, 'Tarcza', 'Weapon', ['ciężka', 'drewniana'], 'Solidna tarcza', 1);
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Broń'));
        consoleSpy.mockRestore();
    });

    it('powinna wyświetlić poprawny komunikat, jeśli typ to nie "Weapon"', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        new Bron(3, 'Hełm', 'Armor', ['metalowy', 'wytrzymały'], 'Rycerski hełm');
        
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Inny Przedmiot'));
        consoleSpy.mockRestore();
    });
});