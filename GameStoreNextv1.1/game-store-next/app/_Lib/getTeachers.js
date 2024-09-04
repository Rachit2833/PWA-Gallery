import supabase from "./Supabase";

export async function getTeachers(){

let { data: Teachers, error } = await supabase
  .from('Teachers')
  .select('*')
  return Teachers
}
export async function getTeachersInd(email) {
  let { data: Teachers, error } = await supabase
    .from("Teachers")
    .select("*")
    .eq("Email", email);
  return Teachers;
}