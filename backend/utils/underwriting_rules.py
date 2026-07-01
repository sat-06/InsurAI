def get_underwriting_recommendation(risk_score, predicted_charges):
    """
    Generate underwriting recommendation based on
    risk score and predicted insurance charges.
    """

    if risk_score >= 70:

        return {
            "risk_level": "High",
            "recommendation": "Premium Plan + Medical Screening"
        }

    elif risk_score >= 40:

        return {
            "risk_level": "Moderate",
            "recommendation": "Standard Coverage"
        }

    else:

        return {
            "risk_level": "Low",
            "recommendation": "Basic Coverage"
        }