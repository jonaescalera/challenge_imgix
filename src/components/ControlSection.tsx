import React, { useState } from "react";
import { Controls } from "./Controls";
import './Controls.scss'

export function ControlSection(): JSX.Element {
    const [open, setOpen] = useState<boolean | undefined>();

    return (
        <>
            <Controls
                open={open}
                closePanel={() => setOpen(false)}
            />
            <button onClick={() => setOpen(true)}>open prop panel</button>

        </>
    );
}