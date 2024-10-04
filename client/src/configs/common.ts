import {MenuItemsModel} from "../models/common.models";

export const MenuItems: MenuItemsModel[] = [
    { label: 'Special Offers', path: '/special-offers' },
    { label: 'New Books', path: '/new-books' },
    { label: 'Best Sellers', path: '/best-sellers' },
    // { label: 'Fiction', path: '/fiction' },
    // { label: 'Nonfiction', path: '/nonfiction' },
    // { label: 'Kids', path: '/kids' },
];

export const StockItemsConfig = [
    {value: 'true', label: 'In Stock'},
    {value: 'false', label: 'Out of Stock'},
];

export const SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
    ],
};

