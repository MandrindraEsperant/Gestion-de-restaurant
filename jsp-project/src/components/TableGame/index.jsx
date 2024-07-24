import React from 'react'
import image from '../image/admin.jpg'
// import { FaEyeSlash , FaEdit , FaRemoveFormat } from 'react-icons/fa'
import './tablegame.css'
function TabmeGame() {
  return (
    <div className='Container-cardTable bg-slate-600'>
    <h6>Welcome to the table Game</h6>

        <div className="tableContiner">
            <table>
                <thead>
                    <tr>
                        <th>Brand </th>
                        <th>Categorie</th>
                        <th>Price </th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
     <p></p>
           <tbody>
                    <tr>
                        <td>
                            <div className='profile'>
                                <div className='profileImage'> <img src={image} alt="" /> </div>
                                <div className="descProfile">
                                    <h1>Velonjara</h1>
                                    <h4>andonique64@gamil.com</h4>
                                </div>
                            </div>
                        </td>
                        <td>Technologie</td>
                        <td>200.000$</td>
                        <td className='statu'><a href="" >Plus de statu</a></td>
                        <td >
                            <div className='action'>
                              {/* <FaEyeSlash  />
                              <FaEdit className='i' />
                              <FaRemoveFormat /> */}
                            </div>
                        </td>
                    </tr>
       <p></p>
                  
              
                
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TabmeGame