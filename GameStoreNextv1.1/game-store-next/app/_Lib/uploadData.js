import supabase from "./Supabase";

export async function updateData(columnNameAddress, newData, studentId, sub) {
  console.log(columnNameAddress, newData, studentId, sub);
  try {
    const { data, error } = await supabase
      .from(sub)
      .update({ [columnNameAddress]: newData })
      .eq("student_id", studentId) // Ensure 'student_id' matches your actual field name
      .select();

    if (error) {
      console.error("Supabase Error:", error);
    } else {
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
}


export async function uploadAssignment(sub, newData) {
  console.log(sub);
  const { data, error } = await supabase
    .from("Subjects")
    .update({ Assignment: newData })
    .eq("Name", sub)
    .select();
  if (error) {
    console.error(error);
    return null;
  }
}
