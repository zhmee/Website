import { useEffect, useState } from "react";
import "./App.css";

const NAME = "Michelle ";
const EMAIL = "mz625@cornell.edu";
const RESUME = "/resume.pdf";
const DIVIDER = `${import.meta.env.BASE_URL}Divider.svg`;

// Divider
function SectionDivider() {
  return (
    <div className="divider-seam" aria-hidden="true">
      <img className="divider" src={DIVIDER} alt="" />
    </div>
  );
}

// Scroll progress indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;

        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}


// Experience data
const experiences = [
  {
    role: "Software Development Engineering Intern",
    company: "Amazon",
    dates: "Jun – Aug 2026",
    kind: "Internship",
    description:
      "Built and deployed a Python forecasting model to predict operational volumes. Validated performance through backtesting and automated the forecasting pipeline.",
  },
  {
    role: "Research Assistant",
    company: "NSF REU · UMBC",
    dates: "Summer 2025",
    kind: "Research",
    description:
      "Explored machine learning methods for classifying prompt gamma signals in proton beam radiotherapy.",
  },
  {
    role: "Course Consultant",
    company: "Cornell University · CS 3110",
    dates: "Aug 2025 – Present",
    kind: "Teaching",
    description:
      "Help students develop their functional programming skills through office hours and course support.",
  },
];

// Project data
const projects = [
  {
    title: "CamlNom",
    category: "Software",
    image: "/images/camlnom.png",
    summary:
      "A Cornell dining exploration tool for finding meals and sharing recommendations.",
    details:
      "Built with OCaml, featuring menu updates through web scraping, dietary filters, community reviews, and customizable plates.",
    tags: ["OCaml", "Web Scraping", "Full-Stack"],
    link: "",
  },
  {
    title: "AutoBoat Website",
    category: "Web",
    image: "/images/autoboat.png",
    summary:
      "A website showcasing Cornell AutoBoat's team, technical work, and competitions.",
    details:
      "Designed and developed interactive pages to communicate the team's engineering work, history, and sponsorship opportunities.",
    tags: ["Web Development", "UI/UX"],
    link: "",
  },
];

// Image with placeholder fallback
function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return !src || failed ? (
    <div
      className={`photo-placeholder ${className}`}
      role="img"
      aria-label={`${alt} — add your photo`}
    >
      <small>Picture</small>
    </div>
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

// Heading code
function SectionHeading({ title, description }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
      </div>

      {description && <p>{description}</p>}
    </div>
  );
}

//  Project showcases
function ProjectShowcase({ project, index, total }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `project-notes-${index}`;

  return (
    <article
      className={`project-showcase ${
        index % 2 ? "project-showcase--light" : "project-showcase--dark"
      }`}
    >
      <div className="project-showcase-inner">
        
          <div className="project-meta">
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <span>{project.category}</span>
          </div>

          <h3>{project.title}</h3>

          <p className="project-summary">{project.summary}</p>

          <div className="project-image-frame">
            <Photo
              src={project.image}
              alt={`${project.title} screenshot`}
              className="showcase-image"
            />
          </div>

          <div className="showcase-bottom">
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <button
              className="showcase-details-button"
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Hide project notes −" : "Explore project notes +"}
            </button>
          </div>

          {expanded && (
            <div className="showcase-notes" id={panelId}>
              <p>{project.details}</p>

              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  View project ↗
                </a>
              )}
            </div>
          )}
      </div>
    </article>
  );
}

// Main screen
export default function App() {
  const [tab, setTab] = useState("work");
  return (
    <>
      <ScrollProgress />

      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top">
            {NAME}
            <span className="wordmark-dot">.</span>
          </a>

          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            className="header-resume"
            href={RESUME}
            target="_blank"
            rel="noreferrer"
          >
            Résumé ↗
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Michelle</h1>

            <p className="hero-description">
              I'm a student double majoring in Computer Science and Operations
              Research & Engineering at Cornell University. I enjoy solving
              technically challenging problems and building impactful software,
              with interests spanning full-stack development, machine learning,
              and AI.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work ↗
              </a>

              <a
                className="button button-outline"
                href={RESUME}
                target="_blank"
                rel="noreferrer"
              >
                View résumé ↗
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-photo-back" aria-hidden="true" />

            <div className="hero-photo-frame">
              <Photo
                src="/images/cornell.jpg"
                alt="Cornell campus"
                className="hero-photo"
              />
            </div>

            <div className="interest-note">
              <span className="note-title">Cornell University</span>
              <span>College of Engineering</span>
              <span>
                Double Major: Computer Science, Operations Research &
                Engineering
              </span>
              <span>Graduating Dec. 2027</span>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ABOUT */}
        <section
          className="content-section page-width about-section"
          id="about"
        >
          <div className="about-layout">
            <div className="about-copy">
              <p>
                I'm a Computer Science and Operations Research & Engineering
                double major at Cornell University. I enjoy solving technically
                challenging problems and building software that makes a
                real-world impact. My interests span software engineering,
                full-stack development, machine learning, and AI.
              </p>

              <p>
                Outside of coursework, I enjoy exploring new ideas, working on
                personal projects, and watching Formula 1 races on the weekends.
              </p>

              <div className="about-facts">
                <div>
                  <span>STUDYING</span>
                  <strong>Computer Science + ORIE</strong>
                </div>

                <div>
                  <span>AT</span>
                  <strong>Cornell University</strong>
                </div>

                <div>
                  <span>Graduating</span>
                  <strong>Dec. 2027</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* WORK + PROJECTS (toggle) */}
        <section
          className={`work-section ${
            tab === "projects" ? "work-section--dark" : ""
          }`}
          id="work"
        >
          <div className="page-width">
            <div
              className="work-toggle"
              role="group"
              aria-label="Choose work or projects"
            >
              <button
                type="button"
                id="tab-work"
                aria-pressed={tab === "work"}
                onClick={() => setTab("work")}
              >
                Work
              </button>
              <button
                type="button"
                id="tab-projects"
                aria-pressed={tab === "projects"}
                onClick={() => setTab("projects")}
              >
                Projects
              </button>
            </div>
          </div>

          {tab === "work" ? (
            <div className="page-width" id="panel-work">
              <SectionHeading title="Work & Experiences" />

              <div className="experience-list">
                {experiences.map((job, index) => (
                  <article
                    className="experience-item"
                    key={`${job.company}-${index}`}
                  >
                    <div className="experience-date">{job.dates}</div>

                    <div className="experience-main">
                      <span className="experience-kind">{job.kind}</span>
                      <h3>{job.role}</h3>
                      <p className="experience-company">{job.company}</p>
                      <p className="experience-description">
                        {job.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div id="panel-projects">
              <div className="page-width projects-intro">
                <SectionHeading title="Selected projects" />
              </div>

              {projects.map((project, index) => (
                <ProjectShowcase
                  key={project.title}
                  project={project}
                  index={index}
                  total={projects.length}
                />
              ))}
            </div>
          )}
        </section>

        <SectionDivider />

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="page-width contact-inner">
            <p>Have an opportunity? I'd love to hear from you!</p>

            <a className="button button-primary" href={`mailto:${EMAIL}`}>
              Contact
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <span>
          © {new Date().getFullYear()} {NAME}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
