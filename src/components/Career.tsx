import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes(" - ")) {
    const [start, end] = period.split(" - ");
    return `${start}-${end === "Present" ? "NOW" : end}`;
  }
  return period; // Single year like "2025"
};

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-robot" aria-hidden="true">
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="200" y1="40" x2="200" y2="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="8" r="7" fill="currentColor" />
          <rect x="130" y="40" width="140" height="120" rx="28" stroke="currentColor" strokeWidth="2" />
          <circle cx="170" cy="100" r="11" fill="currentColor" />
          <circle cx="230" cy="100" r="11" fill="currentColor" />
          <line x1="168" y1="137" x2="182" y2="137" stroke="currentColor" strokeWidth="2" />
          <line x1="193" y1="137" x2="207" y2="137" stroke="currentColor" strokeWidth="2" />
          <line x1="218" y1="137" x2="232" y2="137" stroke="currentColor" strokeWidth="2" />
          <rect x="185" y="160" width="30" height="20" stroke="currentColor" strokeWidth="2" />
          <rect x="90" y="180" width="220" height="200" rx="24" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="270" r="38" stroke="currentColor" strokeWidth="1.5" />
          <circle className="career-robot-core" cx="200" cy="270" r="16" fill="currentColor" />
          <circle cx="90" cy="220" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="310" cy="220" r="10" stroke="currentColor" strokeWidth="2" />
          <line x1="90" y1="230" x2="80" y2="320" stroke="currentColor" strokeWidth="2" />
          <line x1="310" y1="230" x2="320" y2="320" stroke="currentColor" strokeWidth="2" />
          <line x1="110" y1="330" x2="290" y2="330" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="110" y1="350" x2="290" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="55" cy="150" r="2.5" fill="currentColor" />
          <circle cx="345" cy="150" r="2.5" fill="currentColor" />
          <line x1="55" y1="150" x2="90" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="345" y1="150" x2="310" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
