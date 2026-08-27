# Kyiv Legal Group — design specification

## Scope

Build a responsive multi-page legal-services website from the provided desktop references. The implementation covers the home page, Services, About, Advantages, Reviews, Contacts, Privacy Policy, and Public Offer.

## Architecture

- React application built with Vite and React Router.
- Routes: `/`, `/services`, `/about`, `/advantages`, `/reviews`, `/contacts`, `/privacy`, and `/offer`.
- A shared shell provides the header, responsive navigation, consultation CTA, and footer.
- Page data is stored in typed content arrays. Reusable cards and content blocks receive their content as props.
- Supplied woman portrait, logo, and service-icon sheet are copied into local static assets. Lucide icons cover supporting UI glyphs where necessary.

## Components

- `SiteHeader`, `MobileMenu`, and `SiteFooter` define global navigation.
- `Hero` supports title, eyebrow/breadcrumbs, description, stats, actions, and portrait treatment.
- `SectionHeading`, `StatStrip`, `FeatureCard`, `ServiceCard`, `CaseCard`, `TestimonialCard`, and `ContactCard` establish consistent layouts.
- `FaqAccordion` provides keyboard-accessible disclosure controls.
- `ConsultationForm` validates locally and displays an in-page success state; it does not submit data to an external service.

## Design system

- Warm white page background, graphite text, muted gold accent, and a near-black footer.
- Display headings use a high-contrast serif face; UI and body copy use a restrained sans-serif face.
- Desktop content is held inside a roughly 1280 px container with generous whitespace, rounded cards, and light gold borders.
- Desktop heroes place copy left and the supplied portrait right. The portrait has a soft white/faded left edge to blend into the copy area.
- Cards and section ordering follow the provided page-specific reference screens.

## Responsive behaviour

- Wide grids reduce from four/three columns to two columns on tablet, then one column on mobile.
- Heroes stack text above imagery below tablet widths.
- The desktop navigation collapses to an accessible mobile menu; CTAs remain visible.
- Inputs and primary actions are full-width on mobile. Tables on legal pages become horizontally scrollable if needed.

## Interaction and accessibility

- Header and footer links route to their corresponding pages.
- CTA buttons scroll to or navigate to the consultation form; telephone, email, and Telegram links use their native URL schemes.
- Form fields require name, telephone, email, message, and privacy consent. Invalid fields receive inline feedback.
- FAQ items open and close individually, with `aria-expanded`, labelled controls, visible focus states, and semantic headings.
- The UI respects reduced motion and uses sufficient text/background contrast.

## Verification

- Run production build to catch type, lint, bundling, and route issues.
- Confirm each route renders, all navigation works, forms validate, and FAQ controls operate via keyboard.
- Review browser screenshots at desktop and mobile breakpoints for visual consistency with the supplied references.
