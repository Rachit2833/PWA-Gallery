import { getLeave } from "../_Lib/getLeave";
import LeaveRequest from "./LeaveRequest"

async function LeaveWrapper() {
   const leave = await getLeave(12);
   return (
      <LeaveRequest data={leave} />
   )
}

export default LeaveWrapper
