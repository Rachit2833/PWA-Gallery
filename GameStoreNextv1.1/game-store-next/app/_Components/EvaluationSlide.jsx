import Link from "next/link"

function EvaluationSlide({data,sub}) {
   return (
      <tr style={{ borderBottom: '1px solid black' }}>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{data?.StudentId}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0',textDecoration:"underline" }}>
            <Link href={"sbkxc"}>{sub}</Link>
         </td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{data.AssignmentNo}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{data.Date}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <button style={{marginLeft:"1rem"}} className='btn'>Accept</button>
         </td>
         <td >

         </td>
      </tr>
   )
}

export default EvaluationSlide
