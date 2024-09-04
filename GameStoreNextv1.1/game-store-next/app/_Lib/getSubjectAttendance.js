import supabase from "./Supabase";

export async function getClassAttendance(sub) {

  let { data, error } = await supabase
    .from(sub || "Database_Management")
    .select("*, Student(*)");

  if (error) {
    console.error("Error fetching class attendance:", error.message);
    return null;
  }
  
  return data;
}