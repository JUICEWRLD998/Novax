import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface EnhanceRequest {
  message: string;
  messageTitle: string;
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnhanceRequest = await request.json();
    const { message, messageTitle, context = 'heartfelt and meaningful' } = body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!messageTitle || messageTitle.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message title is required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    // Prepare the prompt
    const prompt = `You are a professional message writer helping someone craft a beautiful message. 

Context: Make this message more ${context}.

Original Title: "${messageTitle}"
Original Message: "${message}"

Please enhance both the title and message to be more impactful while:
1. Keeping the core meaning and intent
2. Improving the wording, tone, and emotional impact
3. Making it sound natural and authentic (not overly formal)
4. Keeping a similar length (don't make it much longer)
5. Maintaining the original sentiment

Respond in JSON format with exactly this structure:
{
  "enhancedTitle": "the improved title here",
  "enhancedMessage": "the improved message here"
}

Only return the JSON, no additional text.`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Novax',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to enhance message', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extract the enhanced content
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const enhanced = JSON.parse(cleanContent);

      return NextResponse.json({
        enhancedTitle: enhanced.enhancedTitle || messageTitle,
        enhancedMessage: enhanced.enhancedMessage || message,
        originalTitle: messageTitle,
        originalMessage: message,
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      // Fallback: return original if parsing fails
      return NextResponse.json({
        enhancedTitle: messageTitle,
        enhancedMessage: message,
        originalTitle: messageTitle,
        originalMessage: message,
        error: 'Failed to parse AI response, returning original',
      });
    }
  } catch (error) {
    console.error('Error enhancing message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
