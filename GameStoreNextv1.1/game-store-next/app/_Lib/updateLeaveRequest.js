import supabase from "./Supabase";

export async function updateLeaveRequest(id, value) {
  console.log(id);
  const { data, error } = await supabase
    .from("LeaveRequest")
    .update({ Status: value }) // Correctly use the variable value
    .eq("id", id); // Specify the column name "id" and the value id

  if (error) {
    console.error(error);
  } else {
    console.log(data); // Optionally log the data if needed
  }
}
