let API = {

    subscription:{
        save: async function(subscription){
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
            };

            console.log("Subscribing id: ",subscription);
            return fetch('/notification/register-new', options).then(res=>res.json());
        },
        delete: async function(subscription_id){
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };

            console.log("Unsubscribing id: ",subscription_id);
            return fetch('/notification/id/'+subscription_id, options).then(res=>res.json());
        }
    },
    mask:{
        getAll: async function(){
            const options = {
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            };
            
            return fetch('/mask/mask-count', options).then(res=>res.json());
        },
        delete: async function(id){
            const options = {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            };            
            return fetch('/mask/'+id, options).then(res=>res.json());
        },
        update: async function(id, status){
            const options = {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"status":status})
            } 
            return fetch('/mask/'+id, options).then(res=>res.json());
        }
    }
};

export default API;
