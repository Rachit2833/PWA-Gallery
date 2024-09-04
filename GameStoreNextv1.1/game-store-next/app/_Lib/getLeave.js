import supabase from "./Supabase";

export async function getLeave(TeacherId){

let { data: LeaveRequest, error } = await supabase
  .from("LeaveRequest")
  .select("*,Teachers(*),NewTimeTable(*)")
  .eq("TeacherId", TeacherId);
 if (error) {
   console.error("Error fetching timetable:", error);
   return null;
 }
 return LeaveRequest
  
}