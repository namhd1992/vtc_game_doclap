
const user = JSON.parse(localStorage.getItem("user"));
const base_url='http://171.244.11.133:8088';
const instance = axios.create({
    baseURL: 'http://171.244.11.133:8088',
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+user.access_token}
});