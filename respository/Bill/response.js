import provider from './provider';

export const parseResponse = (obj) => {
    return obj.map((item) => parseBill(item));
};

export const parseBill = (obj) => {
    const key = `${new Date().getTime()}-${Math.random()}`;
    const { time, type, category, amount } = obj;
    return {
        time: Number(time),
        type: Number(type),
        category: String(category),
        amount: Number(amount),
        key
    };
};

const response = () =>
    new Promise((resolve, reject) => {
        provider()
            .then((response) => {
                if (response.status === 200) {
                    try {
                        const result = parseResponse(response.data);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(response);
                }
            })
            .catch((error) => reject(error));
    });

export default response;
