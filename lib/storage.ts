export interface User {
  phone: string;
  dob: string;
  address: string;
  fullName: string;
  email: string;
}

export interface Order {
  orderId: string;
  items: any[];
  totalAmount: number;
  deliveryDate: string;
  status: string;
  address: string;
  dateCreated: string;
}

export const saveUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_profile', JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('user_profile');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const saveOrder = (order: Order) => {
  if (typeof window !== 'undefined') {
    const existingOrders = getOrders();
    existingOrders.push(order);
    localStorage.setItem('user_orders', JSON.stringify(existingOrders));
  }
};

export const getOrders = (): Order[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('user_orders');
    return data ? JSON.parse(data) : [];
  }
  return [];
};
