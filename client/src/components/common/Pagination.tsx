import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4">
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 mx-1 rounded ${
                        page === currentPage ? 'bg-purple-500 text-white' : 'bg-gray-300'
                    }`}>
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
// import React from 'react';
//
// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
// }
//
// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//     const generatePageNumbers = () => {
//         const pages = [];
//         const range = 2; // Range of pages to display around the current page
//
//         if (totalPages <= 5) {
//             // Show all pages if there are 5 or fewer
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i);
//             }
//         } else {
//             pages.push(1); // Always show the first page
//
//             if (currentPage > range + 2) {
//                 pages.push('...'); // Show ellipsis if the current page is far from the first page
//             }
//
//             // Add pages around the current page
//             for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
//                 pages.push(i);
//             }
//
//             if (currentPage < totalPages - range - 1) {
//                 pages.push('...'); // Show ellipsis if the current page is far from the last page
//             }
//
//             pages.push(totalPages); // Always show the last page
//         }
//
//         return pages;
//     };
//
//     const pages = generatePageNumbers();
//
//     return (
//         <div className="flex justify-center mt-4">
//             {pages.map((page, index) => (
//                 <button
//                     key={index}
//                     onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`px-3 py-1 mx-1 rounded ${
//                         page === currentPage ? 'bg-purple-500 text-white' : 'bg-gray-300'
//                     }`}
//                     disabled={typeof page !== 'number'}
//                 >
//                     {page}
//                 </button>
//             ))}
//         </div>
//     );
// };
//
// export default Pagination;

