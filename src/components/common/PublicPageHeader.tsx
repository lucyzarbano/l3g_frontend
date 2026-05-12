interface PublicPageHeaderProps {
  eyebrow?: string
  title: string
  intro?: string
}

export default function PublicPageHeader({ eyebrow = 'Le 3 Gemme', title, intro }: PublicPageHeaderProps) {
  return (
    <header className="public-page-header">
      <span className="public-page-header__eyebrow">{eyebrow}</span>
      <h1 className="animate-line">{title}</h1>
      {intro && <p>{intro}</p>}
    </header>
  )
}
