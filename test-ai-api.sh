#!/bin/bash
# Test AI API with curl
# Run this after: npm run dev

echo "Testing Novax AI API..."
echo ""

curl -X POST http://localhost:3000/api/ai/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I love you so much",
    "messageTitle": "For My Valentine",
    "context": "romantic and heartfelt"
  }' | jq .

echo ""
echo "✓ Test complete!"
