import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditorComponent = ({ language, onChange, code }) => {

    const handleResizeObserver = () => {
        // editor.focus();
        // Save a reference to the original ResizeObserver
        const OriginalResizeObserver = window.ResizeObserver;

        // Create a new ResizeObserver constructor
        window.ResizeObserver = function (callback) {
            const wrappedCallback = (entries, observer) => {
                window.requestAnimationFrame(() => {
                    callback(entries, observer);
                });
            };

            // Create an instance of the original ResizeObserver
            // with the wrapped callback
            return new OriginalResizeObserver(wrappedCallback);
        };

        // Copy over static methods, if any
        for (let staticMethod in OriginalResizeObserver) {
            if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
                window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
            }
        }
    };

    useEffect(() => {
        handleResizeObserver()
    }, [])

    return (
        <div className="monaco-editor-container">

            <Editor
                height="50vh"
                value={code}
                language={language}
                defaultValue={"// some comment"}
                onChange={onChange}
            />
        </div>
    );
};

export default MonacoEditorComponent;
