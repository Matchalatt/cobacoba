export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Customer {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  totalSpent: number;
  joinDate: string;
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

export interface NavLink {
    name: string;
    path: string;
    icon: React.ElementType;
}

export interface GeneratedIdea {
    name: string;
    description: string;
    targetAudience: string;
    keyFeatures: string[];
}

export interface Notification {
  id: string;
  icon: React.ElementType;
  message: string;
  time: string;
  read: boolean;
}
