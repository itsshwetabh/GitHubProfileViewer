import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [profiles,setprofiles] = useState([])
  const [no_profiles,set_no_profiles] = useState(10)

  function handleclick()
  {
    async function fetchProfiles()
  {
    let x = Math.floor(Math.random()*6000)
    const response=await fetch(`https://api.github.com/users?since=${x}&per_page=${no_profiles}`)
    const profile_info = await response.json();
    return profile_info;
  }
  fetchProfiles().then((data) => setprofiles(data)).catch((err) => console.log(err))
  }
  

  return(
    <>
    <div style={{backgroundColor:"#f2f2f2",border:"1px solid black"}} className='header'>
      <h1 style={{textAlign:"center", marginTop:"20px"}}>Welcome to GitHub Profile Viewer</h1>
    </div>
    <div>
    <div className='searcharea'>
    <input type="number" value={no_profiles} onChange={(e)=>{set_no_profiles(e.target.value)}} ></input>
      <button onClick={handleclick}>search</button>
    </div>

    <div className='cards'>
    {
      profiles.map((elm)=>
        <div className='card'>
      <div>

      <img style={{borderRadius:"50%", height:"100px", width:"100px"}} src={elm.avatar_url}/>
      <h1 key={elm.login}>{elm.login}</h1>
      <a href={elm.html_url} target='_blank'>View Profile</a>
      </div>
      </div>
      )
    }


    
    </div>
    </div>
    </>

  )
}

export default App
