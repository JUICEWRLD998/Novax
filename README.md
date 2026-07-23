# NOVAX

## Built With Elements Challenge Submission

**Novax** is a lightweight, hackathon-ready message builder that lets you create beautiful, customizable messages without any backend persistence. All data is encoded in shareable URLs using compression.

### Project Concept

Novax showcases the power of Unlayer Elements by creating a boutique invitation-style message experience with premium narrative layouts, rich customization options, and AI-powered message enhancement. The entire project demonstrates how to build a complete messaging platform without traditional database infrastructure - everything lives in the URL.

### Key Features

- **Beautiful Templates**: Four distinct templates (Romantic, Professional, Playful, Elegant) built with Unlayer Elements
- **AI Enhancement**: OpenRouter Gemini 2.5 integration for improving message wording and tone
- **URL-Based Storage**: All message data compressed with LZ-String and embedded in shareable URLs
- **Full Customization**: Color pickers, font selectors, background options, and decorative icons
- **Complete Flow**: Sender creates → customizes → previews → shares → recipient responds
- **Zero Backend**: No database, no server-side storage - pure client-side magic

### What to Include for the Challenge

- ✅ Public GitHub repository
- ✅ Clear README with project explanation and run steps
- ✅ Screenshots/GIFs of the rendered templates
- ✅ Unlayer Elements as the core template engine
- ✅ Production-ready deployment on Vercel

### Local Preview

```bash
npm install
npm run dev
```

Then visit http://localhost:3000 and click "Create Message" to start building.

### Submission Summary

Novax demonstrates Unlayer Elements' capabilities in a real-world application: beautiful templates, easy customization, and production-ready rendering - all without a single database query.

---

## What Novax Does

Novax lets a sender create a custom message experience and generate a shareable URL. The recipient opens that link, reads the beautifully formatted message, and can respond with yes or no. All data is stored in the URL itself using compression - no backend required.

The flow works like this:

1. Enter sender and recipient details
2. Pick a template style (Romantic, Professional, Playful, or Elegant)
3. Write the message (optionally enhance it with AI)
4. Customize colors, fonts, and decorations
5. Preview the final result
6. Generate and share the compressed URL
7. Recipient opens the link and responds

## How To Use It

### Sender Flow

1. Open the app and click "Create Message"
2. Fill in your name, email, and the recipient's name
3. Choose one of four template styles
4. Write the title and body of the message
5. (Optional) Click "Enhance with AI" to improve the wording
6. Customize colors, fonts, and background
7. Add decorative icons and notes
8. Preview the message exactly as the recipient will see it
9. Generate the shareable URL and copy it
10. Share via WhatsApp, Email, SMS, or any method you prefer

### Recipient Flow

1. Open the shared Novax URL
2. View the welcome screen
3. Read the beautifully formatted message
4. Respond with yes or no
5. Get a confirmation and updated URL with the response

## Project Structure

The codebase is organized around the sender experience, the recipient experience, and the URL encoding system.

### App Routes

- `app/page.tsx` - Landing page with product story and features
- `app/(sender)/form/page.tsx` - Multi-step sender form
- `app/(reciever)/message/[id]/page.tsx` - Recipient experience that decodes URL data
- `app/api/ai/enhance/route.ts` - OpenRouter API integration for message enhancement

### Sender Side

- `app/(sender)/form/_components/` - Step-by-step form UI components
- `components/templates/` - Unlayer Elements-based template components
- `components/customization/` - Color pickers, font selectors, background options
- `store/form.store.ts` - Sender wizard state with Zustand
- `helpers/upload-media.ts` - Cloudinary integration for images
- `helpers/data-encoding.ts` - LZ-String compression for URL storage

### Recipient Side

- `app/(reciever)/message/[id]/_components/` - Welcome screen, main message, response UI
- `store/recipient.store.ts` - Recipient state management

### Templates

- `components/templates/RomanticTemplate.tsx` - Soft colors, hearts, elegant fonts
- `components/templates/ProfessionalTemplate.tsx` - Clean lines, business-appropriate
- `components/templates/PlayfulTemplate.tsx` - Bright colors, fun fonts
- `components/templates/ElegantTemplate.tsx` - Minimalist, sophisticated

### Supporting Code

- `components/` - Layout and reusable UI components
- `components/navigation.tsx` - Top navigation bar
- `hooks/` - Client-side utilities
- `types/message.ts` - TypeScript interfaces for message data

## Architecture Notes

### URL-Based Storage

Novax uses LZ-String compression to store all message data in the URL. The data structure includes:

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
```

URLs follow the pattern: `/message#${compressedData}`

### Unlayer Elements Integration

All templates are built using Unlayer Elements components:
- `<Email>` as the root container
- `<Row>` for layout structure
- `<Column>` for content sections
- `<Heading>`, `<Paragraph>`, `<Button>`, `<Image>`, `<Divider>` for content
- Props for customization (colors, fonts, spacing)
- `renderToHtml()` for generating email-safe HTML

### AI Enhancement

OpenRouter API integration provides message improvement:
- Model: `google/gemini-2.0-flash-exp:free`
- Enhances wording, tone, and emotional impact
- Preserves core meaning while improving expression
- Marks messages as AI-generated for transparency

## Tech Stack

- **Frontend Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Template Engine**: Unlayer Elements (~12KB gzipped)
- **AI Enhancement**: OpenRouter API (Gemini 2.0 Flash)
- **Data Encoding**: LZ-String (URL compression)
- **Image Uploads**: Cloudinary
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **Animation**: Motion, canvas-confetti
- **Deployment**: Vercel

## Environment Variables

Create a `.env.local` file with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_preset
```

Note: No database credentials required!

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the landing page.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Why Novax?

Traditional messaging apps require:
- Database setup and maintenance
- Backend API development
- User authentication
- Data migration strategies
- Hosting costs for storage

Novax eliminates all of that by:
- Storing data in URLs (free, instant, no setup)
- Using Unlayer Elements for beautiful templates
- Leveraging AI for message enhancement
- Keeping everything client-side

Perfect for:
- Hackathon projects
- Quick prototypes
- Personal messages
- No-infrastructure demos
- Learning Unlayer Elements

## Technical Highlights

### Compression Performance

Typical message with full customization: ~800 characters uncompressed
After LZ-String compression: ~300 characters
Final URL length: < 350 characters (well under the 2000 character safe limit)

### Template Rendering

Unlayer Elements provides:
- Email-client safe HTML
- No React hydration markers
- Inline CSS for compatibility
- Responsive layouts
- Accessibility compliance

### AI Integration

OpenRouter provides:
- Free Gemini 2.0 Flash access
- OpenAI-compatible API
- Fast response times (~2-3 seconds)
- High-quality message enhancement

## Future Enhancements

- URL shortening integration for very long messages
- More template options
- Advanced customization options
- Export to PDF/Image
- Social media preview cards
- QR code generation for physical sharing

## In One Sentence

**Novax** is a hackathon-ready message builder powered by Unlayer Elements that stores everything in compressed URLs - no database required.

---

Built for the Unlayer Elements Challenge 2026
