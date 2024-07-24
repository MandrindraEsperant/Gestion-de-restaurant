import React from 'react'
import './ajoutReservation.css'
import { FaWindowClose } from 'react-icons/fa'

function AjoutReservation() {
  return (
    <div className=' wrapperPopUp'>
        <div className="ajoutReservation  bg-gray-700  rounded">
            <div className="head bg-gray-900">
                <h1>Ajout reservation</h1> <FaWindowClose />
            </div>
            <form action="" className=' '>
                <div className="wrapperCol flex gap-3">
                    <div className="cols">
                       <div className="rows">
                         <label htmlFor="">Table </label>
                         <input type="text"  />
                       </div>
                       <div className="rows">
                         <label htmlFor="">Date</label>
                         <input type="date"  />
                      </div>
                    </div>

                  <div className="cols">
                      <div className="rows">
                          <label htmlFor="">Dure</label>
                          <input type="date"  />
                      </div>
                      <div className="rows">
                          <label htmlFor="">Nom</label>
                          <input type="text"  />
                      </div>
                  </div>
                </div>
               <button className=' rounded bg-gray-950' type='submit'>Enregistrer</button>
            </form>
        </div>
    </div>
  )
}

export default AjoutReservation