import Data from './reservation.json'
import React, { useState, Fragment, useEffect } from 'react'
import './reservaton.css'
import { FaEdit, FaWindowClose, FaPen, FaPlus, FaPlusCircle, FaSearch, FaTrash, FaUserPlus } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';



function Reservation() {
  const [dateRange,setDateRange] = useState({
    "startDate":"",
    "endDate":""
  })
  const [dataSearch,setDataSearch]=useState("");
  const chercher = (nom)=>{
    setDataSearch(nom);
    chercherClient(nom);
  }
  const chercherClient= async (val)=>{
    try {
      const res = await fetch("http://localhost:8080/reservation/rechercheClient?nomClient="+val);
      const data = await res.json();
      // setDataS(data)
      setReservation(data);
      console.log(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
  }
  }
  const handelSearch = async ()=>{
    try {
      const res = await fetch("http://localhost:8080/reservation/rechercheEntre2Date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dateRange)
      });
      const data = await res.json();
      // setDataS(data)
      setReservation(data);
      // console.log(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
  }}

  const [reservation, setReservation] = useState([]);
  const [id,setId] = useState(0);
  const [tabFrom,setTabForm] = useState({
    "tableName":"",
    "dateReserver": "",
      "date_de_reservation": "",
      "nomcli": ""
  })
  const Modification =(cle,date,cli,nomTable)=>{
    setId(cle);
    setTabForm({...tabFrom,tableName:nomTable,dateReserver:date,nomcli:cli});
    setEditFormRes(!editFormRes);
  }
  const getAllReservation = async () => {
    try {
      const res = await fetch("http://localhost:8080/reservation/");
      const data = await res.json();
      setReservation(data);
    } catch (error) {
      alert(error);
    }
  }
  const SupprimmerReservation = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/reservation/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      getAllReservation();
      toast.error("Le reservation est supprimmé !", {
        duration: 2000,
      })
    } catch (error) {
      alert("error" + error);
    }
  }
  const ModifierReservation =async (e)=>{
    e.preventDefault();
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours()+3);

    setTabForm({...tabFrom,date_de_reservation:currentDate});

    try {
      const res = await fetch("http://localhost:8080/reservation/"+id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tabFrom)
      });
    const result = await res.text();
    console.log(result);
      if (result === "ok") {
        setEditFormRes(!editFormRes);
        getAllReservation();
        toast.success("La reservation a été bien modifié", {
          duration: 2000,
        })

      } else {
        toast.error("Cet table est  déjà reservé dans ce date !!!", {
          duration: 3000,
        })
      }
    } catch (error) {
      alert("error" + error);
      setEditFormRes(!editFormRes);
    }
  }
  useEffect(() => {
    getAllReservation();
  }, [])

  const [editFormRes, setEditFormRes] = useState(false);
  const [suppFormRes, setSuppFormRes] = useState(false);

  //  pagination of the client table
  const [currentPage, setcurrentPage] = useState(1);
  const [btn, setBtn] = useState(false);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const npage = Math.ceil(reservation.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const records = reservation.slice(firstIndex, lastIndex);

  function prevPage() {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  }
  function changePage(id) {
    setcurrentPage(id);
  }
  function nexPage() {
    if (currentPage !== npage) {
      setcurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <button onClick={() => setAjoutFormRes(!ajoutFormRes)} className='btnAjoutRes bg-gray-800 px-6 py-2 text-white flex items-center' >
        <FaPlusCircle className='  text-2xl mr-2' />
        <span> Ajouter</span>
      </button>
      <div className='Container-tableClient bg-slate-600'>

        <div className='searchClient'>
          <h2 className=' searchTitle text-white'>Recherche</h2>
          <div className="">
            <div className='search'><input type="text" onChange={(e)=>chercher(e.target.value)} placeholder='Enter le nom du client' /><FaSearch className='icone' /> </div>
          </div>
          <br />
          <h1 className=' text-white'>Recherche entre deux dates</h1>
          <hr />
          <div className="">
            <div className='searchDeux '>
              <p className=' text-white'>
                Du : <input type="date" onChange={(e)=>setDateRange({...dateRange,startDate:e.target.value})}/>
              </p>
              <div className=' flex mt-3'>
                <p className=' text-white'>
                  <span>Au : </span>
                  <input type="date" onChange={(e)=>setDateRange({...dateRange,endDate:e.target.value})} />
                </p>
                <FaSearch className='icone bg-gray-900 '  onClick={()=>handelSearch()}/>
              </div>

            </div>
          </div>
          <div className=' imageContairer'  >

          </div>
        </div>
        <div className='tableContainer'>
          <table className='tableClient'>
            <thead>
              <tr className=' bg-gray-950'>
                <th>Id</th>
                <th>N° table</th>
                <th>Date reservé</th>
                <th>Date de reservetion</th>
                <th>Nom de client</th>
                <th>Action</th>
              </tr>
            </thead>
            <p></p>
            <tbody>
              {records.map((d, i) => (<Fragment key={i}><tr>
                <td>
                  {d?.idReservation || d.id_reservation}
                </td>
                <td>{d?.tableName|| d.table_name }</td>
                <td>{d?.dateReserver || d.date_reserver}</td>
                <td>{d.date_de_reservation}</td>
                <td className='statu'>{d.nomcli}</td>
                <td >
                  <div className='action'>
                    <FaPen className='i' onClick={() => Modification(d.idReservation,d.dateReserver,d.nomcli,d.tableName)} />
                    <FaTrash onClick={() => SupprimmerReservation(d.idReservation)} />
                  </div>
                </td>
              </tr>
                <p></p>
              </Fragment>))}


            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              <li className="page-item btnpn">
                <span href="#" className="page-link" onClick={prevPage}>
                  Précedent
                </span>
              </li>
              {numbers.map((n, i) => (
                <li key={i}
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  onClick={() => changePage(n)}
                >
                  {n}
                </li>
              ))}
              <li className="page-item btnpn">
                <span className="page-link" onClick={nexPage}>
                  Suivant
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>


      {editFormRes && (
        <div className=' wrapperPopUp'>
          <div className="ajoutReservation  bg-gray-700  rounded">
            <div className="head bg-gray-900">
              <h1>Modification reservation</h1> <FaWindowClose onClick={() => setEditFormRes(!editFormRes)} className='close cursor-pointer' />
            </div>
            <form action="" className=' ' onSubmit={ModifierReservation}>
              <div className="wrapperCol flex gap-3">
                <div className="cols">
                  <div className="rows">
                    <label htmlFor="">Nom du table </label>
                    <input type="text" readOnly value={tabFrom.tableName} />
                  </div>
                  <div className="rows">
                    <label htmlFor="">Date reservé</label>
                    <input type="date" required value={tabFrom.dateReserver} onChange={(e)=>setTabForm({...tabFrom,dateReserver:e.target.value})}/>
                  </div>
                </div>

                <div className="cols">
                  <div className="rows">
                    <label htmlFor="">Nom du client</label>
                    <input type="text" required  value={tabFrom.nomcli} onChange={(e)=>setTabForm({...tabFrom,nomcli:e.target.value})}/>
                  </div>
                  {/* <div className="rows">
                    <label htmlFor="">Nom</label>
                    <input type="text" />
                  </div> */}
                </div>
              </div>
              <button className=' rounded bg-gray-950' type='submit'>Modifier</button>
            </form>
          </div>
        </div>
      )}
      {suppFormRes && (
        <div className=' wrapperPopUp'>

        </div>
      )}
    </div>
  )
}

export default Reservation