import React, { useEffect, useState } from 'react';
import { htmlContentGenerator } from "./menuAR";
import { getEscenasPorUsuarioId, getEscenaObjetosPorEscenaId, getUrlPorId, updateRepo } from "./api";
import './escenasStyle.css';


function SelectEscena({ selectHandleClick }) {
    return (
        <button className="select-escena-button" onClick={selectHandleClick}>
            Cargar Escena
        </button>
    );
}


function Escena({escena, selectHandleClick}) {

    return (
        <div className="escenas-container">
            <h3 className="escenas-title">{escena.descripcion}</h3>
            <SelectEscena selectHandleClick={selectHandleClick} />
        </div>
    );
}

function EscenasList({ Escenas, selectHandleClick }) {
    const listSize = Escenas.length;
    let heading = 'No hay escenas guardadas';
    if (listSize > 0) {
        const noun = listSize > 1 ? 'escenas' : 'escena';
        heading = `${listSize} ${noun} Guardadas`;
    }

    return (
        <div className="escena-list-container">
            <h2 className="list-container-heading">{heading}</h2>
            {Escenas.map((escena, index) => (
                <div key={escena.id} className={`list-item${index === Escenas.length - 1 ? ' last-item' : ''}`}>
                    <Escena escena={escena} selectHandleClick={() => selectHandleClick(escena)} />
                </div>
            ))}
        </div>
    );
}

function EscenasGuardadasFunctionality() {
    const userId = parseInt(localStorage.getItem('userId'));
    const [escenaData, setEscenaData] = useState([]);
    const [htmlContent, setHtmlContent] = useState('');
    const [escenaList, setEscenaList] = useState([]);

    useEffect(() => {
        async function fetchEscenas() {
            const data = await getEscenasPorUsuarioId(userId);
            setEscenaData(data);
        }

        fetchEscenas();
    }, [userId]);

    useEffect(() => {
        const nuevaLista = escenaData.map(({ id, descripcion }) => ({ id, descripcion }));
        setEscenaList(nuevaLista);
    }, [escenaData]);

    useEffect(() => {
        if (htmlContent) {
            console.log('Actualizando el archivo HTML:', htmlContent);
            const filePath = 'generated_AR_scene.html';
            updateRepo(filePath, htmlContent)
                .then(() => alert('¡AR Scene actualizada y enviada a GitHub!'))
                .catch((error) => console.error('Error al actualizar GitHub:', error));
        }
    }, [htmlContent]);

    async function selectHandleClick(escena) {
        const escenaObjetos = await getEscenaObjetosPorEscenaId(escena.id);
        const objarray = [];

        for (let i = 0; i < escenaObjetos.length; i++) {
            try {
                const objetoUrl = await getUrlPorId(escenaObjetos[i].objeto_id);
                objarray.push({ obj: objetoUrl.obj, mtl: objetoUrl.mtl, scale: escenaObjetos[i].scale });
            } catch (error) {
                console.error('Error al obtener el url:', error);
            }
        }


        const generatedHtml = htmlContentGenerator(objarray);
        console.log('Contenido HTML generado:', generatedHtml);
        setHtmlContent(generatedHtml);
    }

    return (
        <div className="escenas-guardadas">
            <EscenasList Escenas={escenaList} selectHandleClick={selectHandleClick} />
        </div>
    );
}

function EscenasGuardadas() {
    return <EscenasGuardadasFunctionality />;
}

export default EscenasGuardadas;
