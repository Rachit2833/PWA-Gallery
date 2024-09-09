import supabase from "../../Supabase";

export async function deleteFromPrivate(data){
const parsedData= JSON.parse(data)

try {
    const { error } = await supabase
  .from('Private')
  .delete()
  .eq('id', parsedData.id)
} catch (error) {
    console.error(error);
}
          
}