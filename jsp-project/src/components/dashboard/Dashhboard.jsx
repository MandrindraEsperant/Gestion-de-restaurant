'use client'
import './dashboard.css'
import React, { useEffect, useState ,Fragment} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Dashhboard() {

const [recetteMois,setRecetteMois]=useState([]);
const getRecMesuel = async ()=>{
    try {
        const res = await fetch("http://localhost:8080/vendu/histogramme");
        const data = await res.json();
        setRecetteMois(data);
    } catch (error) {
        alert(error);
    }
}
    const [recetteTotale, setRecetteTotale] = useState("");
    const [menuTop10, setMenuTop10] = useState([]);
    const getRecetteTotal = async () => {
        try {
            const res = await fetch("http://localhost:8080/vendu/recetteTotale");
            const data = await res.json();
            setRecetteTotale(data[0].recetteTotale)
        } catch (error) {
            alert(error);
        }
    }
    const getMenuTop10 = async () => {
        try {
            const res = await fetch("http://localhost:8080/vendu/top10vendus");
            const data = await res.json();
            setMenuTop10(data);
        } catch (error) {
            alert(error);
        }
    }

useEffect(() => {
        getRecetteTotal();
        getMenuTop10();
        getRecMesuel();
    }, [])

    return (
        <div className='containerDashboard'>

            <div className='histogramme'>
                <h1>Evaluation  des recettes pendant les 6 derniers mois</h1>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        width={500}
                        height={300}
                        data={recetteMois} 
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="recette" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>



            <div className='recettePlat bg-slate-600'>
                <div className=' mb-3'>
                    <h1 className='titlerecette bg-gray-900 ' >Reccette accummulé</h1>
                    <p className='recette'>{recetteTotale} Ar</p>
                </div>
                <hr />
                <div>
                    <h1 className='title'>Listes des dix plats les plus vendus</h1>
                    <table>

                        <tr>
                            {/* <th className=' bg-gray-900 text-left text-white'>Rang</th>
                            <th className=' bg-gray-900 text-left text-white'>Id plat</th> */}
                            <th className=' bg-gray-900 text-left text-white'>Design</th>
                            <th className=' bg-gray-900 text-left text-white'>Quantité vendu</th>
                        </tr>
                        <p></p>

                        {
                            menuTop10.map((d, i) => (
                                <Fragment key={i}>
                                    <tr >
                                        {/* <td></td>
                                        <td>{d.idplat}</td> */}
                                        <td>{d.nomplat}</td>
                                        <td>{d.quantite}</td>
                                    </tr>
                                    <p></p>
                                </Fragment>
                            ))
                        }
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Dashhboard