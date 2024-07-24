'use client'
import React , {useState} from 'react'
import Table from '../../components/table/Table'
import Reservation from '../../components/reservation/Reservation'
import { FaList, FaPlusCircle } from 'react-icons/fa';
function page() {
  const [showTables , setShowTables] = useState(true);

  return (
    <div className='table'>
    <div className='headTalbe flex  w-full '> 
     <div className='flex' style={{display:"flex"}}> 
     
      <h1 className='titleTable ' ><FaList  className=' text-1xl mr-2' /> <span>Toutes les </span></h1>
      <select className='' onChange={()=> setShowTables(!showTables)}>
           <option value='tables' className=''>tables</option>
           <option value='reservations' className=''>reservations</option>
      </select>
     </div>         
   </div>
    {showTables  ? ( <Table /> ):
    ( <Reservation /> )
    }
</div>
  )
}

export default page