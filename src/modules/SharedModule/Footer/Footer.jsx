import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// ─── Constants ────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', to: '/about'   },
    { label: 'Careers',  to: '/careers' },
    { label: 'Contact',  to: '/contact' },
  ],
  Services: [
    { label: 'Buy Property',  to: '/buy'    },
    { label: 'Rent Property', to: '/rent'   },
    { label: 'Sell Property', to: '/sell'   },
    { label: 'Find Agents',   to: '/agents' },
  ],
  Support: [
    { label: 'Help Center',      to: '/help'    },
    { label: 'Terms of Service', to: '/terms'   },
    { label: 'Privacy Policy',   to: '/privacy' },
  ],
};

// ─── Sub Components ───────────────────────────────────────────────────────────
const FooterCol = ({ title, links }) => (
  <Col md={2}>
    <div className="footer-col">
      <h6>{title}</h6>
      <ul>
        {links.map(link => (
          <li key={link.label}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  </Col>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <Container>
        <Row>

          {/* ── Brand ── */}
          <Col md={4}>
            <div className="footer-brand d-flex align-items-center gap-2">
              <i className="fa-solid fa-house" />
              <span>Homiom</span>
            </div>
            <p className="footer-desc">
              Saudi Arabia's leading real estate platform
            </p>
          </Col>

          {/* ── Link Columns ── */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <FooterCol key={title} title={title} links={links} />
          ))}

        </Row>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p>© 2026 Homiom.com. All rights reserved.</p>
        </div>

      </Container>
    </footer>
  );
}