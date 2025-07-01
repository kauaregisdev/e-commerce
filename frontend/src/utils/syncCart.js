import { api } from '../services/api';

export async function syncCart(localCartItems, token) {
    try {
        const res = await api.post('/cart/sync', {
            items: localCartItems
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}