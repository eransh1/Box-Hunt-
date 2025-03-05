import { useRef } from "react"
import { useState } from "react"

const App = () => {
  const [intervalSpeed,setIntervalSpeed] = useState(3)
  const [cordinates,setCordinates] = useState(getDotCordinates())
  const [clickData,setClickData] = useState([])
  const startTimeRef = useRef(null)
  const [isStarted,setIsStarted]=useState(false)
  const intervalRef = useRef(null)

  function getDotCordinates(){
    const left = `${Math.random()*450}px`
    const top = `${Math.random()*200}px`
    return {left,top}
  }

  const startInterval = ()=>{
    const timer = setInterval(()=>{
      const newCord = getDotCordinates()
      setCordinates(newCord)
    },intervalSpeed*1000)
    intervalRef.current=timer
  }
  const removeInterval = ()=>{
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
  const handleStart = ()=>{
    setIsStarted(true)
    startTimeRef.current=Date.now()
    startInterval()
  }
  const handleClickOnDot = ()=>{
const currentTime = Date.now()
const totalDuration = ((currentTime-startTimeRef.current)/1000)
console.log("totalDuration::",totalDuration)
const tempClickData = [...clickData,{name:clickData.length+1,time:totalDuration}]
setClickData(tempClickData)
removeInterval()
startTimeRef.current = Date.now()
const newCord = getDotCordinates()
setCordinates(newCord)
startInterval()


  }
  const handleReset = ()=>{
    removeInterval()
    setIntervalSpeed(3)
    setClickData([])
    startTimeRef.current = null
    setIsStarted(false)
    setCordinates(getDotCordinates())
  }
  const handlePause = ()=>{
    removeInterval()
    setIsStarted(false)
  }
  return (
  <div style={{width:"100vw",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
    <div
  style={{width:'500px',height:"300px",border:"1px solid black",boxSizing:"border-box"}}
  >
<div style={{width:"100%",height:"50px",borderBottom:"1px solid black",display:"flex",alignItems:"center",gap:"1rem"}}>
{!isStarted && <button onClick={handleStart}>Start</button>}
{isStarted && <button onClick={handlePause}>PAUSE</button>}
<button onClick={handleReset}>Reset</button>
<input disabled={isStarted} type="number" value={intervalSpeed} onChange={(e)=>setIntervalSpeed(Number(e.target.value))}/>
</div>
<div  style={{width:"100%",height:"250px",position:"relative"}}>
<div onClick={handleClickOnDot} style={{display:isStarted ? "inline":"none",width:"20px",height:"20px",background:"red",cursor:"pointer",position:"absolute",top:cordinates?.top,left:cordinates?.left}}></div>
</div>
  </div>
  <div style={{width:'500px',height:"300px",border:"1px solid black"}}>
  <div style={{width:"100%",display:"flex",border:"1px solid black"}}>
    <div style={{width:"50%",textAlign:"center",borderRight:"1px solid black"}}>Cliked Count</div>
    <div style={{width:"50%",textAlign:"center"}}>Clicked Duration</div>
</div>
  {clickData.map((data,i)=>{
    return <div style={{width:"100%",display:"flex",border:"1px solid black"}} key={i}>
    <div style={{width:"50%",textAlign:"center",borderRight:"1px solid black"}}>{data.name}</div>
    <div style={{width:"50%",textAlign:"center"}}>{`${data.time} S`}</div>
</div>
  })}
    
  </div>
  </div>
  )
}

export default App