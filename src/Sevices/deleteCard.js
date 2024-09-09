import supabase from "../../Supabase";

export async function deleteCard(data){
var parsedData =  JSON.parse(data)

try{
const { error } = await supabase
  .from('Images')
  .delete()
  .eq("id", parsedData.id)
}catch(error){
  console.log(error);
}
          
}