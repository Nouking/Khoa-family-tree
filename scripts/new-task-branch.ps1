param (
    [string]$TaskID,
    [string]$Description
)

# Validate parameters
if ([string]::IsNullOrWhiteSpace($TaskID)) {
    Write-Error "TaskID is a required parameter."
    exit 1
}
if ([string]::IsNullOrWhiteSpace($Description)) {
    Write-Error "Description is a required parameter."
    exit 1
}

# 1. Checkout main
git checkout main
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to checkout main branch."
    exit 1
}

# 2. Pull latest changes
git pull
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to pull latest changes from main."
    exit 1
}

# 3. Create and checkout new branch
$branchName = "task$TaskID-$Description"
git checkout -b $branchName
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to create new branch: $branchName"
    exit 1
}

Write-Host "Successfully created and checked out new branch: $branchName"
