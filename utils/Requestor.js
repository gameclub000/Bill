import axios from 'axios';

class Requestor {
    fetch = axios.get;
}

export const requestor = new Requestor();
