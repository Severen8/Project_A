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

    
}