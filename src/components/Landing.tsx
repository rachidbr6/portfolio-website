import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hi there, I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
            <div className="landing-school-badge">
              <span>Student at</span>
              <img src="/images/ensgsi-logo.svg" alt="ENSGSI Nancy" />
            </div>
          </div>
          <div className="landing-info">
            <div className="landing-industry-badge">
              <span className="landing-industry-badge-dot" />
              Industry 4.0
            </div>
            <h1 className="landing-main-title">{config.developer.title}</h1>
            <p className="landing-main-subtitle">{config.developer.tagline}</p>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src="/images/rachid.jpg"
              alt="Rachid Bourjila"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={900}
              height={940}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
