import supabase from "./Supabase";

export async function getExtraClasses() {
  let { data: Extra_Classes, error } = await supabase.from("Extra_Classes")
    .select(`
      *,
      Subjects (*),
      Teachers (*)
    `);

  if (error) {
    console.error("Error fetching extra classes:", error);
    return null;
  }

  return Extra_Classes;
}
