import "./styles/About.css";
import { config } from "../config";

const About = () => {
  const [hook, ...rest] = config.about.description.split("\n\n");

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-photo">
          <img src="/images/rachid.jpg" alt="Rachid Bourjila" loading="lazy" decoding="async" width={900} height={940} />
        </div>
        <h3 className="title">{config.about.title}</h3>
        <p className="para hook">{hook}</p>
        <div className="about-profiles">
          {config.about.profiles.map((profile) => (
            <span key={profile} className="about-profile-tag">
              {profile}
            </span>
          ))}
        </div>
        <div className="about-body">
          {rest.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="about-competencies">
          <h5>Core competencies</h5>
          <div className="about-competencies-flex">
            {config.about.competencies.map((competency) => (
              <div key={competency} className="about-competency-tag">
                {competency}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
