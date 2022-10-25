import { useEffect, useState } from "react";

const url = 'https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json';

export interface ImgAPI {
    url: string;
    name: string;
}

/**
 * 
 * @returns 
 */
export function useFetchImages(): ImgAPI[] {
    const [imageList, setImageList] = useState<ImgAPI[]>();

    useEffect(() => {
        fetch(url).then(async (res) =>{
            const result = await res.json();
            setImageList(result);
        });
    }, []);

    return imageList || [];
}