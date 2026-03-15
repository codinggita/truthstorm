import 'dotenv/config';
import runTruthEngine from './services/truthEngine.js';

console.log("=== GEMINI API TEST ===\n");

const tests = [
    { caption: "The government is giving ₹50,000 to every citizen who fills this form.", url: "" },
    { caption: "India won the T20 World Cup in 2024.", url: "" },
];

async function runTests() {
    for (const t of tests) {
        console.log(`Analyzing: "${t.caption}"`);
        const result = await runTruthEngine(t.caption, t.url);
        console.log(`Score:   ${result.credibilityScore} (${result.verdict})`);
        console.log(`Report:\n${result.report}`);
        console.log("-".repeat(50));
    }
}

runTests();
