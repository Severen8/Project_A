(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        module.exports = factory();
    } else {
        //(Przegladarka)
        global.Database = factory();
    }
})(this, function () {
class Database {
    static async fetchData(endpoint, params = {}) {
        try {
            const url = `./${endpoint}.php`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                 const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        }
    }


    static async getUsers(params = {}) {
        return await Database.fetchData('getUsers', params);
    }

      static async getUser(id) {
        return await Database.fetchData('getUser', { id: id });
    }


    static async getItems(params = {}) {
        return await Database.fetchData('getItems', params);
    }

   static async getItem(id) {
        return await Database.fetchData('getItem', {id: id});
    }


    static async getCampaigns(params = {}) {
          return await Database.fetchData('getCampaigns', params);
    }

    static async getCampaign(id) {
        return await Database.fetchData('getCampaign', {id: id});
    }

   static async getCharacters(params = {}) {
          return await Database.fetchData('getCharacters', params);
    }

   static async getCharacter(id){
        return await Database.fetchData('getCharacter', {id: id});
    }
     static async getCharactersByCampaign(idKampanii){
        return await Database.fetchData('getCharactersByCampaign', { idKampanii: idKampanii});
    }
   static async getCharactersByUser(idGracza){
        return await Database.fetchData('getCharactersByUser', { idGracza: idGracza});
    }

   static async getCechy(params = {}) {
          return await Database.fetchData('getCechy', params);
    }
    static async getCharacterTraits(params = {}) {
          return await Database.fetchData('getCharacterTraits', params);
    }
    static async getChatMessages(params = {}) {
        return await Database.fetchData('getChatMessages',params);
    }
    static async getChatMessagebyCampain(id) {
        return await Database.fetchData('getChatMessagebyCampain', {id: id});
    }

    static async fetchCharactersByUser(idGracza) {
        try {
            const charactersData = await Database.fetchData('PolaczenieBaza', { action: 'getCharactersByUser', idGracza });
            return charactersData.map(character => new Character(
                character.id, 
                character.idGracza,
                character.idKampanii,
                character.nazwa,
                character.staty,
                character.opis
            ));
        } catch (error) {
            console.error('Failed to fetch characters by user:', error);
            throw error;
        }
    }
    

    static async fetchCharacter(id) {
        try {
            const characterData = await Database.fetchData('PolaczenieBaza', { action: 'getCharacter', id });
            return new Character(
                characterData.id,
                characterData.idGracza,
                characterData.idKampanii,
                characterData.nazwa,
                characterData.staty,
                characterData.opis
            );
        } catch (error) {
            console.error('Failed to fetch character:', error);
            throw error;
        }
    }
    
    
    static async fetchUser(id) {
        try {
            const userData = await Database.fetchData('PolaczenieBaza', { action: 'getUser', id });
            return new User(
                userData.id,
                userData.nazwa,
                userData.typ,
                userData.email,
                userData.haslo
            );
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw error;
        }
    }
    

    static async fetchCharactersByCampaign(idKampanii) {
        try {
            const charactersData = await Database.fetchData('PolaczenieBaza', { action: 'getCharactersByCampaign', idKampanii });
            return charactersData.map(character => new Character(
                character.id,
                character.idGracza,
                character.idKampanii,
                character.nazwa,
                character.staty,
                character.opis
            ));
        } catch (error) {
            console.error('Failed to fetch characters by campaign:', error);
            throw error;
        }
    }
    

    static async fetchCampaign(id) {
        try {
            const campaignData = await Database.fetchData('PolaczenieBaza', { action: 'getCampaign', id });
            return new Campaign(
                campaignData.id,
                campaignData.idMG,
                campaignData.nazwa,
                campaignData.opis
            );
        } catch (error) {
            console.error('Failed to fetch campaign:', error);
            throw error;
        }
    }
    

    static async fetchChatMessages(idUzytkownika) {
        try {
            const chatMessagesData = await Database.fetchData('PolaczenieBaza', { action: 'getChatMessages', idUzytkownika });
            return chatMessagesData.map(message => new ChatMessage(
                message.id,
                message.idKampani,
                message.czas,
                message.idUrzytkownika,
                message.tresc
            ));
        } catch (error) {
            console.error('Failed to fetch chat messages:', error);
            throw error;
        }
    }
    

    static async fetchChatMessagesByCampaign(idKampanii) {
        try {
            const chatMessagesData = await Database.fetchData('PolaczenieBaza', { action: 'getChatMessagesByCampaign', idKampanii });
            return chatMessagesData.map(message => new ChatMessage(
                message.id,
                message.idKampani,
                message.czas,
                message.idUrzytkownika,
                message.tresc
            ));
        } catch (error) {
            console.error('Failed to fetch chat messages by campaign:', error);
            throw error;
        }
    }
    
    static async fetchItem(id) {
        try {
            const itemData = await Database.fetchData('PolaczenieBaza', { action: 'getItem', id });
            return new Item(
                itemData.id,
                itemData.typ,
                itemData.nazwa,
                itemData.opis,
                itemData.staty
            );
        } catch (error) {
            console.error('Failed to fetch item:', error);
            throw error;
        }
    }

    static async fetchCechy() {
        try {
            const cechyData = await Database.fetchData('PolaczenieBaza', { action: 'getCechy' });
            return cechyData.map(cecha => new Cechy(
                cecha.id,
                cecha.nazwa,
                cecha.opis
            ));
        } catch (error) {
            console.error('Failed to fetch cechy:', error);
            throw error;
        }
    }
    
    static async fetchCharacterTraits(idPostaci) {
        try {
            const traitsData = await Database.fetchData('PolaczenieBaza', { action: 'getCharacterTraits', idPostaci });
            return traitsData.map(trait => new CharacterTrait(
                trait.id,
                trait.name,
                trait.description
            ));
        } catch (error) {
            console.error('Failed to fetch character traits for postać ID:', idPostaci, error);
            throw error;
        }
    }
}   
return Database;});