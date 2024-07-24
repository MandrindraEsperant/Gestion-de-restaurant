import React from 'react'
import { BarChart , Bar , ResponsiveContainer} from 'recharts'
const userActivity= [
  {date: "6d ago" , activeUsers: 120},
  {date: "5d ago" , activeUsers: 220},
  {date: "4d ago" , activeUsers: 150},
  {date: "3d ago" , activeUsers: 170},
  {date: "2d ago" , activeUsers: 180},
  {date: "1d ago" , activeUsers: 220},
  {date: "Today"  , activeUsers: 240},
];
function Barechart() {


  return (
    <div className=' flex items-center justify-center py-24'>
    <h1>Active users</h1>
    <ResponsiveContainer>
       <BarChart width={48} height={48} data={userActivity}>
          <Bar dataKey="activeUsers" fill='#887428'  />
       </BarChart>
    </ResponsiveContainer>
 </div>
  )
}

export default Barechart