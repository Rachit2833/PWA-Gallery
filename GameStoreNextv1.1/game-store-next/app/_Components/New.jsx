
import { getSubjects } from "../_Lib/getSubjects"

async function New() {
   const sub =await getSubjects()
   return (
      <>
         {sub.map((item, index) => {
           return <h2 key={index}>{item.Name}</h2>
         })}
      </>
   )
}

export default New
