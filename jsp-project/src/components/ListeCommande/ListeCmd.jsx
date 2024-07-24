"use client"
import React, { useEffect, useState } from 'react'
import './listeCmd.css'
import { FaEdit, FaPen, FaPlusCircle, FaSearch, FaTrash, FaUserPlus } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
function ListeCmd() {
  const [com, setCom] = useState([]);
  const [vente, setVente] = useState([]);

  const getCom = async () => {
    try {
      const res = await fetch("http://localhost:8080/commande/");
      const data = await res.json();
      // console.log(data);
      setCom(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }
  const getVente = async () => {
    try {
      const res = await fetch("http://localhost:8080/vendu/getVenduDetails");
      const data = await res.json();
      // console.log(data);
      setVente(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }
const [client,setClient]=useState("");

  const chercherCli =(val)=>{
      setClient(val);
      cliSearch(val);
  }
  const cliSearch = async (cli)=>{
    try {
      const res = await fetch("http://localhost:8080/commande/getCommandeSearch?nom="+ cli);
      const data = await res.json();
      // console.log(data);
      setCom(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }
  const [nomplat,setNomplat]=useState("");

const chercherPlat = (val)=>{
  setNomplat(val);
  venteSearch(val);
}
  const venteSearch = async (nom)=>{
    try {
      const res = await fetch("http://localhost:8080/vendu/getVenduDetailsSearch?nomplat="+ nom);
      const data = await res.json();
      // console.log(data);
      setVente(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }


  useEffect(() => {
    getCom();
    getVente();
  }, [])

  return (
    <>
      <div className=' wrapperListCmd bg-gray-600'>

        <div className="Container-listeCmd">
          <div className=' flex justify-between items-center'>
            <h1 className='text-white'>Listes des commandes </h1>
            <div className='searchCmd mb-2'>
              <input type="text" placeholder='Enter un nom de client' onChange={(e)=>chercherCli(e.target.value)}/>
              <FaSearch className='icone text-white' />
            </div>
          </div>
          <div className="zimmer">
          <table className='tableCmd'>
            <thead>
              <tr className=' bg-gray-950 '>
                <th>N° Commande </th>
                <th>Nom du client</th>
                <th>Date</th>
                <th>Type</th>
                <th>Table</th>
                <th>Action</th>
              </tr>


            </thead>

            <tbody>
              
              {
                com.map((d, i) => (
                  <tr key={i}>
                    <td>{d.idcom}</td>
                    <td>{d.nomcli}</td>
                    <td>{d.date}</td>
                    <td>{d.typecom}</td>
                    <td>{d.tableName}</td>
                    <td >
                      <div className='action'>
                        <FaPen className='i' />
                        <FaTrash className=' trash text-red-600' />
                      </div>
                    </td>
                  </tr>
                ))
              }         
            </tbody>
            <p></p>
          </table>
          </div>
          
        </div>


        <div className="Container-listeCmd">
          <div className=' flex justify-between items-center'>
            <h1 className='text-white'>Listes des plat vendu </h1>
            <div className='searchCmd mb-2'>
              <input type="text" onChange={(e)=>chercherPlat(e.target.value)} placeholder='Entrer le nom du plat' />
              <FaSearch className='icone text-white' />
            </div>
          </div>
          <div className="zimmer">
          <table className='tableCmd'>
            <thead>
              <tr className=' bg-gray-950 '>                
                <th>ID Commande</th>
                <th>Nom du plat</th>
                <th>pu</th>
                <th>Quantité</th>               
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                vente.map((d, i) => (
                  <tr key={i}>
                    <td>{d.idcom}</td>
                    <td>{d.nomplat}</td>
                    <td>{d.pu}</td>
                    <td>{d.qte}</td>                   
                    <td >
                      <div className='action'>
                        <FaPen className='i' />
                        <FaTrash className=' trash text-red-600' />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <p></p>
          </table>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default ListeCmd