import supabase from "./Supabase";
export async function getSubjects() {
  let { data: Subjects, error } = await supabase
    .from("Subjects")
    .select("*,Teachers(*)");
  if (error) {
    console.error("Error fetching teachers leave data:", error);
    return null;
  }
  return Subjects;
}
export async function getSubjectsInd(name) {
  let { data: Subjects, error } = await supabase
    .from("Subjects")
    .select("*,Teachers(*)")
    .eq("Name",name)
  if (error) {
    console.error("Error fetching teachers leave data:", error);
    return null;
  }
  return Subjects;
}
