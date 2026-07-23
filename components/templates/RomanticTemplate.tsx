import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';
import { TemplateProps } from '@/types/message';

export default function RomanticTemplate({ data, customization }: TemplateProps) {
  const { primaryColor, secondaryColor, fontFamily, backgroundColor } = customization;
  
  return (
    <Email
      style={{
        backgroundColor: backgroundColor || '#FFF5F7',
        fontFamily: fontFamily || 'Arial, sans-serif',
      }}
    >
      {/* Header with Icons */}
      {data.icons.length > 0 && (
        <Row layout={ColumnLayouts.OneColumn} backgroundColor={primaryColor || '#FFE5EC'}>
          <Column style={{ padding: '30px 20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              {data.icons.map((icon, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <img 
                    src={icon.iconSrc} 
                    alt={`Icon ${index + 1}`}
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  {icon.iconNote && (
                    <p style={{ 
                      fontSize: '12px', 
                      marginTop: '8px',
                      color: secondaryColor || '#C41E3A',
                      fontWeight: 'bold'
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

      {/* Decorative Divider */}
      <Row layout={ColumnLayouts.OneColumn}>
        <Column>
          <div style={{ 
            height: '4px', 
            background: `linear-gradient(90deg, ${primaryColor || '#FFE5EC'}, ${secondaryColor || '#C41E3A'}, ${primaryColor || '#FFE5EC'})`,
            margin: '0'
          }} />
        </Column>
      </Row>

      {/* Main Content */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
        <Column style={{ padding: '40px 30px' }}>
          {/* Greeting */}
          <Heading 
            fontSize="32px" 
            color={primaryColor || '#C41E3A'}
            style={{ 
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            💕 {data.messageTitle} 💕
          </Heading>

          <Divider 
            style={{ 
              borderColor: secondaryColor || '#FFE5EC',
              borderWidth: '2px',
              margin: '20px auto',
              maxWidth: '100px'
            }}
          />

          {/* Message Body */}
          <Paragraph 
            fontSize="18px" 
            color="#333333"
            style={{
              lineHeight: '1.8',
              textAlign: 'center',
              marginTop: '30px',
              marginBottom: '30px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {data.messageBody}
          </Paragraph>

          {/* Signature Image */}
          {data.signatureImageUrl && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <img 
                src={data.signatureImageUrl} 
                alt="Signature"
                style={{ 
                  maxWidth: '200px',
                  height: 'auto',
                  border: `2px solid ${secondaryColor || '#FFE5EC'}`,
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
          )}

          {/* Sender Name */}
          <Paragraph 
            fontSize="20px" 
            color={secondaryColor || '#C41E3A'}
            style={{
              textAlign: 'center',
              marginTop: '30px',
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}
          >
            With love, {data.senderName} ❤️
          </Paragraph>
        </Column>
      </Row>

      {/* Footer */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={primaryColor || '#FFE5EC'}>
        <Column style={{ padding: '20px', textAlign: 'center' }}>
          <Paragraph 
            fontSize="14px" 
            color={secondaryColor || '#C41E3A'}
            style={{ margin: '0' }}
          >
            {data.aiGenerated && '✨ Enhanced with AI • '}
            Created with Novax 💌
          </Paragraph>
        </Column>
      </Row>
    </Email>
  );
}
