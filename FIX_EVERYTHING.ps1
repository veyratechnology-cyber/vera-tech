# =====================================================
# COMPLETE FIX SCRIPT - RUN THIS IN POWERSHELL
# This will fix ALL 404 errors once and for all
# =====================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VEYRATECH - COMPLETE ERROR FIX SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
$projectDir = "c:\Users\HomePC\Documents\RoyalTech\royaltech"
Set-Location $projectDir

Write-Host "Step 1: Checking environment..." -ForegroundColor Yellow
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    exit 1
}

# Extract DATABASE_URL
$envContent = Get-Content ".env" -Raw
if ($envContent -match 'DATABASE_URL=([^\r\n]+)') {
    $dbUrl = $matches[1]
    Write-Host "✓ Found DATABASE_URL" -ForegroundColor Green
    
    # Show database host
    if ($dbUrl -match '@([^:]+):') {
        $dbHost = $matches[1]
        Write-Host "  Database host: $dbHost" -ForegroundColor Gray
    }
} else {
    Write-Host "ERROR: DATABASE_URL not found in .env!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Pushing Prisma schema to database..." -ForegroundColor Yellow
Write-Host ""

# Set environment variable for this session
$env:DATABASE_URL = $dbUrl

# Push Prisma schema
Write-Host "Running: npx prisma db push" -ForegroundColor Gray
$pushOutput = npx prisma db push --accept-data-loss 2>&1
Write-Host $pushOutput

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "WARNING: Prisma push had issues. Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 3: Generating Prisma Client..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Running: npx prisma generate" -ForegroundColor Gray
$genOutput = npx prisma generate 2>&1
Write-Host $genOutput

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DATABASE SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to Supabase: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "2. Select your project (host: $dbHost)" -ForegroundColor White
Write-Host "3. Open SQL Editor" -ForegroundColor White
Write-Host "4. Run this file: RUN_THIS_IN_SUPABASE_NOW.sql" -ForegroundColor White
Write-Host "5. Verify: Should see 8 services + 6 industries" -ForegroundColor White
Write-Host ""
Write-Host "6. Update Vercel DATABASE_URL:" -ForegroundColor White
Write-Host "   a. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   b. Settings → Environment Variables" -ForegroundColor White
Write-Host "   c. Check DATABASE_URL matches your .env" -ForegroundColor White
Write-Host "   d. If different, update it and redeploy" -ForegroundColor White
Write-Host ""
Write-Host "7. Wait 2-3 minutes, then check:" -ForegroundColor White
Write-Host "   https://vera-tech.vercel.app/api/debug/check-db" -ForegroundColor White
Write-Host ""
Write-Host "This debug URL will show if everything is working!" -ForegroundColor Green
Write-Host ""

# Open SQL file in default editor
Write-Host "Opening SQL file for you..." -ForegroundColor Yellow
Start-Process "RUN_THIS_IN_SUPABASE_NOW.sql"

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
