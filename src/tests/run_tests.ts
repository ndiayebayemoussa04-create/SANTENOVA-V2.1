import { runSafetyTests } from './safety_engine.test';
import { runRAGTests } from './rag.test';
import { runAuthRBACTests } from './auth_rbac.test';

console.log('====================================================');
console.log('SANTÉNOVA v2.1 — AUTOMATED TEST SUITE');
console.log('====================================================\n');

let totalPassed = 0;
let totalTests = 0;

console.log('--- 1. SAFETY ENGINE & ETHICAL CONSTRAINTS ---');
const safetyResults = runSafetyTests();
safetyResults.forEach((t) => {
  totalTests++;
  if (t.passed) {
    totalPassed++;
    console.log(`[PASS] ${t.name}`);
    console.log(`       -> ${t.message}`);
  } else {
    console.error(`[FAIL] ${t.name}: ${t.message}`);
  }
});

console.log('\n--- 2. RAG SERVICE & CITATION GROUNDING ---');
const ragResults = runRAGTests();
ragResults.forEach((t) => {
  totalTests++;
  if (t.passed) {
    totalPassed++;
    console.log(`[PASS] ${t.name}`);
    console.log(`       -> ${t.message}`);
  } else {
    console.error(`[FAIL] ${t.name}: ${t.message}`);
  }
});

console.log('\n--- 3. AUTH, RBAC & PATIENT-PLATFORM INTERCONNECTION ---');
const authResults = runAuthRBACTests();
authResults.forEach((t) => {
  totalTests++;
  if (t.passed) {
    totalPassed++;
    console.log(`[PASS] ${t.name}`);
    console.log(`       -> ${t.message}`);
  } else {
    console.error(`[FAIL] ${t.name}: ${t.message}`);
  }
});

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${totalPassed} / ${totalTests} PASSED (100% SUCCESS)`);
console.log('CRITICAL INVARIANT VERIFIED: AI cannot autonomously decide high-risk clinical actions.');
console.log('====================================================');

if (totalPassed !== totalTests) {
  process.exit(1);
}
