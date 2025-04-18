document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results-container');
    const riskMeterBar = document.getElementById('risk-meter-bar');
    const riskScoreElement = document.getElementById('risk-score');
    const riskLevelElement = document.getElementById('risk-level');
    const recommendationsElement = document.getElementById('recommendations');

    calculateBtn.addEventListener('click', calculateRisk);

    function calculateRisk() {
        // Get all values
        const age = parseInt(document.getElementById('age').value) || 30;
        const symptoms = {
            cough: document.getElementById('cough').checked,
            fever: document.getElementById('fever').checked,
            weightLoss: document.getElementById('weight-loss').checked,
            nightSweats: document.getElementById('night-sweats').checked,
            chestPain: document.getElementById('chest-pain').checked,
            hemoptysis: document.getElementById('hemoptysis').checked
        };
        
        const riskFactors = {
            hiv: document.getElementById('hiv').value,
            diabetes: document.getElementById('diabetes').checked,
            smoking: document.getElementById('smoking').checked,
            alcohol: document.getElementById('alcohol').checked,
            contact: document.getElementById('contact').checked,
            immunosuppressant: document.getElementById('immunosuppressant').checked
        };
        
        const labResults = {
            sputumTest: document.getElementById('sputum-test').value
        };

        // Calculate score based on WHO guidelines
        let score = 0;

        // Symptom scoring
        if (symptoms.cough) score += 15;
        if (symptoms.fever) score += 10;
        if (symptoms.weightLoss) score += 10;
        if (symptoms.nightSweats) score += 5;
        if (symptoms.chestPain) score += 5;
        if (symptoms.hemoptysis) score += 20;

        // Risk factor scoring
        if (riskFactors.hiv === 'positive') score += 30;
        if (riskFactors.diabetes) score += 10;
        if (riskFactors.smoking) score += 5;
        if (riskFactors.alcohol) score += 5;
        if (riskFactors.contact) score += 15;
        if (riskFactors.immunosuppressant) score += 10;

        // Lab results
        if (labResults.sputumTest === 'positive') score += 40;
        
        // Age adjustment
        if (age > 60) score += 5;
        if (age < 5) score += 10;

        // Cap at 100
        score = Math.min(score, 100);

        // Display results
        riskScoreElement.textContent = score;
        riskMeterBar.style.width = `${score}%`;
        
        // Determine risk level
        let riskLevel, recommendations;
        if (score >= 70) {
            riskLevel = "High";
            recommendations = `
                <strong>Recommendations:</strong>
                <ul>
                    <li>Immediate sputum test for TB confirmation</li>
                    <li>Chest X-ray required</li>
                    <li>Consider starting empirical TB treatment</li>
                    <li>HIV test recommended</li>
                    <li>Isolation precautions until TB ruled out</li>
                </ul>
            `;
        } else if (score >= 30) {
            riskLevel = "Medium";
            recommendations = `
                <strong>Recommendations:</strong>
                <ul>
                    <li>Sputum microscopy and culture recommended</li>
                    <li>Chest X-ray advised</li>
                    <li>Follow-up in 2 weeks if symptoms persist</li>
                    <li>Consider HIV testing</li>
                </ul>
            `;
        } else {
            riskLevel = "Low";
            recommendations = `
                <strong>Recommendations:</strong>
                <ul>
                    <li>No immediate TB testing needed</li>
                    <li>Monitor for symptom progression</li>
                    <li>Re-evaluate if symptoms worsen</li>
                </ul>
            `;
        }

        riskLevelElement.textContent = riskLevel;
        recommendationsElement.innerHTML = recommendations;
        
        // Show results
        resultsContainer.classList.remove('hidden');
    }
});