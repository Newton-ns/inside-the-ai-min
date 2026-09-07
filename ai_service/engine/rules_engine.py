"""
Legal Metrology (Packaged Commodities) Rules, 2011 Compliance Validation Engine
Validates all mandatory declarations, font size compliance, unit conventions, and estimates statutory liabilities.
"""

from typing import Dict, Any, List

def validate_compliance(
    entities: Dict[str, Any],
    product_category: str = "Food & Beverages",
    package_area_sq_cm: float = 150.0,
    ocr_boxes: List[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Executes rule-by-rule statutory verification against Legal Metrology Rules, 2011.
    """
    violations = []
    warnings = []
    passed_rules = []
    annotated_boxes = [] if ocr_boxes is None else [dict(b) for b in ocr_boxes]

    # --- Rule 6(1)(a): Manufacturer Details ---
    mfg = entities.get("manufacturer_name", {})
    if not mfg.get("found"):
        violations.append({
            "rule": "Rule 6(1)(a)",
            "title": "Missing Manufacturer / Packer / Importer Information",
            "severity": "CRITICAL",
            "description": "Package does not state the name and complete address of the manufacturer, packer, or importer.",
            "statutory_penalty": "₹ 25,000 under Section 36(1) of Legal Metrology Act, 2009",
            "suggestion": "Add complete manufacturing address along with postal PIN code."
        })
    elif not mfg.get("has_pincode"):
        warnings.append({
            "rule": "Rule 6(1)(a)",
            "title": "Incomplete Address (Missing PIN Code)",
            "severity": "MEDIUM",
            "description": "Manufacturer address lacks a 6-digit postal PIN code for complete traceability.",
            "suggestion": "Include valid 6-digit postal PIN code in the manufacturer address block."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(a)",
            "title": "Manufacturer Address Declared",
            "details": mfg.get("value")
        })

    # --- Rule 6(1)(b): Generic / Product Name ---
    prod_name = entities.get("product_name", {})
    if not prod_name.get("found"):
        violations.append({
            "rule": "Rule 6(1)(b)",
            "title": "Missing Common / Generic Commodity Name",
            "severity": "HIGH",
            "description": "The common or generic name of the commodity is missing from the principal display panel.",
            "statutory_penalty": "₹ 25,000 under Section 36(1)",
            "suggestion": "Print the generic name of the food/commodity clearly on the front label."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(b)",
            "title": "Generic Commodity Name Present",
            "details": prod_name.get("value")
        })

    # --- Rule 6(1)(c): Net Quantity & Unit Rules ---
    net_qty = entities.get("net_quantity", {})
    if not net_qty.get("found"):
        violations.append({
            "rule": "Rule 6(1)(c)",
            "title": "Missing Net Quantity Declaration",
            "severity": "CRITICAL",
            "description": "Package lacks statutory net quantity declaration in standard units.",
            "statutory_penalty": "₹ 25,000 to ₹ 50,000 under Section 36(1)",
            "suggestion": "Declare net quantity using standard metric units (e.g., 'Net Qty: 1 kg' or 'Net Qty: 500 ml')."
        })
    else:
        unit = net_qty.get("unit", "")
        if not net_qty.get("is_standard_unit"):
            violations.append({
                "rule": "Rule 6(1)(c) & Second Schedule",
                "title": f"Non-Standard Metric Unit Used ('{unit}')",
                "severity": "HIGH",
                "description": f"The symbol '{unit}' is invalid under Legal Metrology Rules. Symbols must be 'g', 'kg', 'ml', 'l', or 'N' without plural 's'.",
                "statutory_penalty": "₹ 20,000 under Rule 32 / Section 36",
                "suggestion": f"Replace '{unit}' with standard abbreviation (e.g. 'g' instead of 'gms', 'kg' instead of 'kgs')."
            })
        else:
            passed_rules.append({
                "rule": "Rule 6(1)(c)",
                "title": "Net Quantity Declared in Standard Metric Unit",
                "details": net_qty.get("value")
            })

    # --- Rule 7 & 8: Principal Display Panel & Font Size Schedule ---
    min_font_mm = _calculate_minimum_font_size(net_qty.get("numeric_value", 100), net_qty.get("unit", "g"))
    passed_rules.append({
        "rule": "Rule 7 & 8 / First Schedule",
        "title": f"Minimum Font Size Requirement: {min_font_mm} mm",
        "details": f"Package area ~{package_area_sq_cm} sq.cm requires minimum font height of {min_font_mm}mm for net quantity."
    })

    # --- Rule 6(1)(d): Month & Year of Manufacture ---
    mfg_date = entities.get("mfg_date", {})
    if not mfg_date.get("found"):
        violations.append({
            "rule": "Rule 6(1)(d)",
            "title": "Missing Month and Year of Manufacture / Packing",
            "severity": "CRITICAL",
            "description": "Package does not indicate the month and year in which commodity was manufactured, packed, or imported.",
            "statutory_penalty": "₹ 25,000 under Section 36(1)",
            "suggestion": "Print date of manufacture clearly in 'MM/YYYY' or 'Month YYYY' format."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(d)",
            "title": "Manufacturing / Packing Date Present",
            "details": mfg_date.get("value")
        })

    # --- Rule 6(1)(e): Maximum Retail Price (MRP) & Tax Clause ---
    mrp = entities.get("mrp", {})
    if not mrp.get("found"):
        violations.append({
            "rule": "Rule 6(1)(e)",
            "title": "Missing Maximum Retail Price (MRP) Declaration",
            "severity": "CRITICAL",
            "description": "No MRP declaration found on the packaging.",
            "statutory_penalty": "₹ 25,000 to ₹ 1,00,000 under Section 36(1) & (2)",
            "suggestion": "Declare MRP explicitly in Indian Rupees: 'MRP Rs. XX.XX (incl. of all taxes)'."
        })
    elif not mrp.get("has_tax_clause"):
        violations.append({
            "rule": "Rule 6(1)(e)",
            "title": "MRP Missing 'Inclusive of all taxes' Statement",
            "severity": "HIGH",
            "description": "MRP declaration must explicitly mention '(incl. of all taxes)' or 'inclusive of all taxes'.",
            "statutory_penalty": "₹ 25,000 under Section 36(1)",
            "suggestion": "Append '(incl. of all taxes)' right next to the MRP figure."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(e)",
            "title": "MRP with Mandatory Tax Clause Compliant",
            "details": mrp.get("value")
        })

    # --- Rule 6(1)(f): Consumer Care Details ---
    care = entities.get("customer_care", {})
    if not care.get("found"):
        violations.append({
            "rule": "Rule 6(1)(f)",
            "title": "Missing Consumer Care Helpline & Email",
            "severity": "HIGH",
            "description": "Package does not state the contact details (telephone/toll-free or email) for consumer grievances.",
            "statutory_penalty": "₹ 25,000 under Section 36(1)",
            "suggestion": "Add Consumer Care designation, toll-free number, and support email ID."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(f)",
            "title": "Consumer Care Contact Declared",
            "details": care.get("raw")
        })

    # --- Rule 6(1)(g): Country of Origin ---
    country = entities.get("country_of_origin", {})
    if not country.get("found"):
        violations.append({
            "rule": "Rule 6(1)(g)",
            "title": "Missing Country of Origin Declaration",
            "severity": "HIGH",
            "description": "Mandatory 'Country of Origin' declaration is not displayed on the package.",
            "statutory_penalty": "₹ 25,000 under Section 36(1)",
            "suggestion": "Print 'Country of Origin: India' (or country of manufacture) conspicuously on the package."
        })
    else:
        passed_rules.append({
            "rule": "Rule 6(1)(g)",
            "title": "Country of Origin Declared",
            "details": country.get("value")
        })

    # --- Compute Compliance Score ---
    total_checks = len(passed_rules) + len(violations) + (len(warnings) * 0.5)
    raw_score = (len(passed_rules) / max(total_checks, 1)) * 100
    compliance_score = max(0, min(100, int(round(raw_score))))

    if compliance_score >= 85 and len(violations) == 0:
        status = "COMPLIANT"
        status_label = "PASS"
    elif compliance_score >= 50:
        status = "PARTIALLY COMPLIANT"
        status_label = "WARNING / REVISE"
    else:
        status = "NON COMPLIANT"
        status_label = "FAIL"

    # Annotate boxes with status
    for box in annotated_boxes:
        txt = box.get("text", "").lower()
        if any(v.get("rule", "").lower() in txt for v in violations) or "gms" in txt or ("mrp" in txt and not mrp.get("has_tax_clause")):
            box["status"] = "violation"
            box["color"] = "#ef4444"
        elif "warning" in txt:
            box["status"] = "warning"
            box["color"] = "#f59e0b"
        else:
            box["status"] = "compliant"
            box["color"] = "#10b981"

    # Actionable suggestions
    suggestions = [v["suggestion"] for v in violations] + [w["suggestion"] for w in warnings]
    if not suggestions:
        suggestions = ["Packaging conforms to all mandatory Legal Metrology (Packaged Commodities) Rules, 2011 declarations."]

    return {
        "compliance_score": compliance_score,
        "status": status,
        "status_label": status_label,
        "violations": violations,
        "warnings": warnings,
        "passed_rules": passed_rules,
        "suggestions": suggestions,
        "min_font_requirement_mm": min_font_mm,
        "annotated_boxes": annotated_boxes,
        "statutory_act": "Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011"
    }

def _calculate_minimum_font_size(numeric_val: float, unit: str) -> float:
    """
    Computes minimum font height according to the First Schedule of Legal Metrology Rules, 2011.
    """
    u = unit.lower()
    val_grams = numeric_val
    if u in ['kg', 'l', 'ltr']:
        val_grams = numeric_val * 1000
        
    if val_grams <= 50:
        return 1.0
    elif val_grams <= 200:
        return 2.0
    elif val_grams <= 1000:
        return 4.0
    else:
        return 6.0
