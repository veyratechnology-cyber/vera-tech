# =====================================================
# VERIFICATION SCRIPT - Check if 404 errors are fixed
# Run this AFTER inserting data in Supabase
# =====================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CHECKING IF 404 ERRORS ARE FIXED" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://vera-tech.vercel.app"

# URLs to check
$urlsToCheck = @(
    "/api/debug/check-db",
    "/services/cloud-solutions",
    "/services/digital-transformation",
    "/services/cybersecurity",
    "/services/ai-machine-learning",
    "/industries/real-estate",
    "/industries/construction",
    "/industries/logistics"
)

$passed = 0
$failed = 0

foreach ($path in $urlsToCheck) {
    $url = "$baseUrl$path"
    Write-Host "Checking: $path" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✓ WORKS (200 OK)" -ForegroundColor Green
            $passed++
            
            # Special handling for debug endpoint
            if ($path -eq "/api/debug/check-db") {
                $json = $response.Content | ConvertFrom-Json
                Write-Host "    Services count: $($json.servicesCount)" -ForegroundColor Gray
                Write-Host "    Industries count: $($json.industriesCount)" -ForegroundColor Gray
            }
        } else {
            Write-Host "  ✗ FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
            $failed++
        }
    }
    catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 404) {
            Write-Host "  ✗ FAILED (404 Not Found)" -ForegroundColor Red
            $failed++
        }
        elseif ($_.Exception.Response.StatusCode.value__) {
            Write-Host "  ✗ FAILED (Status: $($_.Exception.Response.StatusCode.value__))" -ForegroundColor Red
            $failed++
        }
        else {
            Write-Host "  ✗ ERROR: $($_.Exception.Message)" -ForegroundColor Red
            $failed++
        }
    }
    
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESULTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passed: $passed / $($urlsToCheck.Count)" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })
Write-Host "Failed: $failed / $($urlsToCheck.Count)" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "🎉 SUCCESS! All pages are working!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some pages are still broken." -ForegroundColor Red
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Check the debug endpoint output" -ForegroundColor White
    Write-Host "2. Verify you ran the SQL in the CORRECT Supabase project" -ForegroundColor White
    Write-Host "3. Verify Vercel DATABASE_URL matches your local .env" -ForegroundColor White
    Write-Host "4. Try redeploying in Vercel with cache cleared" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
