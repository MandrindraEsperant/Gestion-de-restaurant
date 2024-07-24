import './navbar.css'       
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import image from "../image/admin.jpg"
const Navbar = () => {
  return (
    <div className="containerNav bg-gray-800 ">
      <div className="logos justify-center ">
         <Link href="/" className="logo">Resto avyMona</Link>
      </div>
    
      <div className="links">
        <Link href="/dashboard" className="link">Tableaux de bord</Link>
        <Link href="/reservation" className="link"> </Link>
        <Link href="/table" className="link">Reserver</Link>
        <Link href="/commande" className="link">Commander</Link>
        <Link href="/listeCmd" className="link">Listes des commande</Link>
      </div>
      <div className=" adminProfile flex gap-2 align-middle justify-center ">
         <div href="/" className="profil">  <Image className="image" src={image}/> </div>
          <div href="/" className="profil"> 
            <p className="profileName">  Maxwell Eddy</p> 
            <p className="role">  Admin</p> 
         </div>
      </div>
    </div>
  );
};

export default Navbar;
