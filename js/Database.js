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
            throw error; // Rethrow the error for the caller to handle
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

    static async loadSingleUser(id) {
        try {
            const user = await Database.getUser(id); // Zmień ID na rzeczywiste
            console.log('User:', user);
            // Wyświetl dane
        } catch (error) {
            console.error('Failed to load single user:', error);
        }
    }
    
    static async loadSingleItem(id) {
         try {
            const item = await Database.getItem(id); // Zmień ID na rzeczywiste
            console.log('Item: ', item)
             //Wyświetl dane
        }
        catch (error){
             console.error('Failed to load single item: ', error)
        }
    }
    
    
    static async loadSingleCharacter(id) {
      try {
        const character = await Database.getCharacter(id);
        console.log('Character:', character);
      } catch(error) {
        console.error('Failed to load single character:', error);
      }
    }
    static async loadCharactersByCampaign(id) {
        try{
            const characters = await Database.getCharactersByCampaign(id);
            console.log('Characters: ', characters);
        }
        catch(error){
             console.error('Failed to load characters by campaign: ', error);
        }
    }
    
    static async loadCharactersByUser(id){
         try {
             const characters = await Database.getCharactersByUser(id);
             console.log('Characters: ', characters);
         }
         catch(error){
             console.error('Failed to load characters by user: ', error);
         }
    }

    static async loadSingleCampaign(id) {
        try {
            const campaign = await Database.getCampaign(id);
            console.log('Campaign:', campaign);
        } catch (error) {
            console.error('Failed to load single campaign:', error);
        }
    }
    
    static async loadChatMessages(params = {}) {
        try {
            const chatMessages = await Database.getChatMessages(params);
            console.log('Chat Messages:', chatMessages);
        } catch (error) {
            console.error('Failed to load chat messages:', error);
        }
    }

    static async loadChatMessageByCampaign(id) {
        try {
            const chatMessages = await Database.getChatMessagebyCampain(id);
            console.log('Chat Messages:', chatMessages);
        } catch (error) {
            console.error('Failed to load chat messages:', error);
        }
    }

    static async fetchCharactersByUser(idGracza) {
        try {
            const charactersData = await Database.fetchData('api', { action: 'getCharactersByUser', idGracza });
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
            const characterData = await Database.fetchData('api', { action: 'getCharacter', id });
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
            const userData = await Database.fetchData('api', { action: 'getUser', id });
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
            const charactersData = await Database.fetchData('api', { action: 'getCharactersByCampaign', idKampanii });
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
            const campaignData = await Database.fetchData('api', { action: 'getCampaign', id });
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
            const chatMessagesData = await Database.fetchData('api', { action: 'getChatMessages', idUzytkownika });
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
            const chatMessagesData = await Database.fetchData('api', { action: 'getChatMessagesByCampaign', idKampanii });
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
            const itemData = await Database.fetchData('api', { action: 'getItem', id });
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
    
}