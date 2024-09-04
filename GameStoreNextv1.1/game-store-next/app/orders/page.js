import { Inter } from "next/font/google";
import { Suspense } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/app/_Styles/todo.css";
import AllSubSlide from "../_Components/AllSubSlide";
import DashBoardWrapper from "../_Components/DashBoardWrapper";
import LeaveWrapper from "../_Components/LeaveWrapper";
import ToDoList from "../_Components/ToDoList";
import { getCancelledClasses } from "../_Lib/getCancelledClasses";
import { getConcludedClasses } from "../_Lib/getConcludedClasses";
import { getExtraClasses } from "../_Lib/getExtraClasses";
import { getLeave } from "../_Lib/getLeave";
import { getClassAttendance } from "../_Lib/getSubjectAttendance";
import { getSubjects } from "../_Lib/getSubjects";
import { getTimeTable } from "../_Lib/getTimeTable";
import Loading from "../loading";
import { auth } from "../_Lib/auth";

export const revalidate = 0;

const inter = Inter({
  subsets: ["latin"],
});

function formatDate(date) {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function getCurrentDay() {
  const currentDate = new Date().getDay() % 7;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[currentDate];
}

function replaceSpacesWithUnderscores(str) {
  str = str.toString();
  return str.replace(/ /g, "_");
}

async function Page({ searchParams }) {
  const subject = searchParams.subject ? searchParams.subject.toString() : "";
  const type = searchParams.type ? searchParams.type.toString() : "";
  const transformedSubject = replaceSpacesWithUnderscores(subject);
  const day = getCurrentDay();
  const session =  await auth()

  // Fetch all data concurrently
  const [
    classes,
    leave,
    extraClasses,
    subjects,
    studentList,
    concludedClasses,
    cancelledClasses,
  ] = await Promise.all([
    getTimeTable(day),
    getLeave(12),
    getExtraClasses(),
    getSubjects(),
    getClassAttendance(transformedSubject),
    getConcludedClasses(12),
    getCancelledClasses(12),
  ]);

  const filteredClasses = classes.filter((data) => data.Teachers.id === 12);
  const filteredExtraClasses = extraClasses.filter(
    (data) =>
      data.Teacher === session.user.TeacherId &&
      data.Date === formatDate(new Date())
  );
  const pastClasses = concludedClasses.concat(cancelledClasses);
  return (
    <main className={inter.className} style={{ gridColumn: "span 2" }}>
      <Suspense fallback={<Loading />}>
        <AllSubSlide />
      </Suspense>

      <div
        className="frontGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "2.75fr 1.25fr",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        
        <DashBoardWrapper
          type={type}
          transformedSubject={transformedSubject}
          studentList={studentList}
          pastClasses={pastClasses}
          subjects={subjects}
          extraClasses={filteredExtraClasses}
          classes={filteredClasses}
          leave={leave}
        >
          <div
            className="one"
            style={{
              borderRadius: "15px",
              boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
              border: "1px solid rgba(132, 139, 200, 0.18)",
              padding: "2rem",
              overflow: "auto",
            }}
          >
            <Suspense fallback={<Loading />}>
              <LeaveWrapper />
            </Suspense>
          </div>
        </DashBoardWrapper>
        <div
          style={{
            display: "grid",
            gridColumn: "2",
            gridTemplateRows: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Calendar className="cal" />
          <ToDoList />
        </div>
      </div>
    </main>
  );
}

export default Page;
