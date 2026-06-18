# GIRMAIC Ethiopia AI Helper - Persistent Agent Instructions

These instructions are loaded by the system to maintain the high aesthetic, structural, and state persistence standards of the **GIRMAIC Ethiopia AI Helper** application.

---

## 🎨 Visual Identity & Styling Reference
* **Core Vibe**: Modern Swiss-minimalist coupled with high-contrast, premium dark elements representing the beautiful landscapes of Ethiopia.
* **Palette Accents**:
  * Primary highlight: `#E5D3B3` (Warm Sand / Alabaster)
  * Secondary highlights: `#CD5C5C` (Indian Red / Terracotta) and `#DAA520` (Goldenrod / Honey)
  * Canvas base: Deep carbon levels (`stone-950` / `stone-900` / ultra-opaque neutral blacks)
* **Typography**: Clean, geometric `"Inter"` display lettering matched with `"JetBrains Mono"` for state trackers, transaction identifiers, and dev consoles.
* **Animations**: Gentle micro-animations (`motion/react` fade-ins, status pulses) to reinforce dynamic actions.

---

## 🗄️ State Persistence & Storage Keys
To protect offline-first citizen progress, agricultural audits, and roster status, the application relies on the following local data keys:
1. `girmaic_user_session`: Matches current citizen credentials and login node.
2. `girmaic_registered_users`: Full user registry pool for the National Fayda interface bypass.
3. `girmaic_team_members`: active rosters of field representatives, soil experts, and agricultural specialists.

**Security Gateway Policy**:
Any micro-app feature that processes personalized soil audits, resumes, or invitation dispatches **MUST** verify `{userSession?.loggedIn}`. If missing, render the bespoke **GIRMAIC Secure Gateway Lock** urging identity confirmation.

---

## 🤝 Team Registry & Role Scopes
The National Team Registry supports four roles that route direct agricultural advisor privileges:
* `Admin`: Complete system management and portal monitoring.
* `Expert Support`: Academic validation of soil log anomalies.
* `Field Representative`: On-the-ground soil advisories and localized metrics.
* `Farming Practitioner`: general roster overview.

**Permitted Actions**:
1. **Send Onboarding Invite**: Creates dynamic records tracking `id`, `fullName`, `email`, `role`, and `status: "Invited"`.
2. **Role Selection Dropdown**: Updates role properties reactively.
3. **Resend Beacon**: Triggers a simulated invitation resend in logs.
4. **Revoke Access**: Deletes records securely (Owner role is system-protected).
