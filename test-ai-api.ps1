# Test AI API with curl
# Run this after: npm run dev

Write-Host "Testing Novax AI API..." -ForegroundColor Cyan
Write-Host ""

$body = @{
    message = "I love you so much"
    messageTitle = "For My Valentine"
    context = "romantic and heartfelt"
} | ConvertTo-Json

Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $body
Write-Host ""

Write-Host "Calling API..." -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/ai/enhance" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body

Write-Host ""
Write-Host "✓ Success! AI Response:" -ForegroundColor Green
Write-Host ""
Write-Host "Enhanced Title:" -ForegroundColor Cyan
Write-Host $response.enhancedTitle
Write-Host ""
Write-Host "Enhanced Message:" -ForegroundColor Cyan
Write-Host $response.enhancedMessage
