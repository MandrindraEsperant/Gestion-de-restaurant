'use client'
import { FaEdit, FaEyeSlash, FaList, FaPlus, FaPlusCircle, FaSearch, FaTrash, FaUserPlus, FaWindowClose } from 'react-icons/fa';
import './table.css'
import toast from 'react-hot-toast';
import React, { Fragment, useEffect, useState } from 'react'
import { FaCirclePlus, FaPen } from 'react-icons/fa6';
function Table() {
  const [table, setTable] = useState([]);
  const [dataTable, setDataTable] = useState("");
  const [idtable, setIdtable] = useState(0);
  const [tabFrom,setTabForm] = useState({
    "tableName":"",
    "dateReserver": "",
      "date_de_reservation": "",
      "nomcli": ""
  })
  const getAllTable = async () => {
    try {
      const res = await fetch("http://localhost:8080/table/");
      const data = await res.json();
      setTable(data);

    } catch (error) {
      alert(error);
    }
  }
  const AjoutTable = async (e) => {
    e.preventDefault();
    const designation = { "designation": dataTable }
    try {
      const res = await fetch("http://localhost:8080/table/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(designation)
      });
      const result = await res.text();
      console.log(result);
      if (result === "ok") {
        setAjoutFormTab(false)
        getAllTable();
        toast.success("L'ajout a été bien effectué", {
          duration: 2000,
        })
      } else {
        toast.error("Nom du table déjà existé !!!", {
          duration: 3000,
        })
      }

    } catch (error) {
      alert("error" + error);
      setAjoutFormTab(false)
    }
  }
  const SupprimerTable = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/table/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      getAllTable();
      toast.error("Le table est supprimmé !", {
        duration: 2000,
      })
    } catch (error) {
      alert("error" + error);
    }
  }
  const Modification = (id, des) => {
    setDataTable(des);
    setIdtable(id);
    setEditFormTab(!editFormTab);
  }
  const ModificationTable = async (e) => {
    e.preventDefault();
    const designation = { "designation": dataTable };
    try {
      const res = await fetch("http://localhost:8080/table/" + idtable, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(designation)
      });
      const result = await res.text();

      console.log(result);
      if (result === "ok") {
        setEditFormTab(false)
        getAllTable();
        toast.success("Le table est bien modifié", {
          duration: 2000,
        })
      } else {
        toast.error("Nom du table déjà existé !!!", {
          duration: 3000,
        })
      }

    } catch (error) {
      alert("error" + error);
      setEditFormTab(false);
    }
  }
  const Reserver = (tab)=>{
    setAjoutFormRes(!ajoutFormRes);
    setTabForm({...tabFrom,tableName:tab});

  }
  const AjoutReserve = async ()=>{
    // e.preventDefault();

    // let currentDate = new Date();
    // currentDate.setHours(currentDate.getHours() + 3);
    // currentDate.setHours(currentDate.getHours()+3);

    // setTabForm({...tabFrom,date_de_reservation:aa});
  

    try {
      const res = await fetch("http://localhost:8080/reservation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tabFrom)
      });
    const result = await res.text();
    console.log(result);
      if (result === "ok") {
        setAjoutFormRes(!ajoutFormRes);
        // getAllTable();
        toast.success("La reservation a été bien effectué", {
          duration: 2000,
        })

      } else {
        toast.error("Cet table est  déjà reservé dans ce date !!!", {
          duration: 3000,
        })
      }
    } catch (error) {
      alert("error" + error);
     // setAjoutFormTab(false)
    }
  }
  useEffect(() => {
    getAllTable();
    console.log("ici");
    console.log(tabFrom.date_de_reservation);
  }, [])

  //==Pop up modale ===
  const [ajoutFormTab, setAjoutFormTab] = useState(false);
  const [ajoutFormRes, setAjoutFormRes] = useState(false);
  const [editFormTab, setEditFormTab] = useState(false);
  const [suppFormTab, setSuppFormTab] = useState(false);

  // Pagination of the card Table is starting from here

  const [currentPageCard, setcurrentPageCard] = useState(1);
  const recordsPerPageCard = 7;
  const lastIndexCard = currentPageCard * recordsPerPageCard;
  const firstIndexCard = lastIndexCard - recordsPerPageCard;
  const npageCard = Math.ceil(table.length / recordsPerPageCard);
  const numbersCard = [...Array(npageCard + 1).keys()].slice(1);
  const recordsCard = table.slice(firstIndexCard, lastIndexCard);

  function prevPageCard() {
    if (currentPageCard !== 1) {
      setcurrentPageCard(currentPageCard - 1);
    }
  }
  function changePageCard(id) {
    setcurrentPageCard(id);
  }
  function nexPageCard() {
    if (currentPageCard !== npageCard) {
      setcurrentPageCard(currentPageCard + 1);
    }
  }

  //end of the pagination of the card table 

  function date(date) {
    return moment(date).format("DD/MM/YYYY");
  }
  return (
    <Fragment><div className='Container-cardTable bg-slate-600'>

      {recordsCard.map((table, id) => (<div className='cardTable' key={id}>
        <div className=' text-white'>
          <div className='tab'>
            <div>
              <h1 className=''>Table N°: {table.idtable}</h1>
              <p className=''>{table.designation}</p>
              <p className='date '></p>
            </div>
            <div className=' bg-gray-700 tables'></div>
          </div>
          <div className='action  bg-gray-950 p-1 rounded '>
            <button className=' bg-gray-800 px-2  rounded'
              onClick={() => Reserver(table.designation)}>Reserver</button>
            <div>
              <button className=' text-white ' onClick={() => Modification(table.idtable, table.designation)} ><FaEdit className='icone mr-2' /></button>
              <button className=' text-red-600 ' onClick={(e) => SupprimerTable(table.idtable)}><FaTrash className='icone' /></button>
            </div>
          </div>
        </div>
      </div>))}
      <div className='createTable' onClick={() => setAjoutFormTab(!ajoutFormTab)}>
        <p className=' flex items-center'> <FaCirclePlus className=' mr-2' /> <span>ajouter un table</span> </p>
      </div>

    </div>
      <p className=' p-1'></p>
      <nav>
        <ul className="pagination">
          <li className="page-item btnpn">
            <span href="#" className="page-link" onClick={prevPageCard}>
              Précedent
            </span>
          </li>
          {numbersCard.map((n, i) => (
            <li className={`page-item ${currentPageCard === n ? "active" : ""}`} onClick={() => changePageCard(n)}>  {n} </li>
          ))}
          <li className="page-item btnpn">
            <span className="page-link" onClick={nexPageCard}>
              Suivant
            </span>
          </li>
        </ul>
      </nav>

      {ajoutFormTab && (
        <div className='wrapperPopUp'>
          <div className="formAjoutTable bg-gray-700  rounded">
            <div className="head bg-gray-900"><h1>ajouter un table</h1> <FaWindowClose className=' close cursor-pointer ' onClick={() => setAjoutFormTab(!ajoutFormTab)} /></div>
            <form action="" onSubmit={AjoutTable}>

              <div className="rows">
                <label htmlFor="">Designation:</label>
                <input type="text" onChange={(e) => setDataTable(e.target.value)} required name="" id="" />
              </div>
              <button className=' rounded bg-gray-950' type='submit' >Enregistrer</button>
            </form>
          </div>
        </div>
      )}

      {ajoutFormRes && (
        <div className=' wrapperPopUp'>
          <div className="ajoutReservation  bg-gray-700  rounded">
            <div className="head bg-gray-900">
              <h1>Ajout reservation</h1> <FaWindowClose onClick={() => setAjoutFormRes(!ajoutFormRes)} className='close cursor-pointer' />
            </div>
            <form action="" className=' ' onSubmit={(e)=>{
              e.preventDefault();
              setTabForm({...tabFrom,date_de_reservation:new Date()});
              AjoutReserve();
            }}>
              <div className="wrapperCol flex gap-3">
                <div className="cols">
                  <div className="rows">
                    <label htmlFor="">Nom du table </label>
                    <input type="text" readOnly value={tabFrom.tableName}/>
                  </div>
                  <div className="rows">
                    <label htmlFor="">Date reservé</label>
                    <input type="date" required onChange={(e)=>{setTabForm({...tabFrom, dateReserver:e.target.value})}}/>
                  </div>
                </div>

                <div className="cols">
                  {/* <div className="rows">
                    <label htmlFor="">Dure</label>
                    <input type="date" />
                  </div> */}
                  <div className="rows">
                    <label htmlFor="">Nom du client</label>
                    <input type="text" required onChange={(e)=>{setTabForm({...tabFrom,nomcli:e.target.value})}}/>
                  </div>
                </div>
              </div>
              <button className=' rounded bg-gray-950' type='submit'>Enregistrer</button>
            </form>
          </div>
        </div>
      )}
      {editFormTab && (
        <div className='wrapperPopUp'>
          <div className="formAjoutTable bg-gray-700  rounded">
            <div className="head bg-gray-900"><h1>Modification d un table</h1> <FaWindowClose className=' close cursor-pointer ' onClick={() => setEditFormTab(!editFormTab)} /></div>
            <form action="" onSubmit={ModificationTable}>

              <div className="rows">
                <label htmlFor="">Designation:</label>
                <input type="text" value={dataTable} onChange={(e) => setDataTable(e.target.value)} name="" id="" />
                <input type="text" hidden value={idtable} />
              </div>
              <button className=' rounded bg-gray-950' type='submit' >Modifier</button>
            </form>
          </div>
        </div>
      )}

      {suppFormTab && (
        <div className=' wrapperPopUp'>

        </div>
      )}
    </Fragment>
  )
}

export default Table