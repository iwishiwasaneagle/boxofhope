const api_url = "http://"+(process.env.API_URL|| "jheraspi.local")+":"+(process.env.API_PORT|| 3001);

let API = {

    subscription:{
        save: async function(subscription){
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
            };

            console.log("Subscribing id: ",subscription);
            return fetch(api_url+'/notification/register-new', options).then(res=>res.json());
        },
        delete: async function(subscription_id){
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };

            console.log("Unsubscribing id: ",subscription_id);
            return fetch(api_url+'/notification/id/'+subscription_id, options).then(res=>res.json());
        }
    },
    mask:{
        getAll: async function(){
            const options = {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            };
            
            return fetch(api_url+'/mask/mask-count', options).then(res=>res.json());
        },
        delete: async function(id){
            const options = {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            };            
            return fetch(api_url+'/mask/'+id, options).then(res=>res.json());
        },
        update: async function(id, status){
            const options = {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"status":status})
            } 
            return fetch(api_url+'/mask/'+id, options).then(res=>res.json());
        }
    }
};

export default API;
