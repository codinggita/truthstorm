import runTruthEngine from './services/truthEngine.js';

const userScreenshotTests = [
    {
        name: "User Test 1",
        caption: "The government is giving ₹50,000 to every citizen who fills this form.",
        sourceUrl: ""
    },
    {
        name: "User Test 2",
        caption: "NASA confirms aliens have landed in India and the government is hiding the truth.",
        sourceUrl: ""
    },
    {
        name: "User Test 3",
        caption: "This image shows the earthquake damage in Delhi that happened this morning.",
        sourceUrl: ""
    }
];

console.log("=== USER SCREENSHOT TESTS ===\n");

userScreenshotTests.forEach((tc, index) => {
    const result = runTruthEngine(tc.caption, tc.sourceUrl);
    console.log(`Test ${index + 1}: ${tc.name}`);
    console.log(`Caption: "${tc.caption}"`);
    console.log(`Score:   ${result.credibilityScore} (${result.verdict})`);
    console.log(`Report:\n${result.report}`);
    console.log("-".repeat(50));
});
