import React from 'react';

interface Column<T> {
    header: string;
    render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (item: T) => React.ReactNode;
}

const Table = <T extends unknown>({ data, columns, actions }: TableProps<T>) => {
    return (
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index} className="py-2 px-4 border-b text-left">
                        {column.header}
                    </th>
                ))}
                {actions && <th className="py-2 px-4 border-b text-left">Actions</th>}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex} className="py-2 px-4 border-b">
                            {column.render(item)}
                        </td>
                    ))}
                    {actions && <td className="py-2 px-4 border-b">{actions(item)}</td>}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
