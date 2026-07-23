import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { z } from 'zod';
import { NovaxMessageData } from '@/types/message';

// Zod schema for runtime validation
const NovaxMessageSchema = z.object({
  senderName: z.string().min(1, 'Sender name is required'),
  senderEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  recipientName: z.string().min(1, 'Recipient name is required'),
  template: z.enum(['romantic', 'professional', 'playful', 'elegant']),
  messageTitle: z.string().min(1, 'Message title is required'),
  messageBody: z.string().min(1, 'Message body is required'),
  aiGenerated: z.boolean(),
  customization: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string(),
    backgroundColor: z.string(),
  }),
  signatureImageUrl: z.string().optional(),
  backgroundImageUrl: z.string().optional(),
  icons: z.array(
    z.object({
      position: z.number(),
      iconSrc: z.string(),
      iconNote: z.string().optional(),
    })
  ),
  response: z.object({
    choice: z.enum(['yes', 'no']),
    respondedAt: z.string(),
  }).optional(),
});

/**
 * Encodes message data into a compressed URL-safe string
 * @param data The message data to encode
 * @returns Compressed, URL-safe string
 */
export function encodeMessageData(data: NovaxMessageData): string {
  try {
    // Validate data structure
    const validatedData = NovaxMessageSchema.parse(data);
    
    // Convert to JSON string
    const jsonString = JSON.stringify(validatedData);
    
    // Compress and encode for URL
    const compressed = compressToEncodedURIComponent(jsonString);
    
    if (!compressed) {
      throw new Error('Compression failed');
    }
    
    return compressed;
  } catch (error) {
    console.error('Error encoding message data:', error);
    throw new Error('Failed to encode message data');
  }
}

/**
 * Decodes a compressed URL string back into message data
 * @param encodedData The compressed string from the URL
 * @returns Decoded and validated message data
 */
export function decodeMessageData(encodedData: string): NovaxMessageData {
  try {
    if (!encodedData || encodedData.trim().length === 0) {
      throw new Error('No data provided');
    }

    // Decompress
    const decompressed = decompressFromEncodedURIComponent(encodedData);
    
    if (!decompressed) {
      throw new Error('Decompression failed - data may be corrupted');
    }

    // Parse JSON
    const parsed = JSON.parse(decompressed);
    
    // Validate structure
    const validated = NovaxMessageSchema.parse(parsed);
    
    return validated as NovaxMessageData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
      throw new Error('Invalid message data structure');
    }
    
    console.error('Error decoding message data:', error);
    throw new Error('Failed to decode message data');
  }
}

/**
 * Estimates the compressed size of message data
 * @param data The message data
 * @returns Size in bytes
 */
export function estimateEncodedSize(data: NovaxMessageData): number {
  try {
    const encoded = encodeMessageData(data);
    return encoded.length;
  } catch (error) {
    console.error('Error estimating size:', error);
    return 0;
  }
}

/**
 * Checks if the encoded data will fit within URL length limits
 * @param data The message data
 * @param maxLength Maximum allowed length (default: 2000 for safe compatibility)
 * @returns Object with isValid flag and size information
 */
export function validateEncodedSize(
  data: NovaxMessageData,
  maxLength: number = 2000
): { isValid: boolean; size: number; maxSize: number } {
  const size = estimateEncodedSize(data);
  return {
    isValid: size > 0 && size <= maxLength,
    size,
    maxSize: maxLength,
  };
}

/**
 * Adds a response to existing message data
 * @param encodedData The original encoded message data
 * @param response The response to add (yes/no)
 * @returns New encoded data with response added
 */
export function addResponseToEncodedData(
  encodedData: string,
  response: 'yes' | 'no'
): string {
  try {
    // Decode existing data
    const data = decodeMessageData(encodedData);
    
    // Add response
    data.response = {
      choice: response,
      respondedAt: new Date().toISOString(),
    };
    
    // Re-encode
    return encodeMessageData(data);
  } catch (error) {
    console.error('Error adding response:', error);
    throw new Error('Failed to add response to message data');
  }
}
