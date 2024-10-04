import React from "react";

interface BookCoverProps {
    img?: string | null;
    imgPreview?: string | null;
    title: string;
    className?: string;
    placeholderImg?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ img, imgPreview, title, className, placeholderImg }) => {
    const classes = `object-cover ${className}`;
    const imageUrl = imgPreview || (img ? `${process.env.REACT_APP_API_BASE_URL}${img}` : null);

    return imageUrl ? (
        <img
            src={imageUrl}
            alt={title}
            className={classes}
        />
    ) : (
        <div className={`flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 ${className}`}>
            <span>No image</span>
        </div>
    );
};

export default BookCover;
