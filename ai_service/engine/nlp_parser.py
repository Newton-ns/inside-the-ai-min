"""
Metrology NLP Entity Extraction Engine
Parses raw OCR text into structured Legal Metrology statutory fields using NLP patterns & domain rules.
"""

import re
from typing import Dict, Any, List

def parse_metrology_entities(raw_text: str, boxes: List[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Extracts all mandatory Legal Metrology declarations from OCR text.
    """
    clean_text = raw_text.replace("\r", " ")
    lines = [line.strip() for line in clean_text.split("\n") if line.strip()]
    
    entities = {
        "product_name": _extract_product_name(lines, clean_text),
        "manufacturer_name": _extract_manufacturer(clean_text, lines),
        "net_quantity": _extract_net_quantity(clean_text),
        "mrp": _extract_mrp(clean_text),
        "mfg_date": _extract_mfg_date(clean_text),
        "expiry_date": _extract_expiry_date(clean_text),
        "batch_number": _extract_batch_number(clean_text),
        "customer_care": _extract_customer_care(clean_text),
        "country_of_origin": _extract_country_of_origin(clean_text)
    }
    
    return entities

def _extract_product_name(lines: List[str], text: str) -> Dict[str, Any]:
    for line in lines[:3]:
        if not re.search(r'(mfg|mrp|pkd|net|batch|rs|tax)', line, re.IGNORECASE) and len(line) > 3:
            return {"value": line, "confidence": 0.94, "found": True, "raw": line}
    return {"value": "Commodity Package", "confidence": 0.50, "found": False, "raw": ""}

def _extract_manufacturer(text: str, lines: List[str]) -> Dict[str, Any]:
    patterns = [
        r'(?:mfd\.?|manufactured|packed|pkd\.?|marketed|imported)\s*(?:&|and)?\s*(?:by|at)?[:\s]+([^\n\r]+(?:Sonipat|Delhi|Mumbai|Bengaluru|Chennai|Kolkata|Pvt|Ltd|Plot|Phase|Road|Industrial|Haryana|Maharashtra|Gujarat|Tamil Nadu|\d{6})[^\n\r]*)',
        r'(?:mfg|pkd)\s*by[:\s]+([^\n\r]+)',
        r'(?:manufactured by|mfd by)[:\s]*([^\n]+)'
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            val = m.group(0).strip()
            has_pin = bool(re.search(r'\b\d{6}\b', val))
            return {
                "value": val,
                "confidence": 0.95 if has_pin else 0.85,
                "found": True,
                "has_pincode": has_pin,
                "raw": val
            }
    return {"value": None, "confidence": 0.0, "found": False, "has_pincode": False, "raw": ""}

def _extract_net_quantity(text: str) -> Dict[str, Any]:
    # Match quantity and units e.g. 5.0 kg, 500 g, 1 L, 750 ml, 10 N, 250 gms (flag non-standard unit)
    pattern = r'(?:net\s*(?:qty|quantity|weight|vol|volume)?[:\s]*)(\d+(?:\.\d+)?)\s*(kg|g|gms|gm|gram|grams|l|ltr|litre|litres|ml|mls|m|cm|mm|n|units|nos|pcs)\b'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        num = float(m.group(1))
        unit = m.group(2).lower()
        is_standard_unit = unit in ['g', 'kg', 'l', 'ml', 'm', 'cm', 'mm', 'n', 'u']
        return {
            "value": f"{num} {unit}",
            "numeric_value": num,
            "unit": unit,
            "is_standard_unit": is_standard_unit,
            "found": True,
            "confidence": 0.96,
            "raw": m.group(0)
        }
    return {"value": None, "numeric_value": 0, "unit": "", "is_standard_unit": False, "found": False, "confidence": 0.0, "raw": ""}

def _extract_mrp(text: str) -> Dict[str, Any]:
    # Match MRP Rs. 450.00 (incl. of all taxes)
    pattern = r'(?:m\.?r\.?p\.?|max(?:imum)?\s*retail\s*price)[:\s]*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d{1,2})?)(.*?)(?:\n|$)'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        amount = float(m.group(1))
        rest_of_clause = m.group(2).lower()
        has_tax_clause = bool(
            re.search(r'(?:incl\.?|inclusive)\s*(?:of)?\s*all\s*tax', rest_of_clause, re.IGNORECASE) or 
            re.search(r'(?:incl\.?|inclusive)\s*(?:of)?\s*all\s*tax', text, re.IGNORECASE)
        )
        return {
            "value": f"Rs. {amount:.2f}",
            "amount": amount,
            "has_tax_clause": has_tax_clause,
            "found": True,
            "confidence": 0.97,
            "raw": m.group(0).strip()
        }
    return {"value": None, "amount": 0, "has_tax_clause": False, "found": False, "confidence": 0.0, "raw": ""}

def _extract_mfg_date(text: str) -> Dict[str, Any]:
    patterns = [
        r'(?:month\s*(?:&|and)?\s*year\s*of\s*(?:mfg|manufacture|packing|pkd))[:\s]*([0-1]?\d[/.-]\d{2,4}|[a-zA-Z]{3,9}\s*\d{2,4}|\d{2}/\d{2}/\d{4})',
        r'(?:mfg\.?\s*date|mfd\.?\s*date|pkd\.?\s*date|date\s*of\s*(?:mfg|packing|mfd|manufacture))[:\s]*([0-1]?\d[/.-]\d{2,4}|[a-zA-Z]{3,9}\s*\d{2,4}|\d{2}/\d{2}/\d{4})',
        r'(?:mfg|mfd|pkd)[:\s]+([0-1]?\d[/.-]\d{2,4}|[a-zA-Z]{3,9}\s*\d{2,4}|\d{2}/\d{2}/\d{4})'
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            return {"value": m.group(1).strip(), "found": True, "confidence": 0.95, "raw": m.group(0)}
    return {"value": None, "found": False, "confidence": 0.0, "raw": ""}

def _extract_expiry_date(text: str) -> Dict[str, Any]:
    pattern = r'(?:exp(?:iry)?|best\s*before|use\s*by)[:\s]*([^\n\r,]+)'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        return {"value": m.group(1).strip(), "found": True, "confidence": 0.92, "raw": m.group(0)}
    return {"value": None, "found": False, "confidence": 0.0, "raw": ""}

def _extract_batch_number(text: str) -> Dict[str, Any]:
    pattern = r'(?:batch|lot|b\.?\s*no|code)[:\s]*([a-zA-Z0-9\-_/]+)'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        return {"value": m.group(1).strip(), "found": True, "confidence": 0.95, "raw": m.group(0)}
    return {"value": None, "found": False, "confidence": 0.0, "raw": ""}

def _extract_customer_care(text: str) -> Dict[str, Any]:
    phone_m = re.search(r'(?:toll\s*free|care|helpline|phone|tel|call)[:\s]*(\+?\d{2,4}[-\s]?\d{3,5}[-\s]?\d{4,6}|\b1800[-\s]?\d{2,4}[-\s]?\d{3,5}\b)', text, re.IGNORECASE)
    email_m = re.search(r'([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', text)
    has_contact = bool(phone_m or email_m or re.search(r'customer\s*care|consumer\s*complaint', text, re.IGNORECASE))
    
    return {
        "found": has_contact,
        "phone": phone_m.group(1).strip() if phone_m else None,
        "email": email_m.group(1).strip() if email_m else None,
        "confidence": 0.93 if (phone_m and email_m) else (0.75 if has_contact else 0.0),
        "raw": f"Phone: {phone_m.group(1) if phone_m else 'N/A'}, Email: {email_m.group(1) if email_m else 'N/A'}"
    }

def _extract_country_of_origin(text: str) -> Dict[str, Any]:
    pattern = r'(?:country\s*of\s*origin|made\s*in|origin)[:\s]*([a-zA-Z\s]+)'
    m = re.search(pattern, text, re.IGNORECASE)
    if m:
        country = m.group(1).strip().split("\n")[0].split(".")[0].strip()
        return {"value": country, "found": True, "confidence": 0.96, "raw": m.group(0)}
    # Direct mention of India or Imported
    if re.search(r'\b(made in india|country of origin:?\s*india)\b', text, re.IGNORECASE):
        return {"value": "India", "found": True, "confidence": 0.92, "raw": "Made in India"}
    return {"value": None, "found": False, "confidence": 0.0, "raw": ""}
