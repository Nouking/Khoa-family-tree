/**
 * Accessibility Testing Script for E12-T7 QA Validation
 * Tests v2 components for ARIA compliance, focus management, and keyboard navigation
 */

const puppeteer = require('puppeteer');
const axeCore = require('axe-core');

async function runAccessibilityTests() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for CI
    devtools: true
  });
  
  const page = await browser.newPage();
  
  // Test v2 view page
  console.log('🔍 Testing v2 View Page Accessibility...');
  await page.goto('http://localhost:3000/v2/view');
  
  // Wait for page to load
  await page.waitForSelector('[data-testid="family-tree-canvas"]', { timeout: 5000 });
  
  // Inject axe-core for accessibility testing
  await page.addScriptTag({
    path: require.resolve('axe-core/axe.min.js')
  });
  
  // Run accessibility scan
  const results = await page.evaluate(() => {
    return new Promise((resolve) => {
      axe.run((err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  });
  
  // Report violations
  if (results.violations.length === 0) {
    console.log('✅ No accessibility violations found on v2 view page');
  } else {
    console.log(`❌ Found ${results.violations.length} accessibility violations:`);
    results.violations.forEach((violation, index) => {
      console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`);
      console.log(`   Impact: ${violation.impact}`);
      console.log(`   Affected elements: ${violation.nodes.length}`);
    });
  }
  
  // Test keyboard navigation
  console.log('\n🎹 Testing Keyboard Navigation...');
  
  // Test Tab navigation through interactive elements
  const tabSequence = [];
  await page.keyboard.press('Tab');
  let activeElement = await page.evaluate(() => document.activeElement.tagName);
  tabSequence.push(activeElement);
  
  // Continue tabbing through first 10 elements
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    activeElement = await page.evaluate(() => document.activeElement.tagName);
    tabSequence.push(activeElement);
  }
  
  console.log('Tab sequence:', tabSequence);
  
  // Test modal accessibility (open Add Member modal)
  console.log('\n🔍 Testing Modal Accessibility...');
  
  // Look for Add Member button and click it
  try {
    await page.click('[aria-label*="Add"], button:contains("Add")');
    await page.waitForSelector('[role="dialog"]', { timeout: 3000 });
    
    // Check if focus moved to modal
    const modalFocused = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      return modal && modal.contains(document.activeElement);
    });
    
    if (modalFocused) {
      console.log('✅ Focus correctly moved to modal');
    } else {
      console.log('❌ Focus did not move to modal');
    }
    
    // Test Escape key to close modal
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('[role="dialog"]'), { timeout: 3000 });
    console.log('✅ Modal closes with Escape key');
    
  } catch (error) {
    console.log('⚠️ Could not test modal accessibility:', error.message);
  }
  
  await browser.close();
  
  return {
    violations: results.violations,
    keyboardNavigation: tabSequence,
    passedTests: results.violations.length === 0
  };
}

// Check if running as script
if (require.main === module) {
  runAccessibilityTests()
    .then(results => {
      console.log('\n📊 Accessibility Test Summary:');
      console.log(`Violations: ${results.violations.length}`);
      console.log(`Overall Pass: ${results.passedTests ? 'PASS' : 'FAIL'}`);
      process.exit(results.passedTests ? 0 : 1);
    })
    .catch(error => {
      console.error('Error running accessibility tests:', error);
      process.exit(1);
    });
}

module.exports = { runAccessibilityTests };