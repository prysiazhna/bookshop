import React from 'react';
import bannerImage from '../assets/banner.jpg';

const Banner: React.FC = () => {
    return (
        <div className="relative bg-cover bg-center flex items-center justify-center mb-6">
            <img src={bannerImage} alt="Sale" className="w-full shadow-lg" />
        </div>
    );
};

export default Banner;
