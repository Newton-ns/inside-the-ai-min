const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { certificates, sampleProducts } = require('../data/store');

router.get('/', (req, res) => {
  res.json({ success: true, count: certificates.length, certificates });
});

router.get('/:id', (req, res) => {
  const cert = certificates.find(c => c.id === req.params.id);
  if (!cert) {
    return res.status(404).json({ success: false, message: 'Certificate not found or expired.' });
  }
  res.json({ success: true, certificate: cert });
});

router.post('/generate', (req, res) => {
  const { productName, manufacturer, complianceScore, reportId } = req.body;
  const certId = `CERT-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const hash = crypto.createHash('sha256').update(`${certId}-${productName}-${Date.now()}`).digest('hex');

  const newCert = {
    id: certId,
    reportId: reportId || `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    productName: productName || "Sample Commodity",
    manufacturer: manufacturer || "Verified Manufacturer Pvt Ltd",
    complianceScore: complianceScore || 95,
    status: complianceScore >= 85 ? "VERIFIED_COMPLIANT" : "CONDITIONAL_APPROVAL",
    issuedBy: "Directorate of Legal Metrology, Government of India",
    officer: "Rajesh Kumar, LMO (Badge: DL-LM-4402)",
    issuedDate: new Date().toISOString().split('T')[0],
    validTill: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
    digitalSignatureHash: hash,
    qrCodeUrl: `https://lm-verify.gov.in/verify/${certId}`
  };

  certificates.unshift(newCert);
  res.json({ success: true, certificate: newCert });
});

module.exports = router;
