"use client"
import './recu.css'
import React from 'react'
import data from './recu.json'
import {useReactToPrint , ReactToPrint} from "react-to-print"

function Recu() {

    const ref = React.createRef();

    const generatePdf= useReactToPrint({
      content: ()=>ref.current,
      documentTitle: 'Buletin de paie',
      onAfterPrint:()=>alert('Pdf a été creé avec succès')
    })
  return (
    <div className='containerPdf'>
         <div className="pdf" ref={ref}>
              <div className="head">
                <div>
                    <h1 className=' '>AvyMona</h1>
                    <p className=' '>N° Commande : C001</p>
                </div>
              </div>
              <div className="infoCli">
                <p>Nom du client : Mandrindra</p>
                <p>Table : 009</p>
              </div>
              <div className="aboutTwo">
                <p>Votre facture en détail</p>
                <table>
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>PU(Ar)</th>
                            <th>Unité</th>
                            <th>Total(Ar)</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data.map((d , i)=>  <tr key={i}>
                            <td>{d.menu}</td>
                            <td>{d.pu}</td>
                            <td>{d.poulet}</td>
                            <td>{d.pu*d.poulet}</td>
                        </tr>)}
                    </tbody>
                </table>
              </div>
              
              <p className=' '>TOTAL : 224000 Ar</p>
               
         </div>

        
         <ReactToPrint
            trigger={()=>
                <button className=' btnPdf bg-gray-950 p-1 text-white' 
              >Imprimer</button>
            }
            content={()=>ref.current}
            pageStyle="@page {size:auto; margin: 20mm} @media print {body {-webkit-print-color-adjust: exact;}}"
         />
    </div>
  )
}

export default Recu