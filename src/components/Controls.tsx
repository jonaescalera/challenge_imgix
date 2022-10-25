import React, { useLayoutEffect } from "react";
import className from 'classnames';
import { ImgixList } from "./Imgix";
import './Controls.scss'

const css = {
    container: 'controls',
    header: 'controls-header',
    shadowContainer: 'controls-shadow',
    bodyContainer: 'controls-shadow',
}

interface ControlsProps {
    open?: boolean;
    closePanel: VoidFunction;
}

export function Controls({
    open,
    closePanel,
}: ControlsProps): JSX.Element | null {
    const cssShadow = className(css.shadowContainer, {
        [`${css.shadowContainer}--open`]: open,
    });

    useLayoutEffect(() => {
        const onKeydown = function (e: KeyboardEvent) {
            if (e.key === 'Escape') {
                closePanel();
            }
        }

        document.addEventListener('keydown', onKeydown)

        return () => {
            document.removeEventListener('keydown', onKeydown)
        }
    }, [closePanel]);

    return (
        <section
            className={cssShadow}
            style={{ display: 'block' }}
            aria-label="controls">
            <div className={css.container}>
                <div className={css.header}>
                    <h2>add your props</h2>
                    <button
                        type="button"
                        aria-label="Close panel"
                        onClick={closePanel}
                    >
                        x
                    </button>
                </div>
                <div>
                    <ImgixList />
                </div>
            </div>
        </section>
    );
}