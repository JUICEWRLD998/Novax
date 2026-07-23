import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';
import { TemplateProps } from '@/types/message';

export default function ProfessionalTemplate({ data, customization }: TemplateProps) {
  const { primaryColor, secondaryColor, fontFamily, backgroundColor } = customization;
  
  return (
    <Email
      style={{
        backgroundColor: backgroundColor || '#F5F5F5',
        fontFamily: fontFamily || 'Georgia, serif',
      }}
    >
      {/* Header */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={primaryColor || '#2C3E50'}>
        <Column style={{ padding: '40px 30px' }}>
          <Heading 
            fontSize="28px" 
            color="#FFFFFF"
            style={{ 
              textAlign: 'center',
              fontWeight: '300',
              letterSpacing: '2px',
              margin: '0'
            }}
          >
            {data.messageTitle}
          </Heading>
        </Column>
      </Row>

      {/* Icons Row */}
      {data.icons.length > 0 && (
        <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
          <Column style={{ padding: '20px', borderBottom: `3px solid ${secondaryColor || '#34495E'}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {data.icons.map((icon, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <img 
                    src={icon.iconSrc} 
                    alt={`Icon ${index + 1}`}
                    style={{ width: '40px', height: '40px', objectFit: 'contain', opacity: '0.8' }}
                  />
                  {icon.iconNote && (
                    <p style={{ 
                      fontSize: '11px', 
                      marginTop: '6px',
                      color: secondaryColor || '#34495E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
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

      {/* Main Content */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '50px 40px' }}>
          <Paragraph 
            fontSize="16px" 
            color={secondaryColor || '#34495E'}
            style={{
              lineHeight: '1.8',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}
          >
            Dear {data.recipientName},
          </Paragraph>

          <Paragraph 
            fontSize="16px" 
            color="#333333"
            style={{
              lineHeight: '1.9',
              textAlign: 'justify',
              marginTop: '20px',
              marginBottom: '30px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {data.messageBody}
          </Paragraph>

          <Divider 
            style={{ 
              borderColor: '#E0E0E0',
              borderWidth: '1px',
              margin: '30px 0'
            }}
          />

          {/* Signature Section */}
          <div style={{ marginTop: '40px' }}>
            {data.signatureImageUrl && (
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={data.signatureImageUrl} 
                  alt="Signature"
                  style={{ 
                    maxWidth: '180px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            )}
            
            <Paragraph 
              fontSize="16px" 
              color={primaryColor || '#2C3E50'}
              style={{
                margin: '0',
                fontWeight: '600'
              }}
            >
              {data.senderName}
            </Paragraph>
            
            {data.senderEmail && (
              <Paragraph 
                fontSize="14px" 
                color="#7F8C8D"
                style={{
                  margin: '5px 0 0 0'
                }}
              >
                {data.senderEmail}
              </Paragraph>
            )}
          </div>
        </Column>
      </Row>

      {/* Footer */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={secondaryColor || '#ECF0F1'}>
        <Column style={{ padding: '15px 20px', textAlign: 'center' }}>
          <Paragraph 
            fontSize="12px" 
            color="#7F8C8D"
            style={{ margin: '0' }}
          >
            {data.aiGenerated && 'Composed with AI assistance • '}
            Powered by Novax
          </Paragraph>
        </Column>
      </Row>
    </Email>
  );
}
