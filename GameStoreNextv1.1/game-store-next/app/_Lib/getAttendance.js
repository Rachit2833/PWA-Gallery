import toast from "react-hot-toast";
import supabase from "./Supabase";

export async function getAttendance(sub, student_id) {
  try {
    let { data, error } = await supabase
      .from(sub)
      .select("*")
      .eq("student_id", student_id);

    if (error) {
      console.error("Supabase Error:", error);
    } else {
      return data
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}
export async function getStudentList(sub, ) {
  try {
    let { data, error } = await supabase
      .from(sub)
      .select("*")
    if (error) {
      console.error("Supabase Error:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}