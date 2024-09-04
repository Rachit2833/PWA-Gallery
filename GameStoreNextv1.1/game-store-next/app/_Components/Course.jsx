'use client'
import AssignmentUpload from "./AssignmentUpload";


function Course({ data, tag, submittedData }) {
  
   let Assdata = submittedData?.filter((item,index) => item.student_id === 12345678);


   return (
      <>

      <div className="table"style={{margin: "2rem 0",display: "grid", gridTemplateRows: "1fr 1fr", gap: "1rem", textAlign: "left", height: "25rem",  }} >
         <div  style={{ display: "grid", gridTemplateColumns: "1fr", }}>
            <div>
               <h2 style={{ margin: "2rem 0" }}>{data.Name}</h2>
               <div>
                  <span style={{ fontSize: "1.2rem", display: "block" }}>
                     <b>SubjectCode:</b> {data.SubjectCode}
                  </span>
                  <span style={{ fontSize: "1.2rem", display: "block" }}>
                     <b>Credits:</b> {data.Credits}
                  </span>
                  <span style={{ fontSize: "1.2rem", display: "block" }}>
                     <b>Teacher/Faculty:</b> {data.Teachers.Name}
                  </span>
                  <span style={{ fontSize: "1.2rem", display: "block" }}>
                     <b>Assignment:</b>
                  </span>
                  <div style={{height:"9.5rem",overflow:"auto"}}>
                  {
                     data.Assignment ? (
                        data.Assignment.map((item, index) => {
                           
                           return (
                              // setinputData = { setinputData } inputData = { inputData }
                              <AssignmentUpload  data={data} Assdata={Assdata} key={index} item={item} index={index} />
                           )
                        })
                     ) : (
                        <span>No assignments assigned till now</span>
                     )
                  }

               </div>
               </div>
            </div>
            
         </div>
      </div>
      </>
   );
}

export default Course;



