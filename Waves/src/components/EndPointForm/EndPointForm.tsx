import styles from './endPointForm.module.css'

export const EndPointForm = () => {
    return (
        <div className={styles.containerEndpoint}>
            <h3>
                Endpoints
            </h3>
            <div className={styles.containEndpointForm}>
                <div className={styles.typeEndpoint}>
                    <div>
                        <label htmlFor="Endpoint">Method</label>
                        <select name="endpoint" id="Endpoint">
                            <option value="get">GET</option>
                            <option value="porst">POST</option>
                            <option value="put">PUT</option>
                            <option value="delete">DELETE</option>
                            <option value="patch">PATCH</option>
                        </select>
                    </div>
                    <div className={styles.containPath}>
                        <label htmlFor="Path">Path</label>
                        <input type="text" name="path" id="Path" placeholder='/api/users'/>
                    </div>
                </div>
                <div className={styles.inputDescription}>
                    <label htmlFor="description">Description</label>
                    <input type="text" id='description' placeholder='Endpoint description'/>
                </div>
                <div>
                    <button type='button' onClick={()=>{console.log('Holaa')}} className={styles.btnAddEndpoint}>
                        Add Endpoint
                    </button>
                </div>
            </div>
        </div>
    )
}