import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react';
import './style.css';
import {getEscenaObjetos,
    createEscenaObjeto,
    updateEscenaObjeto,
    deleteEscenaObjeto,
    getUrlPorId,
    getEscenaObjetosPorEscenaId} from "./components/api";


//importar todas las imagenes
import cajonImage from './images/cajon.png';
import canaleta1Image from './images/canaleta1.png';
import canaleta2Image from './images/canaleta2.png';
import endcapImage from './images/endcap.png';
import levelingImage from './images/leveling.png';
import mdfImage from './images/mdf.png';
import mesaImage from './images/mesa.png';
import mesaTrabajoImage from './images/mesa de trabajo1.png';
import panelCajonImage from './images/panelcajon.png';
import pieza1Image from './images/pieza1.png';
import portamonitorImage from './images/portamonitor.png';
import portascanerImage from './images/portascaner.png';
import tapeteImage from './images/tapete.png';

const objectsData = [
    {id: 0, image: cajonImage, title: 'Cajon',},
    {id: 1, image: canaleta1Image, title: 'Canaleta 1',},
    {id: 2, image: canaleta2Image, title: 'Canaleta 2',},
    {id: 3, image: endcapImage, title: 'Endcap',},
    {id: 4, image: levelingImage, title: 'Leveling',},
    {id: 5, image: mdfImage, title: 'MDF',},
    {id: 6, image: mesaImage, title: 'Mesa',},
    {id: 7, image: mesaTrabajoImage, title: 'Mesa de trabajo',},
    {id: 8, image: panelCajonImage, title: 'Panel cajon',},
    {id: 9, image: pieza1Image, title: 'Pieza 1',},
    {id: 10, image: portamonitorImage, title: 'Portamonitor',},
    {id: 11, image: portascanerImage, title: 'Portascaner',},
    {id: 12, image: tapeteImage, title: 'Tapete',},
];

function SelectObject({selectHandleClick}) {
    return (
        <button className="select-button" onClick={selectHandleClick}>
            Select
        </button>
    );
}

function Object({object, selectHandleClick}) {
    return (
        <div className="object-container">
            <img className="object-image" src={object.image} alt='Error al cargar imagen'/>
            <h3 className="object-title">{object.title}</h3>
            <SelectObject selectHandleClick={selectHandleClick}/>
        </div>
    );
}

function ObjectList({ Objects, selectHandleClick}) {

    const listSize = Objects.length;
    let heading = 'No objects';
    if (listSize > 0) {
        const noun = listSize > 1 ? 'productos' : 'producto';
        heading = listSize + ' ' + noun + ' Ripipsa disponibles:';
    }
    return (
        <section className="object-list-container">
            <h2 className="list-container-heading">{heading}</h2>
            {Objects.map((object, index) => (
                <div key={object.id} className={`list-item${index === Objects.length - 1 ? ' last-item' : ''}`}>
                    <Object object={object} selectHandleClick={() => selectHandleClick(object)}/>
                </div>
            ))}
        </section>

    );
}



function SelectionList({selectedObjects}){

    return (
        <div className={"selection-list-container"}><h3>Objetos seleccionados: {selectedObjects.length}</h3>
            <ul>
                {selectedObjects.map((selectedObject, index) => (
                    <div key={selectedObject.id} className={`list-item${index === selectedObject.length - 1 ? ' last-item' : ''}`}>{selectedObject.title}</div>
                ))}
            </ul>
        </div>
    );
}

function ARbuilder({arHandleClick}) {

    return (
        <button className="arbuilder-button" onClick={arHandleClick}>
            Construir Realidad Aumentada
        </button>
    )

}

function HTMLFileGenerator({ htmlContent }) {
    const encodedContent = encodeURIComponent(htmlContent);
    const dataUri = `data:text/html;charset=UTF-8,${encodedContent}`;

    const link = document.createElement('a');
    link.href = dataUri;
    link.download = 'generated_AR_scene.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return (
        <div>
            <a href={dataUri} target="_blank" rel="noopener noreferrer">
                <button id="go-ar-button">Experimentar AR</button>
            </a>
        </div>
    );
}

const htmlContentGenerator = (objarray) => {

    const assets = objarray.map((obj, index) => `
      <a-asset-item id="obj-model-${index}" src="${obj.obj}"></a-asset-item>
      <a-asset-item id="mtl-model-${index}" src="${obj.mtl}"></a-asset-item>
    `).join('\n');

    const models = objarray.map((_, index) => `
      <a-obj-model id="model-${index}" src="#obj-model-${index}" mtl="#mtl-model-${index}" position="-2 ${index+1} -12" scale="0.01 0.01 0.01"></a-obj-model>
    `).join('\n');

    const generatedHtmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Generated AR Scene</title>
          <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
          <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.misc.min.js"></script>
          <script src="https://unpkg.com/super-hands@^3.0.3/dist/super-hands.min.js"></script>
      </head>
      <body>
          <a-scene>
              <a-assets>
                  ${assets}
              </a-assets>
              <a-entity>
                  <a-camera id="camera" look-controls></a-camera>
                  <a-entity sphere-collider="objects: a-obj-model" super-hands hand-controls="hand: left"></a-entity>
                  <a-entity sphere-collider="objects: a-obj-model" super-hands hand-controls="hand: right"></a-entity>
              </a-entity>
              ${models}
          </a-scene>
      </body>
      </html>
    `;

    const htmlContent = generatedHtmlContent;

    return htmlContent;
}

function ARpageFunctionality() {

    const [selectedObjectsList, setSelectedObjectsList] = useState([]);
    const [count, setCount] = useState(0);
    const [htmlContent, setHtmlContent] = useState('');

    const [showButton, setShowButton] = useState(false);

    function selectHandleClick(object) {
        if (count < 3) {
            setSelectedObjectsList([...selectedObjectsList, object]);
            setCount(count + 1);
            console.log(object.title + ' was selected');
        } else {
            alert('You have reached the maximum amount of objects. \n ' +
                'Build the AR or reload the page to start over.');
        }

    }


    const objarray = [];

    async function arHandleClick(event) {
        event.preventDefault();
        console.log('Building AR');


        for (let i = 0; i < selectedObjectsList.length; i++) {
            try {
                const response = await getUrlPorId(selectedObjectsList[i].id);
                objarray.push({obj: response.obj, mtl: response.mtl});
                console.log(objarray[i].obj);
                console.log(objarray[i].mtl);
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        }
        if(count>0){
            setShowButton(true);
        }

        setHtmlContent(htmlContentGenerator(objarray));
    }


    return (
        <div><ObjectList Objects={objectsData} selectHandleClick={selectHandleClick}/>
            <SelectionList selectedObjects={selectedObjectsList} count={count}/><ARbuilder arHandleClick={arHandleClick}/>
            {showButton && <HTMLFileGenerator htmlContent={htmlContent}/>}
        </div>
    )
}

export function ARpage() {
    return(
        <ARpageFunctionality/>
    )
}