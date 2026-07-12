import { useEffect, useState } from 'react'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

/**
 * Paper ⇄ night-edition toggle. Defaults to the light paper canvas (the
 * signature look) and only switches on explicit user choice — no
 * prefers-color-scheme auto-follow. The choice is remembered in localStorage
 * and applied as data-theme on <html>, which re-skins the token variables.
 * An inline script in index.html applies a saved 'dark' choice before paint
 * to avoid a flash.
 */
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore write failures (private mode, etc.) */
    }
  }, [theme])

  const next: Theme = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next === 'dark' ? 'night' : 'paper'} edition`}
      title={`Switch to ${next === 'dark' ? 'night' : 'paper'} edition`}
      className="text-ink/55 hover:text-vermilion transition-colors p-1.5 -m-1.5"
    >
      {theme === 'light' ? <FaRegMoon size={15} /> : <FaRegSun size={16} />}
    </button>
  )
}
