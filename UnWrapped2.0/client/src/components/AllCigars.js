import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CigarCard from './CigarCard'
import MyContext from '../context/MyContext'


const AllCigars = (props) => {

    const { cigarList, setCigarList, searchTerm } = props
    const context = useContext(MyContext)
    
    

    useEffect(() => {
        const getCigars = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/cigars`)
                console.log(res.data)
                setCigarList(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        getCigars()
    }, [])

    const deleteFilter = async (idFromBelow) => {
        try {
            // const data = new FormData()
            // data.append('file', context.image)
            // data.append('upload_preset', 'cigar_app')
            // const res = await axios.delete(`https://api.cloudinary.com/v1_1/dmsqthdn3/image/fetch`, data)
            // console.log(res.data)


            const res2 = await axios.delete(`http://localhost:8000/api/cigars/${idFromBelow}`)
            if(window.confirm("Are you sure you want to delete?")){
                console.log(res2.data)
                setCigarList(cigarList.filter(cigar => cigar._id !== idFromBelow))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
        
        <h4 style={{textAlign: 'end'}}>{`Posts: ${cigarList.length}`}</h4>
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', padding:'10px'}}>

                    
                        
            { 
                cigarList.filter((val)=>{
                    if(searchTerm === ''){
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.brand.toLowerCase().includes(searchTerm.toLowerCase()) 
                    ){
                        return val
                    }
                })
                .map(cigar => (
                    <CigarCard 
                    deleteFilter={()=>deleteFilter(cigar._id)}
                    key={cigar._id}
                    id={cigar._id}
                    />
                ))
            }



            </div>
        </div>
        
    )
}

export default AllCigars