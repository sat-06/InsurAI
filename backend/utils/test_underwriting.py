from underwriting_rules import get_underwriting_recommendation

result = get_underwriting_recommendation(
    risk_score=75,
    predicted_charges=42000
)

print(result)