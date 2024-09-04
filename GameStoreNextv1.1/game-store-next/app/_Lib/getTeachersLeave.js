import supabase from "./Supabase";

export async function getTeachersLeave() {
  let { data: TeachersData, error } = await supabase
    .from("TeachersLeave")
    .select("Teachers(*),*");
  if (error) {
    console.error("Error fetching teachers leave data:", error);
    return null;
  }
  return TeachersData;
}
