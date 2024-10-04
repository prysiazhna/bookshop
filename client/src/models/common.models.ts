export interface FormValues {
    email: string;
    username?: string;
    password: string;
}

export type FormErrors = {
    [key in keyof FormValues]?: string;
};

export type FormTouched = {
    [key in keyof FormValues]?: boolean;
};

export interface FormField {
    id: string;
    name: keyof FormValues;
    type: string;
    label: string;
    required: boolean;
}

export interface FormConfig {
    title: string;
    linkText: string;
    linkPath: string;
    linkDescription: string;
}

export interface Book {
    id: number;
    title: string;
    authorId: number;
    categoryIds: number[];
    price: number;
    stock: boolean;
    rating: number;
    img?: string;
    author?: Author;
}

export interface CartItem {
    book: Book;
    quantity: number;
}

export interface Author {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface MenuItemsModel {
    label: string;
    path: string;
}

