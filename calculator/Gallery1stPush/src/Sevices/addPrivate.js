import supabase from "../../Supabase";


export async function addToPrivate(data){
  console.log(data);
 var parsedData =  JSON.parse(data)
 console.log(parsedData)
try {
  const { error } = await supabase

  .from('Private')
  .insert([parsedData])
  .select()
} catch (error) {
  console.error(error);
}
          
}
