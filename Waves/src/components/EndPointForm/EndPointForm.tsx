import { useState } from 'react';
import type { Endpoint, EndPointFormProps } from '../../lib/types'
import styles from './endPointForm.module.css'

export const EndPointForm = ({ data, setData }: EndPointFormProps) => {
    const [endpoint, setEndpoint] = useState<Endpoint>({method: 'GET', path: ''});
    
    const addEndpoint = () => {
        setData(prev => ({
            ...prev,
            endPoints: [...prev.endPoints, endpoint]
        }));
        setEndpoint({ "method": 'GET', "path": '' }); // limpiar campos
    }

    const deleteEndpoint = (index: number) => {
        const prevData = structuredClone(data);
        prevData.endPoints.splice(index, 1)
        setData(prevData)
    }

    return (
        <div className={styles.containerEndpoint}>
            <h3>
                Endpoints
            </h3>
            <div className={styles.containEndpointForm}>
                <div className={styles.typeEndpoint}>
                    <div>
                        <label htmlFor="Endpoint">Method</label>
                        <select name="method" id="Endpoint" 
                            value = {endpoint.method}
                            onChange = {(e) => setEndpoint(prev => ({...prev, "method": e.target.value} as Endpoint))}>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                            <option value="PATCH">PATCH</option>
                        </select>
                    </div>
                    <div className={styles.containPath}>
                        <label htmlFor="Path">Path</label>
                        <input type="text" name="path" id="Path" placeholder='/api/users'
                            value={endpoint.path}
                            onChange={(e) => setEndpoint(prev => ({...prev, "path": e.target.value} as Endpoint))}
                        />
                    </div>
                </div>

                { data.endPoints.length === 0 ? (null) :
                    (
                        data.endPoints.map ((endpoint, index) => (
                            <div key={`${index}`} className={styles.itemEndpoint}>
                                <h6 >{endpoint.method}</h6>
                                <button onClick={()=>deleteEndpoint(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10" viewBox="0,0,256,256">
                                        <g fill="#ff0040" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.12,5.12)"><path d="M7.71875,6.28125l-1.4375,1.4375l17.28125,17.28125l-17.28125,17.28125l1.4375,1.4375l17.28125,-17.28125l17.28125,17.28125l1.4375,-1.4375l-17.28125,-17.28125l17.28125,-17.28125l-1.4375,-1.4375l-17.28125,17.28125z"></path></g></g>
                                    </svg>
                                </button>
                            </div>
                        ))
                    )
                }
                <div>
                    <button type='button' onClick={addEndpoint} className={styles.btnAddEndpoint}>
                        Add Endpoint
                    </button>
                </div>
            </div>
        </div>
    )
}