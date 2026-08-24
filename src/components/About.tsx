import "./styles/About.css";
import { config } from "../config";

const About = () => {
  const [hook, ...rest] = config.about.description.split("\n\n");

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-photo">
          <img src="/images/rachid.jpg" alt="Rachid Bourjila" loading="lazy" decoding="async" />
        </div>
        <h3 className="title">{config.about.title}</h3>
        <p className="para hook">{hook}</p>
        <div className="about-body">
          {rest.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
