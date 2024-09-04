import supabase from "./Supabase";

export async function getTimeTable(day) {
  const { data, error } = await supabase
    .from("NewTimeTable")
    .select("Subjects(*),*,Teachers(*)")
    .eq("day", day); 
  if (error) {
    console.error("Error fetching timetable:", error);
    return null;
  }
  return data;
}
