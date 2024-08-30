import { useState, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import signInLayout from "../assets/layout.svg";
import signInLayout2 from "../assets/signInlayout2.svg";


function MinimalLayout() {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [path, setPath] = useState("");
  
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
      <main className="minimal_container">
        <section
          className="minimal_left_signIn"
          style={{ position: "relative" }}
        >
          <img
            src={path === "/" ? signInLayout : signInLayout2}
            alt=""
            className="minimal_left_banner"
          />
        </section>
        <section className="minimal_right">
          <div className="minimal_right_container">{outlet}</div>
        </section>
      </main>
  );
}

export default MinimalLayout;
