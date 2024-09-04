import { auth } from "../_Lib/auth"
import { getStudentList } from "../_Lib/getAttendance"
import EvaluationSlide from "./EvaluationSlide"

async function EvaluationSlab({sub}) {
   const session = await auth()
   const list = await getStudentList(sub.replace(/ /g, '_'))
   const abc=[]
   list.map((data) => {
      for (let index = 1; index < 6; index++) {
         if (data[`Assignment${index}`]) {
            const assData = data[`Assignment${index}`]
            const newData = { "AssignmentNo": index, "StudentId": data.student_id, "Date": assData.submittedDate.split("T")[0], }
            abc.push(newData)


         }

      }
   })
 
   return (

      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"2rem"}}>
            <div className="one" style={{marginTop:"2rem",borderRadius: '15px', boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)', border: '1px solid rgba(132, 139, 200, 0.18)', padding: '2rem', overflow: 'auto', height: "28rem",  }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}>Roll Number</th>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}>Subject</th>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}>Assignment No </th>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}> </th>
                     <th style={{ padding: '0.5rem', textAlign: 'center' }}> </th>
                  </tr>
               </thead>
               <tbody>
                  {abc.map((data,index)=>{
                         return  <EvaluationSlide sub={sub} key={index} data={data} />
                  })}
               </tbody>
            </table>
            </div>
         
      </div>
   )
}

export default EvaluationSlab
