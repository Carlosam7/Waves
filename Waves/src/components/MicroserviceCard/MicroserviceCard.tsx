import { useTheme } from "../../context/ThemeContext";
import  styles  from "./microserviceCard.module.css"

import type { Microservice } from "../../lib/types";
import { useEffect, useRef, useState } from "react";
import { BoxDialogEdit } from "../BoxDialogEdit/BoxDialogEdit";
import { updateService } from "../../hooks/updateService";
import { getStatusService } from "../../hooks/getStatusService";

interface MicroserviceCardProps {
    service: Microservice
    onDelete: (routhName: string) => void
    onViewEndpoints: (service: Microservice) => void
}

export function MicroserviceCard ({ service, onDelete, onViewEndpoints } : MicroserviceCardProps) {
    const dialogEdit: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement>(null);
    const statusColor = {
        Active: 'linear-gradient(90deg, #5B5EE2 0%, #7376FF 100%)',
        Inactive: 'linear-gradient(90deg, #202020 0%, #505050 100%)',
        Error: 'linear-gradient(90deg, #FF5B5B 0%, #FF7373 100%)'

    }
    const [ getStatus, setGetStatus ] = useState<'Active' | 'Inactive' | 'Error'>('Active');

    const [infoService, setInfoService] = useState(service);
    const [activeFunction, setActiveFunction] = useState(false);
    const openDialog = () => {
        dialogEdit.current?.showModal();
    };

    useEffect(() => {
        const fetchStatus = async () => {
            const state: any = await getStatusService(service.routeName);
            service.status = state;
            setGetStatus(state);
        }
        fetchStatus()
    }, [])

    useEffect(() => {
        if (activeFunction){
            updateService(infoService, service.routeName)
            dialogEdit.current?.close();dialogEdit.current?.close();
            setActiveFunction(false)
        }
    },[activeFunction])

    const iconLenguage = {
        python: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48"> 
                    <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
                </svg>,
                
        js:     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
                </svg>,
        csharp: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#635399" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd"></path><path fill="#9179E4" fillRule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clipRule="evenodd"></path><path fill="#585074" fillRule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M34 20H35V28H34zM37 20H38V28H37z" clipRule="evenodd"></path><path fill="#fff" fillRule="evenodd" d="M32 25H40V26H32zM32 22H40V23H32z" clipRule="evenodd"></path>
                </svg>
    }
    return (
        <div className={`${styles.containerCard}`}>
            <main className={styles.content}>
                <section>
                    <div className={styles.headCard}>
                        <div>
                            <h3>{service.routeName}</h3>
                            <button style={{ background: statusColor[getStatus], color: "white"}}>    {getStatus}    </button>
                        </div>
                        <p>     {service.description}   </p>
                    </div>

                    <div className={`${styles.tagsCard}`}>
                        <div className={`${styles.tagLanguage}`}>
                            { service.language === "Python" ? iconLenguage.python :
                            service.language === "JS" ? iconLenguage.js :
                            service.language === "C#" ? iconLenguage.csharp : null
                            }
                            { service.language }
                        </div>
                        {/* { service.tags.map((tag) => (
                            <div key={tag}>
                                { tag }
                            </div>
                        ))} */}
                    </div>
                </section>

                <section className={`${styles.footCard}`}>
                    <div className={styles.pathService}>
                        <img src={`${useTheme().theme==='dark' ? '/icons/icon-url.png' : '/icons/icon-url-black.png'}`} alt="icono url" width={20} style={{userSelect: "none"}}/>
                        <span>http://localhost:3000/{ service.routeName }</span>
                    </div>

                    <div className={styles.btnsCard}>
                        <button className={`${styles.btnViewEndpoint}`} onClick={() => onViewEndpoints(service)}>
                            { Object.keys(service.endPoints).length } Endpoints
                        </button>
                        <button className={styles.btnEdit} onClick={openDialog}>
                            <img src="/icons/icon-edit.png" alt="icono botón editar" width={20}/>
                        </button>
                        <button className={styles.btnDelete} onClick={() => onDelete(service.routeName)}>
                            <img src="/icons/icon-delete.png" alt="icono eliminar" width={20}/>
                        </button>
                    </div>
                </section>
            </main>
            <BoxDialogEdit  dialogRef={dialogEdit} 
                            data={infoService} 
                            setData={setInfoService} 
                            activeFunction={activeFunction} 
                            setActiveFunction={setActiveFunction} 
            />
        </div>
    )
}