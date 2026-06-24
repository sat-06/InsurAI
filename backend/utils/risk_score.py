def calculate_risk_score(age, bmi, smoker, children):
    """
    Calculates health risk score for insurance assessment.
    """

    age_score = min(age * 0.5, 30)

    bmi_score = min(max((bmi - 18), 0) * 1.5, 30)

    smoking_score = 30 if smoker.lower() == "yes" else 0

    children_score = children * 2

    total_score = (
        age_score
        + bmi_score
        + smoking_score
        + children_score
    )

    total_score = min(total_score, 100)

    if total_score < 30:
        category = "Low Risk"

    elif total_score < 60:
        category = "Moderate Risk"

    else:
        category = "High Risk"

    return {
        "risk_score": round(total_score, 2),
        "risk_category": category
    }