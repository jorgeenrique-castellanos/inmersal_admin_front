import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
//import Dropzone from 'react-dropzone';
/* import toastr from 'toastr';
import { post } from 'axios'; */

export default function Accept(props) {
  const [imagenes, SetImagenes] = useState([]);


  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop: guardarArchivos,
    accept: 'image/jpeg, image/png'
  });


  function guardarArchivos(archivos) {
    const nuevoArregloDeImagenes = _.uniqBy(imagenes.concat(archivos), 'path');
    SetImagenes(nuevoArregloDeImagenes);
  }

  function borrarArchivo(path) {
    const nuevoArregloDeImagenes = imagenes.filter((file) => file.path != path);
    SetImagenes(nuevoArregloDeImagenes);
  }

  const acceptedFileItems = imagenes.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes   
      <button onClick={()=>borrarArchivo(file.path)}>borrar</button>
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}
