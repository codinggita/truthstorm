import runTruthEngine from './services/truthEngine.js';

const testCases = [
    {
        name: "Perfect Score (Objective + High Credibility + Good Length)",
        caption: "According to researchers, the new data indicates a 15 percentage point increase in reported cases.",
        sourceUrl: "https://www.reuters.com/article/1"
    },
    {
        name: "Terrible Score (Highly Suspicious + Sensational + Questionable Domain + ALL CAPS)",
        caption: "SHOCKING!!! THEY DON'T WANT YOU TO KNOW THIS SECRET INGREDIENT IS A MIRACLE CURE! EXPOSED!",
        sourceUrl: "https://www.infowars.com/news"
    },
    {
        name: "Zero Context / No Text (Only Good Source)",
        caption: "",
        sourceUrl: "https://bbc.com/news/123"
    },
    {
        name: "Zero Context / No Text (Only Bad Source)",
        caption: "",
        sourceUrl: "https://theonion.com/article"
    },
    {
        name: "No Source URL (Only Good Text)",
        caption: "Officials stated yesterday that the project costs one billion dollars.",
        sourceUrl: ""
    },
    {
        name: "No Source URL (Only Bad Text)",
        caption: "Mind-blowing! You won't believe what happened! Must watch!",
        sourceUrl: ""
    },
    {
        name: "Conflicting (Good Source, Bad Text)",
        caption: "SHOCKING! You won't believe what happened!!!",
        sourceUrl: "https://nasa.gov"
    },
    {
        name: "Conflicting (Bad Source, Good Text)",
        caption: "According to data indicates researchers found a percentage.",
        sourceUrl: "https://breitbart.com"
    },
    {
        name: "Edge Case: Just one word",
        caption: "Breaking",
        sourceUrl: ""
    },
    {
        name: "Edge Case: Extremely long neutral text",
        caption: "This is a very long text that just goes on and on without saying anything particularly interesting or sensational or objective it just maintains a completely neutral tone throughout the entire thing to see how the engine handles a massive wall of text that doesn't trigger any specific keywords but is long enough to pass the length check.",
        sourceUrl: "https://example.com"
    }
];

console.log("=== TRUTH ENGINE TEST SUITE ===\n");

testCases.forEach((tc, index) => {
    const result = runTruthEngine(tc.caption, tc.sourceUrl);
    console.log(`Test ${index + 1}: ${tc.name}`);
    console.log(`Caption: "${tc.caption}"`);
    console.log(`Source:  "${tc.sourceUrl}"`);
    console.log(`Score:   ${result.credibilityScore} (${result.verdict})`);
    console.log("-".repeat(50));
});
