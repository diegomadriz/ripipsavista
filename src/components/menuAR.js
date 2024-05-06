import React, {useState} from 'react';
import {useEffect} from 'react';
import '../style.css';
import {createEscenaObjeto, getUrlPorId, updateRepo, createEscena} from "./api";


//importar todas las imagenes
import cajonImage from '../images/cajon.png';
import canaleta1Image from '../images/canaleta1.png';
import canaleta2Image from '../images/canaleta2.png';
import endcapImage from '../images/endcap.png';
import levelingImage from '../images/leveling.png';
import mdfImage from '../images/mdf.png';
import mesaImage from '../images/mesa.png';
import mesaTrabajoImage from '../images/mesa de trabajo1.png';
import panelCajonImage from '../images/panelcajon.png';
import pieza1Image from '../images/pieza1.png';
import portamonitorImage from '../images/portamonitor.png';
import portascanerImage from '../images/portascaner.png';
import tapeteImage from '../images/tapete.png';

const objectsData = [
    { id: 0, image: cajonImage, title: 'Cajon', scaleX: 0.0018, scaleY: 0.0018, scaleZ: 0.0018 },
    { id: 1, image: canaleta1Image, title: 'Canaleta 1', scaleX: 0.002, scaleY: 0.002, scaleZ: 0.002 },
    { id: 2, image: canaleta2Image, title: 'Canaleta 2', scaleX: 0.0015, scaleY: 0.0015, scaleZ: 0.0015 },
    { id: 3, image: endcapImage, title: 'Endcap', scaleX: 0.02, scaleY: 0.02, scaleZ: 0.02 },
    { id: 4, image: levelingImage, title: 'Leveling', scaleX: 0.007, scaleY: 0.007, scaleZ: 0.007 },
    { id: 5, image: mdfImage, title: 'MDF', scaleX: 0.001, scaleY: 0.001, scaleZ: 0.001 },
    { id: 6, image: mesaImage, title: 'Mesa', scaleX: 0.0007, scaleY: 0.0007, scaleZ: 0.0007 },
    { id: 7, image: mesaTrabajoImage, title: 'Mesa de trabajo', scaleX: 0.0004, scaleY: 0.0004, scaleZ: 0.0004 },
    { id: 8, image: panelCajonImage, title: 'Panel cajon', scaleX: 0.001, scaleY: 0.001, scaleZ: 0.001 },
    { id: 9, image: pieza1Image, title: 'Pieza 1', scaleX: 0.01, scaleY: 0.01, scaleZ: 0.01 },
    { id: 10, image: portamonitorImage, title: 'Portamonitor', scaleX: 0.007, scaleY: 0.007, scaleZ: 0.007 },
    { id: 11, image: portascanerImage, title: 'Portascaner', scaleX: 0.008, scaleY: 0.008, scaleZ: 0.008 },
    { id: 12, image: tapeteImage, title: 'Tapete', scaleX: 0.0015, scaleY: 0.0015, scaleZ: 0.0015 },
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

function ARbuilder({arHandleClick}) {

    return (
        <button className="arbuilder-button" onClick={arHandleClick}>
            Construir Realidad Aumentada
        </button>
    )

}

function ExperimentarAR() {

    return (
        <div>
            <a href="https://generated-ar-scene.glitch.me/generated_AR_scene.html" target="_blank"
               rel="noopener noreferrer">
                <button className="go-ar-button">Experimentar AR</button>
            </a>
        </div>
    );
}

const htmlContentGenerator = (objarray) => {

    const assets = objarray.map((obj, index) => `
      <a-asset-item id="obj-model-${index}" src="${obj.obj}"></a-asset-item>
      <a-asset-item id="mtl-model-${index}" src="${obj.mtl}"></a-asset-item>
    `).join('\n');

    const models = objarray.map((obj, index) => `
      <a-obj-model id="model-${index}" src="#obj-model-${index}" mtl="#mtl-model-${index}" class="cube" mixin="cube" position="0 ${index+1} -2" scale="${obj.scale}" hoverable grabbable stretchable draggable droppable geometry=""></a-obj-model>
    `).join('\n');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Generated AR Scene</title>
          <script src="./scripts/aframe.min.js"></script>
          <script src="./scripts/aframe-extras.misc.min.js"></script>
          <script src="./scripts/super-hands.min.js"></script>
          <script src="./scripts/aframe-event-set-component.min.js"></script>
      </head>
      <body>
          <a-scene ar-mode="webxr">
              <a-assets>
                  ${assets}
                  <a-mixin id="pointer" raycaster="showLine: true; objects: .cube, a-link" super-hands="colliderEvent: raycaster-intersection;
                               colliderEventProperty: els;
                               colliderEndEvent:raycaster-intersection-cleared;
                               colliderEndEventProperty: clearedEls;">
                  </a-mixin>

                  <a-mixin id="controller-right" mixin="pointer" vive-controls="hand: right" oculus-touch-controls="hand: right" windows-motion-controls="hand: right" oculus-go-controls>
                  </a-mixin>

                  <a-mixin id="controller-left" mixin="pointer" vive-controls="hand: left" oculus-touch-controls="hand: left" windows-motion-controls="hand: left" oculus-go-controls>
                  </a-mixin>

                  <a-mixin id="cube" geometry="primitive: box; width: 0.5; height: 0.5; depth: 0.5" hoverable grabbable stretchable draggable droppable event-set__dragdrop="_event: drag-drop; geometry.primitive: sphere; geometry.radius: 0.25" event-set__hoveron="_event: hover-start; material.opacity: 0.7; transparent: true" event-set__hoveroff="_event: hover-end; material.opacity: 1; transparent: false" event-set__dragon="_event: dragover-start; material.wireframe: true" event-set__dragoff="_event: dragover-end; material.wireframe: false">
                  </a-mixin>
              </a-assets>
              <a-entity>
                  <a-entity id="rhand" mixin="pointer controller-right" line="" raycaster="" super-hands="" vive-controls="" oculus-touch-controls="" windows-motion-controls=""></a-entity>
                  <a-entity id="lhand" mixin="pointer controller-left" line="" raycaster="" super-hands="" vive-controls="" oculus-touch-controls="" windows-motion-controls=""></a-entity>
              </a-entity>
              ${models}
          </a-scene>
      </body>
      </html>
    `;
}

function ARsaver({saveHandleClick}) {
    return(
        <button className="arsaver-button" onClick={saveHandleClick}>
            Guardar Escena
        </button>

    )
}

function SelectionList({ selectedObjects, handleScaleChange }) {
    return (
        <div className={"selection-list-container"}>
            <h3>Objetos seleccionados: {selectedObjects.length}</h3>
            <ul>
                {selectedObjects.map((selectedObject, index) => (
                    <div key={selectedObject.id} className={`list-item${index === selectedObject.length - 1 ? ' last-item' : ''}`}>
                        {selectedObject.title}
                        <input className="input_escala" type="number"
                               value={selectedObject.MultiplierX}
                               onChange={(e) => handleScaleChange(index, 'MultiplierX', parseFloat(e.target.value))}
                               placeholder="X Multiplier" />
                        <input className="input_escala" type="number"
                               value={selectedObject.MultiplierY}
                               onChange={(e) => handleScaleChange(index, 'MultiplierY', parseFloat(e.target.value))}
                               placeholder="Y Multiplier" />
                        <input className="input_escala" type="number"
                               value={selectedObject.MultiplierZ}
                               onChange={(e) => handleScaleChange(index, 'MultiplierZ', parseFloat(e.target.value))}
                               placeholder="Z Multiplier" />
                    </div>
                ))}
            </ul>
        </div>
    );
}

function ARpageFunctionality() {
    const [selectedObjectsList, setSelectedObjectsList] = useState([]);
    const [htmlContent, setHtmlContent] = useState('');
    const [showButton, setShowButton] = useState(false);

    const userId = parseInt(localStorage.getItem('userId'));

    useEffect(() => {
        if (htmlContent) {
            console.log('Actualizando el archivo HTML:', htmlContent);
            const filePath = 'generated_AR_scene.html';
            updateRepo(filePath, htmlContent)
                .then(() => alert('¡AR Scene actualizada y enviada a GitHub!'))
                .catch((error) => console.error('Error al actualizar GitHub:', error));
        }
    }, [htmlContent]);

    function selectHandleClick(object) {
        if (!selectedObjectsList.some(item => item.id === object.id)) { // Verifica si el objeto ya está en la lista
            if (selectedObjectsList.length < 3) {
                const newobject = {id : object.id, title : object.title, scaleX : object.scaleX,
                    scaleY : object.scaleY, scaleZ : object.scaleZ, MultiplierX : 1,
                    MultiplierY : 1, MultiplierZ : 1};
                setSelectedObjectsList([...selectedObjectsList, newobject]);
                console.log(object.title + ' was selected');
            } else {
                alert('Has alcanzado el máximo número de objetos');
            }
        } else {
            alert('Un objeto solo puede ser seleccionado una vez.');
        }
    }

    async function arBuildHandleClick(event) {
        event.preventDefault();
        console.log('Building AR');
        console.log(selectedObjectsList);
        const objarray = [];

        if (selectedObjectsList.length > 0) {
            for (let i = 0; i < selectedObjectsList.length; i++) {
                try {
                    const response = await getUrlPorId(selectedObjectsList[i].id);
                    selectedObjectsList[i].scaleX = selectedObjectsList[i].scaleX * selectedObjectsList[i].MultiplierX;
                    selectedObjectsList[i].scaleY = selectedObjectsList[i].scaleY * selectedObjectsList[i].MultiplierY;
                    selectedObjectsList[i].scaleZ = selectedObjectsList[i].scaleZ * selectedObjectsList[i].MultiplierZ;
                    const scale = `${selectedObjectsList[i].scaleX} ${selectedObjectsList[i].scaleY} ${selectedObjectsList[i].scaleZ}`;
                    console.log(scale);
                    objarray.push({ obj: response.obj, mtl: response.mtl, scale: scale });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setShowButton(true);
            const generatedHtml = htmlContentGenerator(objarray);
            console.log('Contenido HTML generado:', generatedHtml);
            setHtmlContent(generatedHtml);
        } else {
            alert('No se han seleccionado objetos');
        }
    }


    const handleScaleChange = (index, key, value) => {
        const updatedObjects = [...selectedObjectsList];
        updatedObjects[index] = {
            ...updatedObjects[index],
            [key]: value, // Actualiza la propiedad específica
        };
        setSelectedObjectsList(updatedObjects); // Actualiza el estado
    };

    async function saveHandleClick(event) {
        event.preventDefault();
        console.log('Saving AR Scene');
        const descripcionbuilder = 'Escena con' + selectedObjectsList.map((obj) => obj.title).join(', ');

        try {
            const newEscenaID = await createEscena(userId, descripcionbuilder);
            for (let i = 0; i < selectedObjectsList.length; i++) {
                try {
                    await createEscenaObjeto(newEscenaID, selectedObjectsList[i].id, `0 ${i + 1} -1.5`,
                        `${selectedObjectsList[i].scaleX} ${selectedObjectsList[i].scaleY} ${selectedObjectsList[i].scaleZ}`, '0 0 0');
                    alert('Escena guardada con descripcion: ' + descripcionbuilder);
                } catch (error) {
                    console.error('Error creando EscenaObjeto:', error);
                }
            }
        } catch (error) {
            console.error('Error creando Escena:', error);
        }
    }


    return (
        <div>
            <ObjectList Objects={objectsData} selectHandleClick={selectHandleClick} />
            <SelectionList selectedObjects={selectedObjectsList} handleScaleChange={handleScaleChange}/>
            <ARbuilder arHandleClick={arBuildHandleClick} />
            {showButton && <ExperimentarAR />}
            {showButton && <ARsaver saveHandleClick={saveHandleClick} />}
        </div>
    );
}


function ARpage() {
    return(
        <ARpageFunctionality/>
    )
}

export {htmlContentGenerator};

export default ARpage;