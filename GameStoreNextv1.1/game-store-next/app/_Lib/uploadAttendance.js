import supabase from "./Supabase";
import { updateConcludedClasses } from "./uploadConcludedClasses";

export async function uploadAttendance(mainData, columnNameAddress, sub) {

  try {
    const { data, error } = await supabase
      .from(sub)
      .update({ [columnNameAddress]: mainData.status })
      .eq("student_id", mainData.studentId) // Ensure 'student_id' matches your actual field name
      .select();

    if (error) {
      console.error("Supabase Error:", error);
    } else {
     
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}
