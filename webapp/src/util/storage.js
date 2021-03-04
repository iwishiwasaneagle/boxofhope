let Storage = {
    getItem: function (key) {
        let item = localStorage.getItem(key);
        return JSON.parse(item, null);
    },
    setItem: function (key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: function (key) {
        return localStorage.removeItem(key);
    }
};

export default Storage;