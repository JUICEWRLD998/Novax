import React from 'react';
import { Email, Row, Column, Heading, Paragraph, Divider, ColumnLayouts } from '@unlayer/react-elements';
import { TemplateProps } from '@/types/message';

export default function PlayfulTemplate({ data, customization }: TemplateProps) {
  const { primaryColor, secondaryColor, fontFamily, backgroundColor } = customization;
  
  return (
    <Email
      style={{
        backgroundColor: backgroundColor || '#FFF9E6',
        fontFamily: fontFamily || 'Comic Sans MS, cursive',
      }}
    >
      {/* Fun Header with Icons */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={primaryColor || '#FFD93D'}>
        <Column style={{ padding: '30px 20px' }}>
          <Heading 
            fontSize="36px" 
            color={secondaryColor || '#FF6B35'}
            style={{ 
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
              margin: '0',
              transform: 'rotate(-2deg)'
            }}
          >
            🎉 {data.messageTitle} 🎉
          </Heading>
        </Column>
      </Row>

      {/* Wavy Divider */}
      <Row layout={ColumnLayouts.OneColumn}>
        <Column>
          <div style={{ 
            height: '20px',
            background: `repeating-linear-gradient(45deg, ${primaryColor || '#FFD93D'}, ${primaryColor || '#FFD93D'} 10px, ${secondaryColor || '#FF6B35'} 10px, ${secondaryColor || '#FF6B35'} 20px)`,
            margin: '0'
          }} />
        </Column>
      </Row>

      {/* Icons Section */}
      {data.icons.length > 0 && (
        <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF">
          <Column style={{ padding: '25px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
              {data.icons.map((icon, index) => (
                <div 
                  key={index} 
                  style={{ 
                    textAlign: 'center',
                    transform: `rotate(${(index % 2 === 0 ? 5 : -5)}deg)`,
                    transition: 'transform 0.3s'
                  }}
                >
                  <div style={{
                    backgroundColor: primaryColor || '#FFD93D',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'inline-block',
                    border: `3px solid ${secondaryColor || '#FF6B35'}`
                  }}>
                    <img 
                      src={icon.iconSrc} 
                      alt={`Icon ${index + 1}`}
                      style={{ width: '48px', height: '48px', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                  {icon.iconNote && (
                    <p style={{ 
                      fontSize: '14px', 
                      marginTop: '10px',
                      color: secondaryColor || '#FF6B35',
                      fontWeight: 'bold',
                      backgroundColor: primaryColor || '#FFD93D',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      display: 'inline-block'
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
        <Column style={{ padding: '40px 30px', position: 'relative' }}>
          {/* Decorative corner */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '40px'
          }}>
            ✨
          </div>

          <Paragraph 
            fontSize="22px" 
            color={secondaryColor || '#FF6B35'}
            style={{
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}
          >
            Hey {data.recipientName}! 👋
          </Paragraph>

          <Paragraph 
            fontSize="18px" 
            color="#333333"
            style={{
              lineHeight: '1.8',
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '30px',
              whiteSpace: 'pre-wrap',
              backgroundColor: '#FFF9E6',
              padding: '20px',
              borderRadius: '15px',
              border: `3px dashed ${primaryColor || '#FFD93D'}`
            }}
          >
            {data.messageBody}
          </Paragraph>

          {/* Signature */}
          {data.signatureImageUrl && (
            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <img 
                src={data.signatureImageUrl} 
                alt="Signature"
                style={{ 
                  maxWidth: '200px',
                  height: 'auto',
                  border: `4px solid ${secondaryColor || '#FF6B35'}`,
                  borderRadius: '20px',
                  padding: '12px',
                  backgroundColor: primaryColor || '#FFD93D',
                  transform: 'rotate(2deg)'
                }}
              />
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <div style={{
              backgroundColor: primaryColor || '#FFD93D',
              padding: '15px 25px',
              borderRadius: '25px',
              display: 'inline-block',
              border: `3px solid ${secondaryColor || '#FF6B35'}`,
              transform: 'rotate(-1deg)'
            }}>
              <Paragraph 
                fontSize="20px" 
                color={secondaryColor || '#FF6B35'}
                style={{
                  margin: '0',
                  fontWeight: 'bold'
                }}
              >
                From: {data.senderName} 🌟
              </Paragraph>
            </div>
          </div>

          {/* Decorative corner */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            fontSize: '40px'
          }}>
            🎨
          </div>
        </Column>
      </Row>

      {/* Fun Footer */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={secondaryColor || '#FF6B35'}>
        <Column style={{ padding: '20px', textAlign: 'center' }}>
          <Paragraph 
            fontSize="14px" 
            color="#FFFFFF"
            style={{ margin: '0', fontWeight: 'bold' }}
          >
            {data.aiGenerated && '🤖 AI-Powered Fun • '}
            Made with Novax! 🚀
          </Paragraph>
        </Column>
      </Row>
    </Email>
  );
}
