import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socials = [
  { label: 'GitHub', href: 'https://github.com/chie7tain', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ifeanyi-okwuobi', Icon: FaLinkedin },
  { label: 'Twitter', href: 'https://twitter.com/chie7tain', Icon: FaXTwitter },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-main-white/50">
          © {new Date().getFullYear()} Ifeanyi Fredrick Okwuobi
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:fredrickokwuobi@gmail.com"
            className="text-sm text-main-white/50 hover:text-main-white transition-colors"
          >
            fredrickokwuobi@gmail.com
          </a>
          <span className="w-px h-4 bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-main-white/50 hover:text-main-white transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
