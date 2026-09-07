const express = require('express');
const router = express.Router();
const { sampleProducts } = require('../data/store');

router.get('/', (req, res) => {
  res.json({
    success: true,
    count: sampleProducts.length,
    products: sampleProducts
  });
});

router.get('/:id', (req, res) => {
  const product = sampleProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

router.post('/scan', (req, res) => {
  // Mock endpoint to register scanned product
  const { name, category, image, extractedText, complianceResult } = req.body;
  const newProduct = {
    id: `prod_${Date.now()}`,
    name: name || "Scanned Commodity Package",
    category: category || "Food & Beverages",
    image: image || sampleProducts[0].image,
    extractedText: extractedText || "",
    complianceScore: complianceResult ? complianceResult.complianceScore : 85,
    status: complianceResult ? complianceResult.status : "COMPLIANT",
    riskLevel: complianceResult ? complianceResult.riskLevel : "Low Risk",
    violations: complianceResult ? complianceResult.violations : [],
    warnings: complianceResult ? complianceResult.warnings : [],
    createdAt: new Date().toISOString()
  };
  sampleProducts.unshift(newProduct);
  res.json({ success: true, product: newProduct });
});

module.exports = router;
