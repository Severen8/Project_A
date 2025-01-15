const Database = require('./Database');

global.fetch = jest.fn(); 

describe('Database', () => {
    beforeEach(() => {
        fetch.mockClear(); 
    });

    it('fetchData - powinno zwrócić poprawne dane', async () => {
        const mockResponse = { id: 1, name: 'Test' };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await Database.fetchData('getTest', { id: 1 });

        expect(fetch).toHaveBeenCalledWith('./getTest.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: 1 }),
        });
        expect(result).toEqual(mockResponse);
    });

    it('fetchData - powinno rzucić błąd przy odpowiedzi HTTP z błędem', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            text: async () => 'Not Found',
        });

        await expect(Database.fetchData('getTest', { id: 1 })).rejects.toThrow(
            'HTTP error! Status: 404, Message: Not Found'
        );
    });

    it('fetchData - powinno rzucić błąd przy problemie z siecią', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        await expect(Database.fetchData('getTest', { id: 1 })).rejects.toThrow('Network Error');
    });
});

describe('Database - Metody specyficzne', () => {
    it('getUsers - powinno wywołać fetchData z odpowiednimi argumentami', async () => {
        jest.spyOn(Database, 'fetchData').mockResolvedValueOnce([{ id: 1, name: 'User' }]);

        const result = await Database.getUsers();

        expect(Database.fetchData).toHaveBeenCalledWith('getUsers', {});
        expect(result).toEqual([{ id: 1, name: 'User' }]);
    });

    it('getUser - powinno wywołać fetchData z ID', async () => {
        jest.spyOn(Database, 'fetchData').mockResolvedValueOnce({ id: 1, name: 'User' });

        const result = await Database.getUser(1);

        expect(Database.fetchData).toHaveBeenCalledWith('getUser', { id: 1 });
        expect(result).toEqual({ id: 1, name: 'User' });
    });
});