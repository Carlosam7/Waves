import styles from './boxDialog.module.css'
import type { BoxDialogProp } from '../../lib/types';


export const BoxDialog = ({dialogRef}: BoxDialogProp) => {
    
    const closeDialog = () => {
        dialogRef.current?.close();
    };
    return (
        
            <dialog ref={dialogRef} className={styles.dialog}>
                <div className={styles.containDialog}>
                    <header>
                        <h2>Create a Microservice</h2>
                        <button className={styles.btnCloseDialog} onClick={closeDialog}> close </button>
                    </header>
                    <div>
                        <p>Complete microservice information and his EndPoints</p>
                    </div>

                    <form action="">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id='name' type="text" placeholder='User Authentication Service'/>
                        </div>
                        <div>
                            <label htmlFor="Description">Description</label>
                            <textarea id='Description' placeholder='Describe microservice functionality'/>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="Lenguage">Lenguage</label>
                                <select name="selLenguage" id="Lenguage">
                                    <option value="Python">Python</option>
                                    <option value="Python">JS</option>
                                    <option value="Python">C#</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="State">State</label>
                                <select name="selState" id="State">
                                    <option value="Python">Active</option>
                                    <option value="Python">Inactive</option>
                                    <option value="Python">Error</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="Urlb">URL base</label>
                                <input id='Urlb' type="text" placeholder='https://api.example.com'/>
                            </div>
                            <div>
                                <label htmlFor="Version">Versión</label>
                                <input type="text" placeholder='1.0.0'/>
                            </div>
                        </div>
                        <div>
                            Aquí va el componente de Tags
                        </div>
                        <div>
                            Aquí va el componente de Endpoints
                        </div>

                        <div>
                            <button>Cancel</button>
                            <button>Create</button>
                        </div>
                    </form>
                </div>
            </dialog>
        
    )
}