export interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

export const saveUser = (user: UserProfile) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rumes_user_profile', JSON.stringify(user));
  }
};

export const getUser = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('rumes_user_profile');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('rumes_cart');
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const addToCart = (item: any) => {
  if (typeof window !== 'undefined') {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem('rumes_cart', JSON.stringify(cart));
  }
};
