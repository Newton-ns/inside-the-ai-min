"""
Legal Metrology Compliance AI Service
FastAPI microservice for scanning packaged commodity labels and verifying Legal Metrology (Packaged Commodities) Rules, 2011.
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import io
import json

from engine.preprocessor import preprocess_image_bytes
from engine.ocr_extractor import extract_text_and_boxes
from engine.nlp_parser import parse_metrology_entities
from engine.rules_engine import validate_compliance
from engine.risk_model import calculate_risk_score

app = FastAPI(
    title="Legal Metrology AI Compliance Engine",
    description="Automated compliance detection against Legal Metrology (Packaged Commodities) Rules, 2011",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextAnalysisRequest(BaseModel):
    raw_text: str
    product_category: Optional[str] = "Food & Beverages"
    manufacturer_name: Optional[str] = ""
    declared_net_quantity: Optional[str] = ""
    package_area_sq_cm: Optional[float] = 150.0

@app.get("/")
def root():
    return {
        "service": "Legal Metrology AI Compliance Engine (SIH26034)",
        "version": "1.0.0",
        "statutory_rules": "Legal Metrology (Packaged Commodities) Rules, 2011",
        "status": "operational",
        "endpoints": [
            "/api/ai/analyze-image (POST multipart)",
            "/api/ai/analyze-text (POST JSON)",
            "/api/ai/risk-assessment (POST JSON)",
            "/api/ai/rules-catalog (GET)",
            "/health (GET)"
        ]
    }

@app.get("/health")
def health():
    return {"status": "healthy", "engine": "ready"}

@app.post("/api/ai/analyze-image")
async def analyze_image(
    file: UploadFile = File(...),
    product_category: Optional[str] = Form("Food & Beverages"),
    package_area_sq_cm: Optional[float] = Form(150.0),
    language: Optional[str] = Form("en")
):
    """
    Full AI pipeline:
    Image Upload -> Preprocessing -> OCR -> NLP Entity Extraction -> Rules Engine Validation -> Risk Scoring
    """
    try:
        contents = await file.read()
        enhanced_image, preproc_meta = preprocess_image_bytes(contents)
        ocr_result = extract_text_and_boxes(enhanced_image, language=language)
        entities = parse_metrology_entities(ocr_result["full_text"], ocr_result.get("boxes", []))
        
        compliance_report = validate_compliance(
            entities=entities,
            product_category=product_category,
            package_area_sq_cm=package_area_sq_cm,
            ocr_boxes=ocr_result.get("boxes", [])
        )
        
        risk_profile = calculate_risk_score(
            manufacturer_name=entities.get("manufacturer_name", {}).get("value", "Unknown"),
            product_category=product_category,
            compliance_score=compliance_report["compliance_score"],
            violations_count=len(compliance_report["violations"])
        )

        return {
            "success": True,
            "filename": file.filename,
            "preprocessing": preproc_meta,
            "ocr_summary": {
                "word_count": len(ocr_result.get("words", [])),
                "extracted_text": ocr_result.get("full_text", ""),
                "confidence_avg": ocr_result.get("confidence_avg", 0.92)
            },
            "entities": entities,
            "compliance_report": compliance_report,
            "risk_profile": risk_profile,
            "bounding_boxes": compliance_report.get("annotated_boxes", ocr_result.get("boxes", []))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing error: {str(e)}")

@app.post("/api/ai/analyze-text")
def analyze_text(payload: TextAnalysisRequest):
    """
    Analyze raw extracted text directly through NLP parser and Rules engine.
    """
    try:
        entities = parse_metrology_entities(payload.raw_text, [])
        compliance_report = validate_compliance(
            entities=entities,
            product_category=payload.product_category or "General Commodity",
            package_area_sq_cm=payload.package_area_sq_cm or 150.0,
            ocr_boxes=[]
        )
        risk_profile = calculate_risk_score(
            manufacturer_name=payload.manufacturer_name or entities.get("manufacturer_name", {}).get("value", "Unknown"),
            product_category=payload.product_category or "General Commodity",
            compliance_score=compliance_report["compliance_score"],
            violations_count=len(compliance_report["violations"])
        )
        return {
            "success": True,
            "entities": entities,
            "compliance_report": compliance_report,
            "risk_profile": risk_profile
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ai/rules-catalog")
def get_rules_catalog():
    """
    Returns full statutory directory of Legal Metrology (Packaged Commodities) Rules, 2011.
    """
    return {
        "act": "Legal Metrology Act, 2009",
        "rules": "Legal Metrology (Packaged Commodities) Rules, 2011 (as amended)",
        "mandatory_declarations": [
            {
                "rule": "Rule 6(1)(a)",
                "title": "Name and Address of Manufacturer / Packer / Importer",
                "description": "Every package must bear the name and complete address of the manufacturer, or packer, or importer.",
                "penalty_section": "Section 36(1) - Fine up to ₹25,000 for first offence, ₹50,000 for second, ₹1,00,000 or imprisonment for subsequent."
            },
            {
                "rule": "Rule 6(1)(b)",
                "title": "Generic / Common Name of Commodity",
                "description": "The common or generic name of the commodity contained in the package.",
                "penalty_section": "Section 36(1)"
            },
            {
                "rule": "Rule 6(1)(c)",
                "title": "Net Quantity Declaration",
                "description": "Net quantity in terms of standard unit of weight or measure (g, kg, ml, l, m) or number.",
                "penalty_section": "Section 36(1) / Section 30"
            },
            {
                "rule": "Rule 6(1)(d)",
                "title": "Month and Year of Manufacture / Packing / Import",
                "description": "The month and year in which the commodity is manufactured or pre-packed or imported (e.g., '03/2026' or 'Mar 2026').",
                "penalty_section": "Section 36(1)"
            },
            {
                "rule": "Rule 6(1)(e)",
                "title": "Maximum Retail Price (MRP)",
                "description": "Retail sale price of package clearly stated as 'MRP Rs. XX.XX incl. of all taxes'.",
                "penalty_section": "Section 36(1) & (2) - Strict liability for overcharging."
            },
            {
                "rule": "Rule 6(1)(f)",
                "title": "Consumer Care Details",
                "description": "Name, address, telephone number and e-mail address of the person/office to be contacted in case of consumer complaints.",
                "penalty_section": "Section 36(1)"
            },
            {
                "rule": "Rule 6(1)(g)",
                "title": "Country of Origin",
                "description": "Mandatory declaration of country of manufacture or origin for all domestic and imported goods.",
                "penalty_section": "Section 36(1)"
            },
            {
                "rule": "Rule 7 & 8",
                "title": "Principal Display Panel (PDP) & Font Size Schedule",
                "description": "Font height of net quantity and MRP must comply with minimum height schedule based on package area and weight.",
                "penalty_section": "Rule 32 / Section 36(1)"
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
