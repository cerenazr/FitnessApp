import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'

const SideLinks = () => {
  const links = [
    {
      href: 'https://www.instagram.com/madeleineabeid/',
      icon: <AiOutlineInstagram size={24} />,
      label: '@madeleineabeid',
      color: '#E1306C',
    },
    {
      href: 'https://www.youtube.com/@MadeleineAbeid',
      icon: <AiOutlineYoutube size={24} />,
      label: 'Subscribe for more',
      color: '#FF0000',
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        left: 0, // Sola yapışık
        top: '50%',
        transform: 'translateY(80%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 1000,
      }}
    >
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textDecoration: 'none',
            color: link.color,
            background: 'rgba(255, 255, 255, 0.9)',
            borderTopRightRadius: '24px',
            borderBottomRightRadius: '24px',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            padding: '8px',
            width: '48px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: 'width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={e => {
            const target = e.currentTarget
            target.style.width = '160px'
            target.style.background = 'rgba(255, 255, 255, 1)'
            target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
            const span = target.querySelector('span')
            if (span) span.style.opacity = '1'
          }}
          onMouseLeave={e => {
            const target = e.currentTarget
            target.style.width = '48px'
            target.style.background = 'rgba(255, 255, 255, 0.9)'
            target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
            const span = target.querySelector('span')
            if (span) span.style.opacity = '0'
          }}
        >
          <span
            style={{
              marginRight: 'auto',
              opacity: 0,
              transition: 'opacity 0.3s ease 0.15s',
              pointerEvents: 'none',
              fontWeight: '400',
              fontSize: '14px',
              userSelect: 'none',
            }}
          >
            {link.label}
          </span>
          <div style={{ flexShrink: 0 }}>{link.icon}</div>
        </a>
      ))}
    </div>
  )
}

export default SideLinks
