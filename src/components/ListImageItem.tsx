import React from 'react';

interface ListImageItemProps {
    name: string;
    onSelectImg: VoidFunction;
}

export function ListImageItem({
    name,
    onSelectImg,
}: ListImageItemProps) {
    return (
        <li>
            <button onClick={onSelectImg} type="button">
                {name}
            </button>
        </li>
    );
}