import { Inter } from "next/font/google";
import { Suspense, lazy, } from "react";
import SubSlide from "./_Components/SubSlide";
import Loading from "./loading";

const Announcement = lazy(() => import("./_Components/Announcement"));
const MiniTimetable = lazy(() => import("./_Components/MiniTimetable"));
const Teachers = lazy(() => import("./_Components/Teachers"));
const Loader = lazy(() => import("./_Components/Loader"));

const inter = Inter({
  subsets: ["latin"],
});


async function page() {

  
  return (
    <>
      <main className={inter.className}>
        <h2 >Attendance</h2>
      <Suspense fallback={<Loading />}>
 <SubSlide />
      </Suspense>
        <div className={`timetable`} id="timetable">
        <h2>Time Table</h2>
          <Suspense fallback={<Loading />}>
            <MiniTimetable expanded={false} />
          </Suspense>
        </div>
      </main>
      <div className="right">
        <div className="announcements">
          <h2>Announcements</h2>
          <Suspense fallback={<Loading />}>
            <Announcement />
          </Suspense>
        </div>
        <div className="leaves">
          <h2>Teachers on leave</h2>
          <Suspense fallback={<Loading />}>
            <Teachers />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default page;
