import { Suspense } from "react";
import Loading from "../../loading";
import AllSubSlide from "../../_Components/AllSubSlide";
import AssignmentSlab from "../../_Components/AssignmentSlab";
import EvaluationSlab from "../../_Components/EvaluationSlab";
export const revalidate = 0;
function Page({ params }) {
  let sub =params.subject
  sub = sub.replace(/%20/g, ' ');
  return (
    <div style={{ gridColumn: "span 2" }}>
      <h2>{sub}</h2>

      <main>
        <Suspense fallback={<Loading />}>
          <AssignmentSlab sub={sub} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <EvaluationSlab sub={sub} />
        </Suspense>
      </main>
    </div>
  );
}

export default Page;
