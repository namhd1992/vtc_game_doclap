
const user = JSON.parse(localStorage.getItem("user"));
const instance = axios.create({
    baseURL: 'https://xxx.com/api/',
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+user.access_token}
});