import { api } from '../services/api';

export async function syncCart(localCartItems, token) {
    try {
        await api.post('/cart/sync', {
            items: localCartItems
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch(err => console.error(err));
    } catch (err) {
        console.error(err);
        return null;
    }
}