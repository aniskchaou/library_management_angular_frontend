# Changelog

All notable changes to Library Lab are documented here.

---

## [1.1.0] — 2026-07-04

### Added — Guest Portal (Angular Frontend)

- **`/new-arrivals`** — `NewArrivalsComponent`  
  Fetches all books from `/book/all`, filters by configurable date window (7/30/60/90/180/365 days), supports search by title/author/ISBN, category filter dropdown, and "This week / This month" badge display.

- **`/browse`** — `BrowseComponent`  
  Two-column layout with a sidebar category list (loaded from `/category/all`) and a main book grid. Clicking a category filters books by that category. Sort by title, author, or publication year.

- **`/faq`** — `FaqComponent`  
  Static FAQ with 5 topic sections (Membership, Borrowing, Catalog, Payments, Technical), accordion expand/collapse, and a live search filter that highlights matching questions.

- **`/about`** — `AboutComponent` (registered in routing)
- **`/contact`** — `ContactComponent` (registered in routing)
- **`/member-register`** — `MemberRegisterComponent` — 3-step self-registration wizard

- **`GuestNavbarComponent`** — shared navbar used across all guest pages with `activePage` input for active link highlighting. Integrated into OPAC home page, replacing old static topbar.

### Changed — Angular

- `app.module.ts`: Added declarations and public routes (no `canActivate`) for all 7 guest components. Added `AdvancedSearchComponent` to declarations (was routed but undeclared).
- `opac-home.component.html`: Replaced static `<header class="fo-topbar">` with `<app-guest-navbar activePage="home">`.
- `chatbot.component.ts` / `.html`: Moved Enter-key handler to `handleEnterKey()` method — Angular templates do not support semicolons inside ternary expressions.
- `member-register.component.css`: Recreated full CSS for 3-step wizard (`.mr-root`, `.mr-steps`, `.mr-card`, `.mr-success`).

### Fixed — Angular Build Errors

- **TS2307** (×7): `super-admin` components had wrong service import path `../../services/` → corrected to `../services/` for: `coupons`, `invoices`, `branch-management`, `monitoring`, `growth-report`, `user-analytics`, `global-settings`.
- **NG5002**: Chatbot template had semicolons in ternary inside `(keydown.enter)` binding — extracted to method.
- **TS2339**: `Member.photoUrl` was undefined — added optional fields `photoUrl?`, `membershipExpiry?`, `maxBorrowLimit?`, `memberPassword?` to `Member` model.
- **TS1128**: Extra stray `}` brace removed from `view-member.component.ts`.
- **TS2345**: `login.component.ts` subscribe callback typed as `any[]` → changed to `any`.
- **NG8002**: `AdvancedSearchComponent` was used in routing but missing from `declarations` — added.

### Fixed — Java Backend Compile Errors

- `BookController.java`: Added missing closing `}` (file ended mid-class).
- `Member.java` (entity): Added missing closing `}` after last getter/setter.
- `MemberController.java`: Added missing closing `}` at end of file.
- `RequestedBook.java`: Removed orphaned getter/setter code that appeared after the class closing brace.

### Backend Status

- Spring Boot backend compiles cleanly (`mvnw compile` exits 0).
- Backend starts successfully; all Hibernate DDL executes without errors.
- PostgreSQL schema created/updated on startup via `spring.jpa.hibernate.ddl-auto`.
- API running on port **9090**, Angular frontend on port **4200**.

---

## [1.0.0] — December 2020

### Initial Release

- Spring Boot 2.x backend with JWT authentication.
- Angular frontend with admin panel.
- Book management: add, edit, delete, search.
- Member management and circulation (checkout / check-in).
- Category, author (writer), publisher management.
- QR code and barcode generation.
- E-book support.
- Basic reporting and dashboard analytics.
- Email notifications (SMTP).
- OPAC member portal with login.
- PostgreSQL database with JPA/Hibernate.
