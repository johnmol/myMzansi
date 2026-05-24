# Unit 07: Credential Management

## Goal

Implement full CRUD for credentials in the dashboard so users can add, view, edit, and delete their qualifications with document upload.

## Design

- Follow `ui-context.md` (clean cards, Self-Reported badge in grey, teal accents)
- Credential list uses Card components
- Add form in a Dialog or dedicated page
- Clear "View Document" links
- Strong empty state

## Implementation

### 1. Credential Service
- Expand `src/services/credentials.service.ts` with:
  - `createCredential()`
  - `getCredentialsByUser()`
  - `updateCredential()`
  - `deleteCredential()`
  - File upload handling to Supabase Storage (`certificates` bucket)

### 2. UI Components
- Create `src/components/credentials/CredentialList.tsx`
- Create `src/components/credentials/CredentialForm.tsx` (title, institution_name, issue_date, expiry_date, nqf_level, file upload)

### 3. Dashboard Page
- Create/Update `app/dashboard/credentials/page.tsx`
- Show list of credentials
- Add New button that opens form
- Edit / Delete actions per credential

## Dependencies

- shadcn Dialog, Input, Textarea, Button (if not present)
- Upload component logic

## Verify when done

- [ ] User can add a credential with file upload
- [ ] List displays all credentials with correct fields and badge
- [ ] Edit and Delete work
- [ ] File is stored in Supabase and accessible
- [ ] Matches UI Context (especially credential cards)
- [ ] Works inside DashboardLayout
- [ ] `npm run build` succeeds
- Update `progress-tracker.md` and mark Unit 07 complete

**Important Constraints:**
- All credentials are self-reported (`is_verified = false`)
- Do not implement public profile display yet
- Keep form minimal (no advanced features)