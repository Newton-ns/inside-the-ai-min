"""
Machine Learning Risk Assessment Model
Predicts compliance risk band (Low, Medium, High) based on product category sensitivity, manufacturer history, and violation profile.
"""

from typing import Dict, Any

CATEGORY_RISK_WEIGHTS = {
    "Infant Milk & Baby Nutrition": 1.4,
    "Edible Oils & Fats": 1.3,
    "Packaged Drinking Water": 1.25,
    "Cosmetics & Personal Care": 1.2,
    "Imported Electronics": 1.35,
    "Food & Beverages": 1.1,
    "Grains & Pulses": 1.0,
    "General Commodity": 1.0
}

KNOWN_MANUFACTURER_HISTORIES = {
    "shanti agro": {"past_violations": 0, "inspection_count": 18, "trust_index": 0.94},
    "pureleaf": {"past_violations": 1, "inspection_count": 8, "trust_index": 0.88},
    "fastpack": {"past_violations": 4, "inspection_count": 12, "trust_index": 0.52},
    "apex imports": {"past_violations": 6, "inspection_count": 7, "trust_index": 0.35}
}

def calculate_risk_score(
    manufacturer_name: str,
    product_category: str,
    compliance_score: int,
    violations_count: int
) -> Dict[str, Any]:
    """
    Computes a risk factor from 0 to 100 and classifies product into Low, Medium, or High risk.
    """
    cat_multiplier = CATEGORY_RISK_WEIGHTS.get(product_category, 1.0)
    
    mfg_key = manufacturer_name.lower()
    matched_mfg = None
    for k, v in KNOWN_MANUFACTURER_HISTORIES.items():
        if k in mfg_key:
            matched_mfg = v
            break
            
    if matched_mfg:
        trust_index = matched_mfg["trust_index"]
        past_violations = matched_mfg["past_violations"]
    else:
        trust_index = 0.80  # Default unflagged new manufacturer
        past_violations = 0

    # Risk score formula
    violation_penalty = violations_count * 18.0
    compliance_deficit = (100 - compliance_score) * 0.6
    mfg_risk_factor = (1.0 - trust_index) * 40.0
    
    raw_risk = (violation_penalty + compliance_deficit + mfg_risk_factor) * (cat_multiplier * 0.8)
    risk_score = max(5, min(95, int(round(raw_risk))))

    if risk_score < 30:
        risk_level = "Low Risk"
        badge_color = "emerald"
        action_recommendation = "Standard periodic surveillance sampling."
    elif risk_score < 65:
        risk_level = "Medium Risk"
        badge_color = "amber"
        action_recommendation = "Flagged for warehouse audit and verification of packing line."
    else:
        risk_level = "High Risk"
        badge_color = "rose"
        action_recommendation = "Immediate physical inspection & statutory Section 36 seizure notice recommended."

    return {
        "risk_level": risk_level,
        "risk_score": risk_score,
        "badge_color": badge_color,
        "category_sensitivity": cat_multiplier,
        "historical_trust_index": trust_index,
        "past_violations_recorded": past_violations,
        "action_recommendation": action_recommendation,
        "factors": [
            {"factor": "Current Label Violations", "impact": f"+{int(violation_penalty)} pts"},
            {"factor": "Category Vulnerability", "impact": f"x{cat_multiplier}"},
            {"factor": "Manufacturer Trust Record", "impact": f"{int((1.0 - trust_index)*100)}% risk offset"}
        ]
    }
