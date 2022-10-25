import React, { useCallback, useMemo, useState } from "react";
import { useImgixListContext } from "./ImgixProvider";

interface ImgixListItemFormProps {
    selectedParam?: string
    valueParam?: string
    resetValues?: boolean;
    params: Record<string, any>;
}

export function ImgixListItemForm({
    selectedParam = 'none',
    valueParam = '',
    resetValues,
    params,
}: ImgixListItemFormProps): JSX.Element | null {
    const { confirm, remove } = useImgixListContext();
    const [innerSelectedParam, setSelectedParam] = useState<string>(selectedParam);
    const [innerValueParam, setValueParam] = useState<string>(valueParam);

    const options = useMemo(() => {
        return Object
            .keys(params)
            .map((paramKey) => (
                <option value={paramKey} key={paramKey}>
                    {paramKey}
                </option>
            )
            );
    }, [params]);

    const onChange = useCallback(({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedParam(target.value);
        setValueParam('');
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (innerSelectedParam === 'none') {
            return;
        }

        confirm({ [innerSelectedParam]: innerValueParam });

        if (resetValues) {
            setSelectedParam('none');
            setValueParam('')
        }
    }, [innerSelectedParam, innerValueParam, resetValues, confirm]);

    const currentParam = useMemo(() => {
        if (!innerSelectedParam) {
            return undefined
        }

        return params[innerSelectedParam];
    }, [params, innerSelectedParam]);

    return (
        <li>
            <form
                onSubmit={onSubmit}
                title={currentParam?.short_description}>
                <select onChange={onChange} value={innerSelectedParam}>
                    <option value="none">select one</option>
                    {options}
                </select>
                <input
                    type="text"
                    value={innerValueParam}
                    onChange={({ target }) => setValueParam(target.value)}
                    placeholder={currentParam?.display_name} />
                <button
                    type="button"
                    onMouseDown={() => {
                        if (innerSelectedParam !== 'none') {
                            remove(innerSelectedParam)
                        }
                    }}
                >-</button>
            </form>
        </li>
    );
}