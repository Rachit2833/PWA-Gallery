import "@/app/_Styles/fullprofile.css";
import { getTeachers } from "@/app/_Lib/getTeachers";
import bg from "@/public/bg.webp";
import bg2 from "@/public/im.jpeg";
import Image from "next/image";
import profilePicture from "@/public/abc.jpg";

async function Page({params}) {
  let teacherData=await getTeachers() 
   teacherData=teacherData.filter((item)=>{
   
     return item.id === Number(params.teacherId);
   })


  return (
    <main style={{gridColumn:"span 2"}}>
      <div className="profile-container">
        <div className="banner" style={{ position: "relative", zIndex: "0" }}>
          <Image style={{ margin: "0 auto" }} src={bg} fill alt="Banner" />
        </div>
        <div
          className="profile-header"
          style={{ position: "relative", zIndex: "10", paddingTop: "80px" }}
        >
          <Image
            className="avatar"
            style={{
              margin: "0 auto",
              zIndex: "10",
            }}
            src={profilePicture}
            width={120}
            height={120}
            alt="Profile Avatar"
          />
          <h1 style={{ marginTop: "70px" }}>{teacherData[0].Name}</h1>{" "}
          {/* Adjust marginTop to create the desired space */}
          <h2>Professor of Computer Science</h2>
          <div className="contact-info">
            <p>
              Email:{" "}
              <a href="mailto:jane.doe@university.edu">
                jane.doe@university.edu
              </a>
            </p>
            <p>
              Phone: <a href="tel:1234567890">(123) 456-7890</a>
            </p>
            <p>Office: Room 123, CS Building</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Biography</h3>
          <p>
            Dr. Jane Doe is a renowned expert in artificial intelligence and
            machine learning with over 20 years of experience in academia and
            industry. She has contributed significantly to the field through her
            research, publications, and teaching. Her work focuses on developing
            intelligent systems that can learn and adapt in real-world
            environments.
          </p>
        </div>

        <div className="profile-section">
          <h3>Research Interests</h3>
          <ul>
            <li>Artificial Intelligence</li>
            <li>Machine Learning</li>
            <li>Data Science</li>
            <li>Robotics</li>
          </ul>
        </div>

        <div className="profile-section">
          <h3>Publications</h3>
          <ul>
            <li>
              Doe, J., & Smith, A. (2020). Title of the paper. Journal Name,
              50(3), 123-145.
            </li>
            <li>
              Doe, J., & Johnson, B. (2019). Another paper title. Another
              Journal Name, 45(2), 67-89.
            </li>
            <li>
              Doe, J. (2018). A third paper title. Yet Another Journal, 40(1),
              33-55.
            </li>
          </ul>
        </div>

        <div className="profile-section">
          <h3>Courses Taught</h3>
          <ul>
            <li>Introduction to Artificial Intelligence</li>
            <li>Advanced Machine Learning</li>
            <li>Data Structures and Algorithms</li>
          </ul>
        </div>

        <div className="profile-section">
          <h3>Awards and Honors</h3>
          <ul>
            <li>Best Researcher Award, University, 2021</li>
            <li>AI Innovator of the Year, Industry Association, 2019</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Page;
