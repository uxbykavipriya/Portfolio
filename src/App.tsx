import { createBrowserRouter, RouterProvider, useLocation } from "react-router";
import Portfolio from "./imports/Desktop7-6/index";
import CaseStudy1 from "./pages/CaseStudy1";
import CaseStudy2 from "./pages/CaseStudy2";
import CaseStudy3 from "./pages/CaseStudy3";
import CaseStudy4 from "./pages/CaseStudy4";
import AboutMe from "./pages/AboutMe";
import DiveDeeper from "./pages/DiveDeeper";
import CaseStudyNXTAAS from "./pages/CaseStudyNXTAAS";
import CaseStudyDishGenie from "./pages/CaseStudyDishGenie";
import CaseStudyVersar from "./pages/CaseStudyVersar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 5347;

function PortfolioPage() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(window.innerWidth / DESIGN_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <div style={{ width: "100vw", height: `${DESIGN_HEIGHT * scale}px`, overflowY: "clip" }}>
      <div style={{ width: `${DESIGN_WIDTH}px`, height: `${DESIGN_HEIGHT}px`, zoom: scale }}>
        <Portfolio scale={scale} />
      </div>
    </div>
  );
}

function ScaledPage({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(() => window.innerWidth / DESIGN_WIDTH);
  const innerRef = useRef<HTMLDivElement>(null);
  const [outerHeight, setOuterHeight] = useState(0);

  useEffect(() => {
    const update = () => setScale(window.innerWidth / DESIGN_WIDTH);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // getBoundingClientRect().height returns the actual rendered (zoomed) height
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setOuterHeight(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale]);

  return (
    <div style={{ width: "100vw", height: outerHeight ? `${outerHeight}px` : "100vh", overflowX: "clip" }}>
      <div ref={innerRef} style={{ width: `${DESIGN_WIDTH}px`, zoom: scale }}>
        {children}
      </div>
    </div>
  );
}

function withScroll(el: React.ReactNode) {
  return <><ScrollToTop />{el}</>;
}

const router = createBrowserRouter([
  { path: "/", element: withScroll(<PortfolioPage />) },
  { path: "/case-study/orion-cloudmax", element: withScroll(<ScaledPage><CaseStudy1 /></ScaledPage>) },
  { path: "/case-study/blackberry-athoc", element: withScroll(<ScaledPage><CaseStudy2 /></ScaledPage>) },
  { path: "/case-study/loan-workflow", element: withScroll(<ScaledPage><CaseStudy3 /></ScaledPage>) },
  { path: "/case-study/pediatrics", element: withScroll(<ScaledPage><CaseStudy4 /></ScaledPage>) },
  { path: "/about", element: withScroll(<ScaledPage><AboutMe /></ScaledPage>) },
  { path: "/dive-deeper", element: withScroll(<ScaledPage><DiveDeeper /></ScaledPage>) },
  { path: "/case-study/nxtaas", element: withScroll(<ScaledPage><CaseStudyNXTAAS /></ScaledPage>) },
  { path: "/case-study/dish-genie", element: withScroll(<ScaledPage><CaseStudyDishGenie /></ScaledPage>) },
  { path: "/case-study/versar", element: withScroll(<ScaledPage><CaseStudyVersar /></ScaledPage>) },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
