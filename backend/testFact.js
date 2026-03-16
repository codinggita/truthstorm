import runTruthEngine from './services/truthEngine.js';

console.log("=== FACT OVERRIDE TEST ===\n");

const tests = [
    "india won t20 wc",
    "world is circle",
    "world is flat",
];

tests.forEach(t => {
    const result = runTruthEngine(t, "");
    console.log(`Caption: "${t}"`);
    console.log(`Score:   ${result.credibilityScore} (${result.verdict})`);
    console.log(`Report:\n${result.report}`);
    console.log("-".repeat(50));
});
