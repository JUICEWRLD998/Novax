# How Unlayer Elements Works in Novax

## 🎯 What is Unlayer Elements?

Unlayer Elements (`@unlayer/react-elements`) is a React component library for building **responsive, beautiful email templates** using JSX/TSX. Instead of writing raw HTML email code, you use React components that automatically generate email-safe HTML.

## 📦 Package Installation

```bash
npm install @unlayer/react-elements
```

**Current version in project:** `@unlayer/react-elements@^0.1.20`

---

## 🏗️ Architecture: How Novax Uses Unlayer Elements

### **Flow Overview**

```
User Creates Message
       ↓
Selects Template (Romantic/Professional/Playful/Elegant)
       ↓
Customizes Colors/Fonts/Background
       ↓
Writes Message Content
       ↓
Preview: Unlayer Template Components Render the Email
       ↓
Share: URL contains encoded message data
       ↓
Recipient Opens URL
       ↓
Unlayer Template Components Render the Email Again
```

---

## 📂 Where Unlayer Elements Are Used

### **1. Template Files** (`components/templates/`)

Each template is a React component using Unlayer Elements:

#### **RomanticTemplate.tsx**
```tsx
import { Email, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';

export default function RomanticTemplate({ data, customization }) {
  return (
    <Email style={{ backgroundColor: customization.backgroundColor }}>
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={customization.primaryColor}>
        <Column style={{ padding: '30px 20px' }}>
          <Heading fontSize="32px" color={customization.primaryColor}>
            💕 {data.messageTitle} 💕
          </Heading>
        </Column>
      </Row>
      
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '40px 30px' }}>
          <Paragraph fontSize="18px" color="#333333">
            {data.messageBody}
          </Paragraph>
        </Column>
      </Row>
    </Email>
  );
}
```

**Key Unlayer Components Used:**
- `<Email>` - Main email container
- `<Row>` - Horizontal sections with layout options
- `<Column>` - Content columns within rows
- `<Heading>` - Styled headings
- `<Paragraph>` - Text content
- `<Divider>` - Horizontal lines
- `ColumnLayouts.OneColumn` - Official Unlayer enum for responsive layouts

---

## 🎨 Four Templates Using Unlayer Elements

### **1. Romantic Template**
- **Colors**: Pink/Rose (#FFE5EC, #C41E3A)
- **Unlayer Features**:
  - Gradient dividers using Row background colors
  - Icon grid in Column with flex display
  - Centered Heading and Paragraph components
  - Custom Divider styling with border colors
  
### **2. Professional Template**
- **Colors**: Slate/Blue (#2C3E50, #34495E)
- **Unlayer Features**:
  - Clean Row headers with solid backgrounds
  - Justified Paragraph text alignment
  - Divider separators between sections
  - Formal Column padding structure

### **3. Playful Template**
- **Colors**: Yellow/Orange (#FFD93D, #FF6B35)
- **Unlayer Features**:
  - Repeating gradient Row backgrounds
  - Rotated elements using Column inline styles
  - Dashed border Paragraph containers
  - Fun emoji in Heading components

### **4. Elegant Template**
- **Colors**: Gold/Black (#1A1A1A, #D4AF37)
- **Unlayer Features**:
  - Serif font family in Email root
  - Minimal Divider with custom maxWidth
  - Uppercase letterSpacing in Heading
  - Grayscale filtered images in Column

---

## 🔄 How Templates Render

### **Preview Page** (`app/(sender)/form/_components/newPreview.tsx`)

```tsx
import { getTemplateComponent } from '@/helpers/template-renderer';

const TemplateComponent = getTemplateComponent(template);

<TemplateComponent 
  data={messageData} 
  customization={customization} 
/>
```

### **Recipient Page** (`app/(reciever)/message/[id]/page.tsx`)

```tsx
import { getTemplateComponent } from '@/helpers/template-renderer';
import { decodeMessageData } from '@/helpers/data-encoding';

// Decode URL data
const messageData = decodeMessageData(encodedData);

// Get correct template
const TemplateComponent = getTemplateComponent(messageData.template);

// Render with Unlayer Elements
<TemplateComponent 
  data={messageData} 
  customization={messageData.customization} 
/>
```

---

## 🛠️ Template Renderer Helper

**File:** `helpers/template-renderer.tsx`

```tsx
import RomanticTemplate from '@/components/templates/RomanticTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import PlayfulTemplate from '@/components/templates/PlayfulTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import { TemplateType } from '@/types/message';

export function getTemplateComponent(template: TemplateType) {
  switch (template) {
    case 'romantic':
      return RomanticTemplate;
    case 'professional':
      return ProfessionalTemplate;
    case 'playful':
      return PlayfulTemplate;
    case 'elegant':
      return ElegantTemplate;
    default:
      return RomanticTemplate;
  }
}
```

---

## 🎨 Customization System

All templates receive the same customization object:

```typescript
interface Customization {
  primaryColor: string;      // Main brand color
  secondaryColor: string;    // Accent color
  fontFamily: string;        // Typography
  backgroundColor: string;   // Email background
}
```

**How it flows:**
1. User customizes in `CustomizationPanel.tsx`
2. Stored in `form.store.ts` Zustand store
3. Passed to Unlayer template components
4. Applied to Email, Row, Column, Heading, Paragraph styles

---

## 📊 Data Flow

```
FormStore (Zustand)
  ↓
NovaxMessageData {
  senderName,
  recipientName,
  template: 'romantic' | 'professional' | 'playful' | 'elegant',
  messageTitle,
  messageBody,
  customization: { colors, fonts },
  icons: [ { iconSrc, iconNote } ],
  signatureImageUrl
}
  ↓
encodeMessageData (LZ-String compression)
  ↓
URL: /message/{base64EncodedData}
  ↓
decodeMessageData
  ↓
getTemplateComponent(template)
  ↓
Unlayer Template Component Renders
  ↓
<Email>
  <Row>
    <Column>
      <Heading>{data.messageTitle}</Heading>
      <Paragraph>{data.messageBody}</Paragraph>
    </Column>
  </Row>
</Email>
```

---

## ✅ Why This Uses Unlayer Elements

1. **All 4 templates import from `@unlayer/react-elements`** ✅
2. **Uses official Unlayer components:** Email, Row, Column, Heading, Paragraph, Divider ✅
3. **Uses ColumnLayouts enum** for responsive design ✅
4. **No custom HTML email builders** ✅
5. **Proper React component structure** ✅
6. **Dynamic props for customization** ✅

---

## 🔍 Verify Unlayer Usage

### Check imports:
```bash
grep -r "@unlayer/react-elements" components/templates/
```

### Check package:
```bash
npm list @unlayer/react-elements
```

### Check template files:
```bash
ls components/templates/*Template.tsx
```

All should show:
- ✅ RomanticTemplate.tsx
- ✅ ProfessionalTemplate.tsx
- ✅ PlayfulTemplate.tsx
- ✅ ElegantTemplate.tsx

---

## 🎯 Key Differences from Other Email Builders

| Feature | Unlayer Elements | Other Builders |
|---------|------------------|----------------|
| **Type** | React Components | Drag-and-drop UI |
| **Code** | JSX/TSX | Visual editor |
| **Flexibility** | Full programmatic control | Limited to UI |
| **Customization** | Props & styles | GUI settings |
| **Integration** | Import & use in code | Embed iframe |

**Novax uses Unlayer Elements programmatically** - each template is a coded React component using Unlayer's battle-tested email components.

---

## 🚀 Benefits for Novax

1. **Type Safety**: TypeScript types for all props
2. **Responsive**: ColumnLayouts.OneColumn adapts to mobile
3. **Email Client Compatible**: Unlayer handles rendering quirks
4. **Customizable**: Props allow dynamic styling
5. **Maintainable**: React component structure
6. **Hackathon Ready**: Official Unlayer Elements usage ✅

---

## 📝 Summary

**Novax uses Unlayer Elements throughout:**
- ✅ 4 templates built with Unlayer React components
- ✅ Email, Row, Column, Heading, Paragraph, Divider
- ✅ ColumnLayouts enum for responsive design
- ✅ Dynamic customization via props
- ✅ No raw HTML, all Unlayer Elements
- ✅ Verified in `UNLAYER_ELEMENTS_VERIFICATION.md`

**This is a proper Unlayer Elements implementation for the hackathon!**
