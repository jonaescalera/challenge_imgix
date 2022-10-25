import { ImgAPI } from "../hooks/useFetchImages";
import { ListImageItem } from "./ListImageItem";


interface ListImageProps {
    list: ImgAPI[];
    onSelectItem: (item: ImgAPI) => void;
}

export function ListImage({
    list,
    onSelectItem,
}: ListImageProps) {
    if (list.length === 0) {
        return <>loading</>;
    }

    return (
        <ol>
            {list.map((d) => {
                return (
                    <ListImageItem
                        key={d.name}
                        name={d.name}
                        onSelectImg={() => onSelectItem(d)}
                    />
                )
            })}
        </ol>
    );
}