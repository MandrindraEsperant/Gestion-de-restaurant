import React from 'react'
import './ajoutTable.css'
import { FaWindowClose } from 'react-icons/fa'
function AjoutTable() {
  return (

    <div className='wrapperPopUp'>
         <div className="formAjoutTable bg-gray-700  rounded">
            <div className="head bg-gray-900"><h1>ajouter un table</h1> <FaWindowClose /></div>
            <form action="">
                
                <div className="rows">
                    <label htmlFor="">Designation:</label>
                    <input type="text" name="" id="" />
                </div>
                <button className=' rounded bg-gray-950' type='submit'>Enregistrer</button>
            </form>
         </div>
    </div>
  )
}

export default AjoutTable