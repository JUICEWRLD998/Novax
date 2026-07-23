import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';
import { TemplateProps } from '@/types/message';

export default function ElegantTemplate({ data, customization }: TemplateProps) {
  const { primaryColor, secondaryColor, fontFamily, backgroundColor } = customization;
  
  return (
    <Email
      style={{
        backgroundColor: backgroundColor || '#FAFAFA',
        fontFamily: fontFamily || 'Playfair Display, serif',
      }}
    >
      {/* Minimal Header */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '60px 40px 40px' }}>
          <Heading 
            fontSize="38px" 
            color={primaryColor || '#1A1A1A'}
            style={{ 
              textAlign: 'center',
              fontWeight: '300',
              letterSpacing: '3px',
              margin: '0',
              textTransform: 'uppercase',
              borderBottom: `1px solid ${secondaryColor || '#D4AF37'}`,
              paddingBottom: '20px'
            }}
          >
            {data.messageTitle}
          </Heading>
        </Column>
      </Row>

      {/* Refined Icons */}
      {data.icons.length > 0 && (
        <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
          <Column style={{ padding: '30px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              {data.icons.map((icon, index) => (
                <div key={index} style={{ textAlign: 'center', maxWidth: '80px' }}>
                  <div style={{
                    borderBottom: `2px solid ${secondaryColor || '#D4AF37'}`,
                    paddingBottom: '12px',
                    marginBottom: '10px'
                  }}>
                    <img 
                      src={icon.iconSrc} 
                      alt={`Icon ${index + 1}`}
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        objectFit: 'contain',
                        filter: 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                  </div>
                  {icon.iconNote && (
                    <p style={{ 
                      fontSize: '11px', 
                      color: '#666666',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      margin: '0'
                    }}>
                      {icon.iconNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Column>
        </Row>
      )}

      {/* Spacer */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '20px' }}>
          <Divider 
            style={{ 
              borderColor: '#E8E8E8',
              borderWidth: '1px',
              margin: '0 auto',
              maxWidth: '60px'
            }}
          />
        </Column>
      </Row>

      {/* Main Content */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '40px 60px 60px' }}>
          <Paragraph 
            fontSize="16px" 
            color="#666666"
            style={{
              lineHeight: '2',
              textAlign: 'center',
              marginBottom: '40px',
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}
          >
            To {data.recipientName}
          </Paragraph>

          <Paragraph 
            fontSize="17px" 
            color="#2A2A2A"
            style={{
              lineHeight: '2.2',
              textAlign: 'justify',
              marginTop: '30px',
              marginBottom: '50px',
              whiteSpace: 'pre-wrap',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {data.messageBody}
          </Paragraph>

          {/* Signature Section */}
          <div style={{ 
            marginTop: '60px', 
            textAlign: 'center',
            borderTop: `1px solid ${secondaryColor || '#D4AF37'}`,
            paddingTop: '30px'
          }}>
            {data.signatureImageUrl && (
              <div style={{ marginBottom: '25px' }}>
                <img 
                  src={data.signatureImageUrl} 
                  alt="Signature"
                  style={{ 
                    maxWidth: '160px',
                    height: 'auto',
                    opacity: '0.9',
                    display: 'inline-block'
                  }}
                />
              </div>
            )}
            
            <Paragraph 
              fontSize="18px" 
              color={primaryColor || '#1A1A1A'}
              style={{
                margin: '0',
                fontWeight: '300',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}
            >
              {data.senderName}
            </Paragraph>
          </div>
        </Column>
      </Row>

      {/* Minimal Footer */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FAFAFA">
        <Column style={{ padding: '30px 20px', textAlign: 'center' }}>
          <Paragraph 
            fontSize="11px" 
            color="#999999"
            style={{ 
              margin: '0',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}
          >
            {data.aiGenerated && 'Refined by AI • '}
            Novax
          </Paragraph>
        </Column>
      </Row>
    </Email>
  );
}
