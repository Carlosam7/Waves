import  styles  from "./microserviceCard.module.css"

import type { Microservice } from "../../lib/types";

interface MicroserviceCardProps {
    service: Microservice
    onEdit: (service: Microservice) => void
    onDelete: (service: Microservice) => void
    onViewEndpoints: (service: Microservice) => void
}

export function MicroserviceCard ({ service, onEdit, onDelete, onViewEndpoints } : MicroserviceCardProps) {
    const statusColor = {
        active: 'linear-gradient(90deg, #5B5EE2 0%, #7376FF 100%)',
        inactive: 'linear-gradient(90deg, #202020 0%, #505050 100%)',
        error: 'linear-gradient(90deg, #FF5B5B 0%, #FF7373 100%)'

    }

    const iconLenguage = {
        python: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48"> 
                    <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
                </svg>,
                
        js:     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
                </svg>,
        csharp: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#9179e4" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M25,2c-0.71484,0 -1.42969,0.17969 -2.06641,0.53906l-16.84375,9.46484c-1.28906,0.72266 -2.08984,2.07813 -2.08984,3.53125v18.92969c0,1.45313 0.80078,2.80859 2.08984,3.53125l16.84375,9.46484c0.63672,0.35938 1.35156,0.53906 2.06641,0.53906c0.71484,0 1.42969,-0.17969 2.06641,-0.53906l16.84375,-9.46094c1.28906,-0.72656 2.08984,-2.08203 2.08984,-3.53516v-18.92969c0,-1.45312 -0.80078,-2.80859 -2.08984,-3.53125l-16.84375,-9.46484c-0.63672,-0.35937 -1.35156,-0.53906 -2.06641,-0.53906zM25,13c3.78125,0 7.27734,1.75391 9.54297,4.73828l-4.38281,2.53906c-1.31641,-1.44141 -3.1875,-2.27734 -5.16016,-2.27734c-3.85937,0 -7,3.14063 -7,7c0,3.85938 3.14063,7 7,7c1.97266,0 3.84375,-0.83594 5.16016,-2.27734l4.38281,2.53906c-2.26562,2.98438 -5.76172,4.73828 -9.54297,4.73828c-6.61719,0 -12,-5.38281 -12,-12c0,-6.61719 5.38281,-12 12,-12zM35,20h2v2h2v-2h2v2h2v2h-2v2h2v2h-2v2h-2v-2h-2v2h-2v-2h-2v-2h2v-2h-2v-2h2zM37,24v2h2v-2z"></path></g></g>
                </svg>
    }
    return (
        <div className={`${styles.containerCard}`}>
            <main className={styles.content}>
                <section>
                    <div className={styles.headCard}>
                        <div>
                            <h3>{service.name}</h3>
                            <button style={{ background: statusColor[service.status], color: "white"}}>    {service.status}    </button>
                        </div>
                        <p>     {service.description}   </p>
                    </div>

                    <div className={`${styles.tagsCard}`}>
                        <div className={`${styles.tagLanguage}`}>
                            { service.lenguage === "python" ? iconLenguage.python :
                            service.lenguage === "javascript" ? iconLenguage.js :
                            service.lenguage === "c#" ? iconLenguage.csharp : null
                            }
                            { service.lenguage }
                        </div>
                        <div>
                            { service.version }
                        </div>
                        { service.tags.map((tag) => (
                            <div key={tag}>
                                { tag }
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`${styles.footCard}`}>
                    <div className={styles.pathService}>
                        <img src="src/assets/icons/icon-url-black.png" alt="" width={20} style={{userSelect: "none"}}/>
                        <span>{ service.baseUrl }</span>
                    </div>

                    <div className={styles.btnsCard}>
                        <button className={`${styles.btnViewEndpoint}`} onClick={() => onViewEndpoints(service)}>
                            { service.endpoints.length } Endpoints
                        </button>
                        <button className={styles.btnEdit} onClick={() => onEdit(service)}>
                            <img src="src/assets/icons/icon-edit.png" alt="" width={20}/>
                        </button>
                        <button className={styles.btnDelete} onClick={() => onDelete(service)}>
                            <img src="src/assets/icons/icon-delete.png" alt="" width={20}/>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}