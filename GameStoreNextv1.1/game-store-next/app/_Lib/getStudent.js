import supabase from "./Supabase";

export async function getStudent(email) {
    let { data: Student, error } = await supabase

      .from("Student")
      .select("*")
      .eq("Email", email);
      if(!Student){
         return null;
      }
      return Student
}