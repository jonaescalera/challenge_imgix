import React from "react";
import { ImgixListItemForm } from "./ImgixListItemForm";
import { useImgixListContext } from "./ImgixProvider";

export function ImgixList(): JSX.Element {
    const { imgixParams, paramAdded } = useImgixListContext();

    return (
        <ol>
            {
                Object.keys(paramAdded).map((k) => {
                    return (
                        <ImgixListItemForm
                            key={k}
                            selectedParam={k}
                            valueParam={paramAdded[k]}
                            params={imgixParams}
                        />
                    )
                })
            }
            <ImgixListItemForm
                params={imgixParams}
                resetValues
            />
        </ol>
    );
}