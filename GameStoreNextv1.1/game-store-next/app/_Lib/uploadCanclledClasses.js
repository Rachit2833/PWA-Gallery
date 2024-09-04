import supabase from "./Supabase";

export async function uploadCanclledClasses(newData){
  console.log(newData,"sjndkasnj");
   const { data, error } = await supabase
     .from("CancelledClasses")
     .insert(newData)
     .select();
   if (error) {
     console.error(error);
   } else {
     console.log(data); 
   }      

}