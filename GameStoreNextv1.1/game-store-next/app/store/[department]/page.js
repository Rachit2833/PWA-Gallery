import ProfileCard from "@/app/_Components/ProfileCard";
import { getTeachers } from "@/app/_Lib/getTeachers";
export const revalidate = 0;

async function Page({ params }) {
  let Teachers = await getTeachers();
  Teachers = Teachers.filter((item) => {
    return item?.Department === params.department;
  });
  return (
    <main style={{ gridColumn: "span 2" }}>
      <div 
        style={{
          height: "25rem",
          backgroundColor: "#313E81",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h1 style={{ color: "white", fontSize: "3rem" }}>
          {params.department.toUpperCase()}
        </h1>
      </div>
      <div className="pro-grid">
        {Teachers.map((item, index) => {
          return <ProfileCard key={index} data={item} />;
        })}
      </div>
    </main>
  );
}

export default Page;
