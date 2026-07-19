import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socials = [
  {
    label: "GitHub profile",
    href: "https://github.com/chie7tain",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn profile",
    href: "https://www.linkedin.com/in/fredricksylvester",
    Icon: FaLinkedin,
  },
  {
    label: "Twitter profile",
    href: "https://x.com/ol7mpian",
    Icon: FaXTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="mt-28 border-t-2 border-ink relative z-10">
      {/* Colophon masthead — the big closing call */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-vermilion mb-6">
          ◦ Colophon
        </p>
        <Link
          to="/contact"
          className="group inline-block font-display font-semibold tracking-tight text-ink leading-[0.95] text-5xl sm:text-6xl md:text-7xl"
        >
          Let’s build
          <br />
          something
          <span className="text-vermilion group-hover:not-italic italic transition-all">
            {" "}
            good.
          </span>
          <span
            aria-hidden="true"
            className="inline-block ml-4 align-middle text-vermilion transition-transform duration-300 group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
      </div>

      {/* Colophon index — set like the back matter of a printed issue */}
      <div className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-faded">
            © {new Date().getFullYear()} Ifeanyi F. Okwuobi
            <br />
            <span className="text-faded/70">Lagos, Nigeria · Remote</span>
          </p>

          <a
            href="mailto:fredrickangel.work@gmail.com"
            className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink hover:text-vermilion transition-colors md:text-center"
          >
            fredrickangel.work@gmail.com
          </a>

          <div className="flex items-center gap-5 md:justify-end">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink/60 hover:text-vermilion transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Typographic colophon line */}
      <div className="border-t border-hairline">
        <p className="max-w-6xl mx-auto px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-faded/70">
          Set in Fraunces &amp; Libre Franklin · Built with React &amp; Fastify
        </p>
      </div>
    </footer>
  );
}
