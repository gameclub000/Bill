import { requestor } from '@/utils/Requestor';

const provider = (parameter) =>
    new Promise((resolve, reject) => {
        requestor
            .fetch('/api/bill', { params: parameter })
            .then((result) => resolve(result))
            .catch((error) => {
                reject(error);
            });
    });

export default provider;
