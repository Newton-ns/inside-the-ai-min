const express = require('express');
const router = express.Router();
const { inspectionReports, sampleProducts } = require('../data/store');

router.get('/reports', (req, res) => {
  res.json({
    success: true,
    count: inspectionReports.length,
    reports: inspectionReports
  });
});

router.get('/reports/:id', (req, res) => {
  const report = inspectionReports.find(r => r.id === req.params.id);
  if (!report) {
    return res.status(404).json({ success: false, message: 'Inspection report not found' });
  }
  res.json({ success: true, report });
});

router.post('/issue-notice', (req, res) => {
  const { productId, actionType, inspectorName, penalty } = req.body;
  const noticeNumber = `LM/DL/2026/NOT-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReport = {
    id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    productId: productId || "prod_custom",
    productName: req.body.productName || "Packaged Product",
    manufacturer: req.body.manufacturer || "Unknown Manufacturer",
    inspectorName: inspectorName || "Rajesh Kumar, LMO",
    inspectorBadge: "DL-LM-4402",
    location: req.body.location || "District Inspection Zone",
    inspectionDate: new Date().toISOString(),
    complianceScore: req.body.score || 50,
    status: req.body.status || "PARTIALLY COMPLIANT",
    actionTaken: actionType || "Section 36 Statutory Notice Issued",
    penaltyEstimated: penalty || 25000,
    noticeNumber,
    qrData: `https://lm-verify.gov.in/report/${noticeNumber}`
  };
  inspectionReports.unshift(newReport);
  res.json({ success: true, report: newReport, noticeNumber });
});

module.exports = router;
