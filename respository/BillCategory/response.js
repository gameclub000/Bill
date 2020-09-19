import provider from './provider';

export const parseResponse = (obj) => {
    return obj.map((item) => parseBillCategory(item));
};

export const parseBillCategory = (obj) => {
    const { id, type, name } = obj;
    return {
        id: String(id),
        type: Number(type),
        name: String(name)
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
