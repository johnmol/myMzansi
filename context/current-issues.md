[cv/generate] request started { hasSlug: false, hasUserId: true }
[cv/generate] authenticated user branch { userId: <REDACTED_USER_ID> }
[cv/generate] generating authenticated PDF { userId: <REDACTED_USER_ID> }
[cv/service] rendering authenticated CV { userId: <REDACTED_USER_ID>, credentialCount: 1 }
[cv/service] pdf render failed for authenticated CV {
	userId: <REDACTED_USER_ID>,
	renderError: TypeError: Cannot read properties of undefined (reading 'hasOwnProperty')
			at generateCVForUserId (src/services/cv.service.tsx:43:23)
			at async GET (app/api/cv/generate/route.ts:49:22)
}

Latest analysis:
- The server route, auth check, profile load, and credential load are all succeeding.
- The crash is isolated to `@react-pdf/renderer` during `pdf(doc).toBuffer()`.
- The CV template has already been reduced and re-expanded incrementally, so the remaining issue is likely renderer/runtime compatibility rather than app data access.