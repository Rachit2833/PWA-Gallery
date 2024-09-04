import Image from "next/image";
import bg from "@/public/rsz_dsc3817.jpg";
import bg2 from "@/public/rsz_dsc7041.jpg";
import Link from "next/link";




const departments = [
  "Computer Science & Engineering",
  "Aerospace Technology & Engineering",
  "Aeronautics and Astronautics",
  "Chemical Engineering",
  "Electrical Engineering",
  "Materials Science and Engineering",
  "Nuclear Science and Engineering",
  "Biological Engineering",
];

async function Page() {

  
  return (
    <>
      <main style={{ gridColumn: "span 2" }}>
        <div
          style={{
            height: "25rem",
            backgroundColor: "#1b85b8",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h1 style={{ color: "white", fontSize: "3rem" }}>
            Our Distinguished Faculty Members
          </h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "4rem",
            padding: "2rem",
          }}
        >
          <div>
            <h2 style={{ margin: "1rem 2rem", fontSize: "2rem" }}>
              About Our Faculty
            </h2>
            <p style={{ margin: " 2rem", fontSize: "1.6rem" }}>
              Our faculty are more than just educators; they are passionate
              mentors, renowned researchers, and dedicated professionals
              committed to fostering a supportive and challenging academic
              environment. With diverse backgrounds and extensive expertise in
              their respective fields, our faculty members bring a wealth of
              knowledge and real-world experience into the classroom. They are
              devoted to inspiring and guiding students, encouraging critical
              thinking, and nurturing a lifelong love of learning. Whether
              through innovative teaching methods, groundbreaking research, or
              personalized mentorship, our faculty are dedicated to helping each
              student achieve their full potential and prepare for successful
              careers in an ever-evolving world.
            </p>
          </div>
          <Image alt="" src={bg} />
        </div>
        <div style={{ position: "relative", textAlign: "center" }}>
          <Image style={{ padding: "2rem" }} alt="" src={bg2} />
          <h2
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              zIndex: 10,
              padding: "2rem",
              fontSize: "3rem",
              textDecoration: "underline",
            }}
          >
            Education & Research
          </h2>
        </div>
        <h2 style={{ fontSize: "3rem", padding: "2rem" }}>
          Educating The Next Generation
        </h2>
        <p style={{ margin: " 2rem", fontSize: "1.6rem" }}>
          Our primary aim is to educate the next generation of leaders,
          innovators, and change-makers. We are dedicated to providing a
          transformative educational experience that equips students with the
          knowledge, skills, and values necessary to thrive in a rapidly
          evolving world. Our comprehensive curriculum is designed to foster
          critical thinking, creativity, and a deep understanding of global
          challenges. By integrating cutting-edge research, experiential
          learning, and a commitment to ethical leadership, we prepare our
          students to make meaningful contributions to society. We believe in
          nurturing a diverse and inclusive community where every student can
          reach their full potential and be inspired to pursue lifelong learning
          and impactful careers.
        </p>
        <p style={{ margin: " 2rem", fontSize: "1.6rem" }}>
          Our faculty, renowned for their expertise and dedication, play a
          crucial role in guiding students through their academic journey,
          inspiring a passion for inquiry and discovery. We emphasize
          interdisciplinary learning, encouraging students to explore diverse
          fields and perspectives to develop a holistic understanding of complex
          issues. Through robust partnerships with industries, communities, and
          global institutions, we provide students with real-world opportunities
          to apply their knowledge and skills, preparing them for successful
          careers and responsible citizenship.
        </p>
        <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
          Faculty By Department
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#bcd2d0",
            margin: "2rem",
          }}
        >
          {departments.map((department, index) => (
            <Link
              key={index}
              className="link"
              href={`/store/${department
                .toLowerCase()
                .replace(/ & | /g, "-")}`}
              style={{
                fontSize: "2rem",
                fontWeight: "400",
                color: "red",
                textDecoration: "underline",
                margin: "2rem 0",
              }}
            >
              {department}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Page;
