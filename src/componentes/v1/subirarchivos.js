import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function SubirArchivos({ setArchivos, titulo, totalarchivos = 1 }) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: totalarchivos
    });
    
    useEffect(() => { setArchivos(acceptedFiles); }, [acceptedFiles])

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>{titulo}</p>
            </div>
            <aside>
                <ul>{acceptedFileItems}</ul>
            </aside>
        </section>
    );
}

