# Novax Implementation Plan

## Project Overview

**Novax** is a lightweight, hackathon-ready message builder application that enables users to create beautiful, customizable messages without backend persistence. All data is encoded in shareable URLs using compression.

## Problem Statement

Transform the Linnked codebase into Novax by:
- Using Unlayer Elements for beautiful email/document templates
- Integrating OpenRouter Gemini 2.5 for AI-powered message enhancement
- Removing database dependencies (Neon/Drizzle) in favor of URL-based data storage
- Maintaining the current beautiful UI aesthetic while rebranding to Novax
- Adding a clean, professional top navigation bar
- Keeping the full sender/recipient flow working without backend persistence

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Novax Frontend                        │
│  (Next.js 16 App Router - Client & Server Components)   │
└─────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼──────┐  ┌─────▼──────┐
    │ Unlayer    │   │ OpenRouter │  │ Cloudinary │
    │ Elements   │   │ Gemini API │  │ Upload API │
    │ (Local)    │   │ (External) │  │ (External) │
    └────────────┘   └────────────┘  └────────────┘
          │
    ┌─────▼─────────────────────────────────┐
    │   URL-Encoded Compressed Data         │
    │   (LZ-String in URL hash/param)       │
    └───────────────────────────────────────┘
```

## Data Flow

1. **Sender creates message** → Stores in Zustand state
2. **AI Enhancement (optional)** → Calls OpenRouter API → Updates message
3. **Preview** → Renders Unlayer Elements components with customizations
4. **Share** → Compresses entire message object → Generates shareable URL
5. **Recipient opens link** → Decompresses data from URL → Renders message → Can respond
6. **Response** → Updates URL hash with response data

## URL Data Structure

```typescript
interface NovaxMessageData {
  senderName: string;
  senderEmail: string;
  recipientName: string;
  template: 'romantic' | 'professional' | 'playful' | 'elegant';
  messageTitle: string;
  messageBody: string;
  aiGenerated: boolean;
  customization: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
  signatureImageUrl?: string;
  backgroundImageUrl?: string;
  icons: Array<{ position: number; iconSrc: string; iconNote?: string }>;
  response?: { choice: 'yes' | 'no'; respondedAt: string };
}

// URL Format: /message#${compressToEncodedURIComponent(JSON.stringify(data))}
```

## Technology Stack

- **Frontend Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Template Engine**: Unlayer Elements (~12KB gzipped)
- **AI Enhancement**: OpenRouter API (Gemini 2.0 Flash)
- **Data Encoding**: LZ-String (URL compression)
- **Image Uploads**: Cloudinary
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Implementation Tasks

### Task 1: Project Cleanup and Dependency Management ✓
**Objective**: Remove database dependencies and install new packages

**Actions**:
- Remove database-related code: `db/`, `drizzle/`, `drizzle.config.ts`
- Remove database API routes: `app/api/linnks/**`
- Uninstall: `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`, `nodemailer`, `resend`
- Install: `@unlayer/react-elements`, `lz-string`
- Update `package.json` scripts (remove db:* scripts)
- Clean up unused imports

**Test Requirements**: 
- Project builds successfully with `npm run build`
- No database-related errors in build output

**Demo**: Clean build output, minimal dependencies

---

### Task 2: Rebrand from Linnked to Novax ✅ COMPLETE
**Objective**: Update all branding and naming throughout codebase

**Actions**:
- Update all text references: "Linnked" → "Novax", "Linnk" → "Novax Message"
- Update metadata in `app/layout.tsx` (title, description)
- Update README.md with new project name
- Rename route folders: `app/(reciever)/linnk/` → `app/(reciever)/message/`
- Update all route references in code
- Update Zustand store names and types
- Update logo assets/references

**Test Requirements**: 
- Search codebase for "linnk" returns no results (except git history)
- All routes work with new naming

**Demo**: Landing page shows "Novax" branding, routes functional

---

### Task 3: Implement Top Navigation Bar ✅ COMPLETE
**Objective**: Replace sidebar with professional top navigation

**Actions**:
- Create `components/navigation.tsx` component with:
  - Novax logo/text (left)
  - Optional "Examples" link (center)
  - "Create Message" CTA button (right) linking to `/form`
  - Clean, minimal design with transparent/white background
  - Sticky positioning at top
- Update `app/page.tsx`: Remove `<Sidebar>`, remove fixed positioning
- Update layout for full-width content with top nav
- Maintain all existing page sections and content
- Update mobile responsiveness

**Test Requirements**: 
- Navigation visible on all pages
- Links work correctly
- Smooth scroll behavior
- Mobile-friendly

**Demo**: Landing page with professional top nav, all sections accessible

---

### Task 4: Set Up Unlayer Elements and Create Base Template System ✅ COMPLETE
**Objective**: Implement beautiful templates using Unlayer Elements

**Actions**:
- Install `@unlayer/react-elements`
- Create `components/templates/` directory
- Create base template wrapper component
- Create 4 template variants:
  - `RomanticTemplate.tsx` - Soft colors, hearts, elegant fonts
  - `ProfessionalTemplate.tsx` - Clean lines, business-appropriate
  - `PlayfulTemplate.tsx` - Bright colors, fun fonts, decorative elements
  - `ElegantTemplate.tsx` - Minimalist, sophisticated design
- Each template structure:
  - Use `<Email>`, `<Row>`, `<Column>` structure
  - Accept props: primaryColor, secondaryColor, fontFamily, backgroundColor
  - Include sections for: header icons, title, body, signature
  - Maintain colorful, lovely aesthetic
- Create utility: `renderTemplateToHtml(template, data)`

**Test Requirements**: 
- Each template renders correctly
- Accepts customization props
- Generates valid HTML

**Demo**: Four beautiful, distinct templates with different color schemes

---

### Task 5: Build Customization UI with Unlayer Prop Controls ✅ COMPLETE
**Objective**: Create UI for customizing template appearance

**Actions**:
- Create `components/customization/` directory
- Build color picker component (native `<input type="color">` or library)
- Build font selector dropdown (web-safe fonts + Google Fonts)
- Build background style selector (solid color, gradient, image upload)
- Update `store/form.store.ts` to include customization state
- Integrate customization UI into form flow
- Show live preview of changes
- Maintain icon selection and note-adding functionality

**Test Requirements**: 
- Customization changes update preview in real-time
- State persists across steps
- All controls functional

**Demo**: User can pick colors, choose fonts, see immediate visual feedback

---

### Task 6: Integrate OpenRouter Gemini 2.5 for AI Message Enhancement
**Objective**: Add AI-powered message improvement feature

**Actions**:
- Create environment variable `OPENROUTER_API_KEY`
- Create API route: `app/api/ai/enhance/route.ts`
  - Accepts: `{ message: string, messageTitle: string, context: string }`
  - Calls OpenRouter API with model `google/gemini-2.0-flash-exp:free`
  - Returns: `{ enhancedMessage: string, enhancedTitle: string }`
- Add "Enhance with AI" button to message writing step
- Show loading state while processing
- Display enhanced version with accept/reject option
- Add toggle to mark AI-generated messages

**Test Requirements**: 
- API route returns enhanced messages
- Button triggers enhancement
- Errors handled gracefully
- Loading states work

**Demo**: User writes message → clicks "Enhance with AI" → receives improved version

---

### Task 7: Implement URL-Based Data Storage with LZ-String Compression
**Objective**: Store all message data in shareable URLs

**Actions**:
- Install `lz-string`
- Create `helpers/data-encoding.ts`:
  - `encodeMessageData(data: NovaxMessageData): string`
  - `decodeMessageData(encoded: string): NovaxMessageData`
- Create TypeScript interface `types/message.ts` for `NovaxMessageData`
- Add Zod schema for runtime validation
- Update share flow to generate URL with compressed data
- Test compression ratio with realistic data
- Handle edge cases: corrupted data, missing data, URL too long

**Test Requirements**: 
- Data compresses/decompresses correctly
- URL length manageable (<2000 chars)
- Errors handled gracefully

**Demo**: Create message → generates URL → paste in new browser → message loads

---

### Task 8: Rebuild API Routes to Work Without Database
**Objective**: Remove all database-dependent API routes

**Actions**:
- Remove `app/api/linnks/` directory entirely
- Keep `app/api/ai/enhance/route.ts`
- Update form submission flow:
  - Remove POST to `/api/linnks`
  - Directly generate compressed URL from form data
  - No server-side storage needed
- Handle Cloudinary uploads client-side
- Update error handling throughout form flow

**Test Requirements**: 
- Form submission generates URL without backend calls
- Cloudinary uploads still work
- No database errors

**Demo**: Complete form flow → generates shareable link

---

### Task 9: Update Recipient Page to Decode URL-Based Messages
**Objective**: Enable recipients to view messages from URL data

**Actions**:
- Update `app/(reciever)/message/[id]/page.tsx`:
  - Read from URL hash/param instead of fetching by ID
  - Decode compressed data using `decodeMessageData()`
  - Populate recipient store with decoded data
  - Handle missing/corrupted data gracefully
- Keep existing recipient flow components
- Update response handling:
  - Responses modify URL hash
  - Show success message after responding
  - Provide updated shareable link with response
- Render Unlayer template with customizations

**Test Requirements**: 
- Recipient page loads from URL data
- Displays message correctly
- Response flow works

**Demo**: Open shared link → view message → respond → get confirmation

---

### Task 10: Update Preview Components to Use Unlayer Elements Rendering
**Objective**: Show accurate preview of final message

**Actions**:
- Update `app/(sender)/form/_components/preview.tsx` and `newPreview.tsx`
- Replace current preview with Unlayer template rendering
- Show live preview using selected template + customizations
- Display exactly what recipient will see
- Include option to download as HTML/PDF
- Maintain existing animations and transitions
- Test preview across different templates

**Test Requirements**: 
- Preview matches final recipient view
- All customizations visible
- Animations smooth

**Demo**: Preview shows accurate representation with all customizations

---

### Task 11: Update Share Components with New URL Generation
**Objective**: Generate and display shareable URLs

**Actions**:
- Update `app/(sender)/form/_components/share.tsx` and `NewShare.tsx`
- Generate compressed URL using `encodeMessageData()`
- Display shareable link with copy-to-clipboard
- Add QR code generation (optional)
- Show link preview/thumbnail
- Add social sharing buttons (WhatsApp, Email, SMS)
- Handle long URLs gracefully
- Add "Open in New Tab" button

**Test Requirements**: 
- URL generation works
- Copy functionality works
- Link opens correctly in new tab

**Demo**: Share screen displays clean URL, one-click copy, social sharing

---

### Task 12: Polish, Testing, and Vercel Deployment Configuration
**Objective**: Finalize app for hackathon submission

**Actions**:
- Update `README.md` with:
  - Clear project description
  - Setup instructions
  - Screenshots/GIFs of rendered templates
  - Technology stack explanation
  - Unlayer Elements integration details
- Add `.env.example` with required variables
- Create `vercel.json` if needed
- Test full user journey end-to-end
- Test edge cases: long messages, special characters, emoji, missing data
- Verify mobile responsiveness
- Run production build and test
- Deploy to Vercel and test deployed version

**Test Requirements**: 
- All flows work end-to-end
- No console errors
- Production build successful
- Deployed version functional

**Demo**: Fully functional app on Vercel with beautiful templates and AI enhancement

---

## Environment Variables Required

```env
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_preset
```

## Success Criteria

- ✅ No database dependencies
- ✅ Beautiful templates using Unlayer Elements
- ✅ AI message enhancement working
- ✅ All data stored in URLs
- ✅ Full sender/recipient flow functional
- ✅ Professional top navigation
- ✅ Mobile responsive
- ✅ Deployed on Vercel
- ✅ Clean, maintainable code
- ✅ Hackathon-ready presentation

## Timeline Estimate

- Tasks 1-2: 1-2 hours (cleanup and rebrand)
- Task 3: 1 hour (navigation)
- Tasks 4-5: 3-4 hours (templates and customization)
- Task 6: 2 hours (AI integration)
- Task 7: 2 hours (URL encoding)
- Tasks 8-9: 2 hours (API updates and recipient page)
- Tasks 10-11: 2 hours (preview and share)
- Task 12: 2 hours (polish and deployment)

**Total: ~15-17 hours**

---

## Notes

- Keep existing Cloudinary integration for images
- Maintain colorful, playful design aesthetic
- Focus on hackathon demo quality over production robustness
- Prioritize visual impact and user experience
- Test compression ratios to ensure URLs stay under 2000 characters
- Consider URL shortening service if needed for very long messages
