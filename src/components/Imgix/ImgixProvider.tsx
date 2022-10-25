import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ImgixListContextType = Record<string, any>;

const ImgixListContext = React.createContext<ImgixListContextType>({});

export function useImgixListContext(): any {
    const value = useContext(ImgixListContext);
    return value;
}

interface ImgixListProviderProps {
    children?: ReactNode;
    updateUrl: (value: Record<string, string>) => void
}

export function ImgixListProvider({
    children,
    updateUrl,
}: ImgixListProviderProps): JSX.Element {
    const [imgixParams, setImgixParams] = useState<ImgixListContextType>({});
    const [paramAdded, setParamAdded] = useState<ImgixListContextType>({});

    useEffect(() => {
        // Dynamic module loading
        import('imgix-url-params/dist/parameters').then(({ parameters }) => {
            setImgixParams(parameters);
        })
    }, []);

    const confirm = useCallback((value: any) => {
        setParamAdded((prev) => {
            return {
                ...prev,
                ...value,
            }
        });
    }, []);

    const remove = useCallback((key: any) => {
        setParamAdded((prev) => {
            const newState = Object.assign({}, prev);
            delete newState[key];
            return newState;
        });
    }, []);

    const value = useMemo(() => {
        return {
            imgixParams,
            paramAdded,
            confirm,
            remove,
        }
    }, [imgixParams, paramAdded, confirm, remove]);

    useEffect(() => {
        if (Object.keys(paramAdded).length === 0) {
            return;
        }

        updateUrl(paramAdded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramAdded]);

    return (
        <ImgixListContext.Provider value={value}>
            {children}
        </ImgixListContext.Provider>
    )
}