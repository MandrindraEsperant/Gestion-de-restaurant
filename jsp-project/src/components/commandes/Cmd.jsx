"use client"
import React, { useEffect, useState } from 'react'
import { FaList, FaClose, FaPlugCircleXmark } from 'react-icons/fa6'
import { FaWindowClose, FaTrash, FaEdit, FaPlus, FaPlusCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'
import './cmd.css'
import ReactToPrint from 'react-to-print'
function Cmd() {

  let toally ;
  const [totam , settotamy] = useState(0)
  const ref = React.createRef();
  const [pdf, setPdf] = useState(false);
  const [menu, setMenu] = useState([])
  const [commande, setCommande] = useState({
    "idcom": "",
    "nomcli": "",
    "typecom": "Sur table",
    "tableName": "",
    "date": ""
  })

  const[total,setTotal]=useState(0);
  const AjoutCommande = async () => {

    // let currentDate = new Date();
    // currentDate.setHours(currentDate.getHours+3);

    // setCommande({...commande, date:currentDate});
    // setCommande({...commande, date: currentDate})

    try {
      const res = await fetch("http://localhost:8080/commande/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commande)
      });
      const result = await res.text();
      toast.success("La reservation a été bien effectué", {
        duration: 2000,
      });
      setPdf(true);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
      // alert("error" + error);
      // setAjoutFormTab(false)
    }
  }


  const [vente, setVente] = useState({
    "idcom": "",
    "idplat": 0,
    "qte": 1
  })
  const [id, setId] = useState(0);
  const [values, setValues] = useState({
    "nomplat": "",
    "pu": 0
  })
  const [tableauT, setTableauT] = useState([]);

  const getAllTable = async () => {
    try {
      const res = await fetch("http://localhost:8080/table/");
      const data = await res.json();
      setTableauT(data);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }





const [t,setT]=useState(0);
let izy
  const getAllMenu = async () => {
    try {
      const res = await fetch("http://localhost:8080/menu/");
      const data = await res.json();
      setMenu(data);    
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }
  const [totalV,setTotalV] = useState(0);
  const [prix,setPrix]=useState(0);
  
  const AjoutMenu = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8080/menu/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      getAllMenu(); 
      setAjoutFormCmd(!ajoutFormCmd);
      const result = await res.text();
      console.log(result);
      toast.success("L'ajout a été bien effectué", {
        duration: 2000,
      })
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
      setAjoutFormCmd(!ajoutFormCmd);
    }
  }
  const SupprimerMenu = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/menu/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      getAllMenu();
      toast.error("Le plat est supprimmé !", {
        duration: 2000,
      })
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }
  const Modification = (id, nom, prix) => {
    setId(id);
    setValues({ ...values, nomplat: nom, pu: prix });
    setEditFormCmd(!editFormCd);
  }
  const ModificationMenu = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/menu/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = await res.text();
      console.log(result);
      getAllMenu();
      setEditFormCmd(!editFormCd);
      toast.success("Le menu est bien modifié", {
        duration: 2000,
      })


    } catch (error) {
      alert("error" + error);
      setEditFormCmd(!editFormCd);
    }
  }

  useEffect(() => {
    getAllMenu();
    getAllTable();
  }, [])

  const [menuCom, setMenuCom] = useState([]);
  const getVenteCommande = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/vendu/" + id);
      const data = await res.json();
      setMenuCom(data);
      settotamy(data.reduce((accumulator, d)=>accumulator + (d.qte * d.pu),0))

    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }

  const AjoutVente = async (e) => {
    e.preventDefault();
    const idc = commande.idcom
    //  const sql = "SELECT nomplat, pu, qte, Vendu.idcom FROM Vendu,Menu WHERE Vendu.idplat = Menu.idplat";
    try {
      const res = await fetch("http://localhost:8080/vendu/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vente)
      });
      getVenteCommande(idc);
    } catch (error) {
      toast.error("Erreur :" + error, {
        duration: 3000,
      })
    }
  }


  const [ajoutFormCmd, setAjoutFormCmd] = useState(true);
  const [editFormCd, setEditFormCmd] = useState(false);
  const [suppFormCmd, setSuppFormCmd] = useState(false);
  // const [tables , setTables ] = useState(true);


  // Pagination of the card Table is starting from here

  const [currentPageCard, setcurrentPageCard] = useState(1);
  const recordsPerPageCard = 3;
  const lastIndexCard = currentPageCard * recordsPerPageCard;
  const firstIndexCard = lastIndexCard - recordsPerPageCard;
  const npageCard = Math.ceil(menu.length / recordsPerPageCard);
  const numbersCard = [...Array(npageCard + 1).keys()].slice(1);
  const recordsCard = menu.slice(firstIndexCard, lastIndexCard);

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



  return (<>
    <div className='table commande'>
      <div className='mainContainer'>
        <div className='headTalbe flex  w-full '>
          <h1 className=''>Listes des plats</h1>
        </div>
        <div className='wrapperMenu'>
          <div className='Container-cardTable bg-slate-600 '>

            {recordsCard.map((table, id) => (<div className='cardTable' key={id}>
              <div className=' text-white'>
                <div className='tab'>
                  <div>
                    <h1 className=''> N°: {table.idplat}</h1>
                    <p className=''>Nom du plat:{table.nomplat}</p>
                    <p className='date '>Prix: {table.pu}</p>
                  </div>
                  <div className=' bg-gray-700 plat'></div>
                </div>
                <div className='action  bg-gray-950 p-1 rounded '>
                  <button className=' bg-gray-800 px-2  rounded'>Commander</button>
                  <div>
                    <button className=' text-white ' onClick={() => Modification(table.idplat, table.nomplat, table.pu)}><FaEdit className='icone mr-2' /></button>
                    <button className=' text-red-600 ' onClick={() => SupprimerMenu(table.idplat)}><FaTrash className='icone' /></button>
                  </div>
                </div>
              </div>
            </div>))}
            <div className='createTable' onClick={() => setAjoutFormCmd(!ajoutFormCmd)}>
              <p className=''>ajouter un plats</p>
            </div>
          </div>
          <p className='p-1'></p>
          <nav>
            <ul className="pagination">
              <li className="page-item btnpn">
                <span href="#" className="page-link" onClick={prevPageCard}>
                  Précedent
                </span>
              </li>
              {numbersCard.map((n, i) => (
                <li key={i}
                  className={`page-item ${currentPageCard === n ? "active" : ""}`}
                  onClick={() => changePageCard(n)}
                >
                  {n}
                </li>
              ))}
              <li className="page-item btnpn">
                <span className="page-link" onClick={nexPageCard}>
                  Suivant
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='commandeSection bg-slate-600'>
        <div className='head mb-2'>
          <h1>Commande</h1>
          <FaList className=' text-white' />
        </div>


        {/* ===========aboutCommande========= */}

        <div className="aboutCommande">
          <form action="" className='form   bg-slate-600'>

            <div className='mainForm grid grid-cols-2 gap-2'>

              <div className="aboutOne">
                <div className="rows">
                  <label htmlFor="">N° commande</label>
                  <input type="text" required name="" id="" onChange={(e) => { setCommande({ ...commande, idcom: e.target.value }); setVente({ ...vente, idcom: e.target.value }) }} />
                </div>
                <div className="rows">
                  <label htmlFor="">Nom du client</label>
                  <input type="text" required name="" id="" onChange={(e) => setCommande({ ...commande, nomcli: e.target.value })} />
                </div>
              </div>
              <div className="aboutTwo">
                <div className="rows">
                  <label htmlFor="">Type</label>
                  <select name="" id="" onChange={(e) => setCommande({ ...commande, typecom: e.target.value })}>
                    <option value="Sur table">Sur table</option>
                    <option value="Emporter">Emporter</option>
                  </select>
                </div>
                <div className="rows">
                  <label htmlFor="">Table</label>
                  <select name="" id="" onChange={(e) => setCommande({ ...commande, tableName: e.target.value })}>
                    <option value="">Choisir un table</option>
                    {tableauT.map((d, i) => (
                      <option key={i} value={d.designation}>{d.designation}</option>
                    )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </form>

          <form action="" className='form  bg-slate-600' onSubmit={AjoutVente}>
            <div className='mainForm grid grid-cols-2 gap-2'>
              <div className="aboutOne">
                <div className="rows">
                  <label htmlFor="">Id plat</label>
                  <select name="" id="" onChange={(e) => setVente({ ...vente, idplat: e.target.value })} >
                    <option value="">Choisir un plat</option>
                    {menu.map((d, i) => (
                      <option key={i} value={d.idplat}>{d.idplat}</option>
                    )
                    )}
                  </select>
                </div>
              </div>
              <div className="aboutTwo">
                <div className="rows">
                  <label htmlFor="">Quantité</label>
                  <div className=' addQuantite'>
                    <input className='quantite' type="number" required onChange={(e) => setVente({ ...vente, qte: e.target.value })} />
                    <button className='flex'><FaPlusCircle className='ico' /> <span>Ajouter</span></button>

                  </div>

                </div>
              </div>
            </div>
          </form>
          <button style={{ padding: '2px' }} className=' bg-gray-800 text-white rounded w-full mt-1'
            onClick={() => {
              setCommande({ ...commande, date: new Date() });
              AjoutCommande();
            }}>Effectuer</button>
        </div>

        <div className='head mb-2 mt-3'>
          <h1 className=' '> <span>Menu(s) commandé(s) par un client</span> </h1>
        </div>
        <div className="aboutMenuCmd  bg-slate-600">
          <div className='tableMenuCmd'>
            <table className='tableClient w-full' style={{ fontSize: '13px' }}>
              <thead>
                <tr className=' bg-gray-950 text-white '>
                  <th>Id plat</th>
                  <th>PU (Ar)</th>
                  <th>Unité</th>
                  <th>Total (Ar)</th>
                </tr>
              </thead>
              <p></p>
              <tbody>

                {
                  menuCom.map((d, i) => (
                    <tr key={i}>
                      <td>
                        {d.nomPlat}
                      </td>
                      <td>{d.pu}</td>
                      <td>{d.qte}</td>
                      <td>{d.pu * d.qte}</td>
                      
                    </tr>
                  ))
                }


                <p></p>

              </tbody>
            </table>
          </div>
          <button style={{ padding: '2px' }} className='  rounded bg-gray-900 text-white  mt-1 w-full'>reçu</button>
        </div>

      </div>
    </div>



    {/* //MOdal popUp */}
    {!ajoutFormCmd && (
      <div className=' wrapperPopUp'>
        <div className="formAjoutTable bg-gray-700  rounded">
          <div className="head bg-gray-900"><h1>Ajouter un menu</h1> <FaWindowClose className=' close cursor-pointer ' onClick={() => setAjoutFormCmd(!ajoutFormCmd)} /></div>
          <form action="" onSubmit={AjoutMenu}>

            <div className="rows">
              <label htmlFor="">Nom du plat:</label>
              <input type="text" onChange={(e) => setValues({ ...values, nomplat: e.target.value })} name="" id="" />
            </div>
            <div className="rows">
              <label htmlFor="">Prix:</label>
              <input type="number" name="" onChange={(e) => setValues({ ...values, pu: e.target.value })} id="" />
            </div>
            <button className=' rounded bg-gray-950' type='submit'>Enregistrer</button>
          </form>
        </div>
      </div>
    )}

    {editFormCd && (
      <div className=' wrapperPopUp'>
        <div className="formAjoutTable bg-gray-700  rounded">
          <div className="head bg-gray-900"><h1>Modification </h1> <FaWindowClose className=' close cursor-pointer ' onClick={() => setEditFormCmd(!editFormCd)} /></div>
          <form action="" onSubmit={ModificationMenu}>

            <div className="rows">
              <label htmlFor="">Nom du plat:</label>
              <input type="text" value={values.nomplat} onChange={(e) => setValues({ ...values, nomplat: e.target.value })} name="" id="" />
            </div>
            <div className="rows">
              <label htmlFor="">Prix:</label>
              <input type="number" value={values.pu} onChange={(e) => setValues({ ...values, pu: e.target.value })} name="" id="" />
            </div>
            <button className=' rounded bg-gray-950' type='submit'>Modifier</button>
          </form>
        </div>
      </div>
    )}

    {suppFormCmd && (
      <div className=' wrapperPopUp'>

      </div>
    )}
    {pdf && (
      <div className=' wrapperPopUp'>
        <div className='containerPdf'>
          <div className="pdf" ref={ref}>
            <div className="head">
              <div>
                <h1 className=' '>AvyMona</h1>
                <p className=' '>N° Commande : {commande.idcom}</p>
              </div>
            </div>
            <div className="infoCli">
              <p>Nom du client : {commande.nomcli}</p>
              <p>Table : {commande.tableName}</p>
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
                  {menuCom.map((d, i) => <tr key={i}>
                    <td>{d.nomPlat}</td>
                    <td>{d.pu}</td>
                    <td>{d.qte}</td>
                    <td>{d.pu * d.qte}</td>
                    
                   

                    {/* {setTotal(total+(d.pu * d.qte))} */}
                  </tr>)}
                </tbody>
              </table>
            </div>

            <p className=' '>TOTAL : {totam} Ar</p>

          </div>


          <ReactToPrint
            trigger={() =>
              <button className=' btnPdf bg-gray-950 p-1 text-white'
              //  onClick={()=>setPdf(false)}
               >Imprimer</button>
            }
            content={() => ref.current}
            pageStyle="@page {size:auto; margin: 20mm} @media print {body {-webkit-print-color-adjust: exact;}}"
            onAfterPrint={()=>setPdf(false)}
          />
        </div>
      </div>
    )}
  </>
  )
}

export default Cmd