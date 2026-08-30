/**
 * Computer Vision / Image Classification Simulation Engine
 * Visualizes convolutional filters, edge detection, feature maps, and softmax probabilities.
 */

export const IMAGE_SAMPLES = [
  {
    id: 'cat',
    label: 'Cat (Domestic Short Hair)',
    category: 'Feline Mammal',
    badge: 'Animal',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    fallbackSvg: 'cat',
    detectedFeatures: [
      { name: 'Triangular Ear Geometry', category: 'High-Level Contour', weight: 32, box: { top: '15%', left: '20%', width: '60%', height: '30%' } },
      { name: 'Fur Texture & Micro-gradients', category: 'Low-Level Texture', weight: 24, box: { top: '35%', left: '30%', width: '40%', height: '40%' } },
      { name: 'Elliptical Iris & Eye Sockets', category: 'Mid-Level Pattern', weight: 28, box: { top: '30%', left: '25%', width: '50%', height: '25%' } },
      { name: 'Whisker Radiance Pattern', category: 'Mid-Level Line Feature', weight: 16, box: { top: '50%', left: '15%', width: '70%', height: '35%' } }
    ],
    probabilities: [
      { label: 'Cat', percentage: 92, color: '#00F0FF' },
      { label: 'Dog', percentage: 5, color: '#6366F1' },
      { label: 'Fox / Wild Mammal', percentage: 2, color: '#A855F7' },
      { label: 'Other', percentage: 1, color: '#64748B' }
    ],
    prediction: 'CAT',
    confidence: 92,
    explanation: 'High concentration of triangular ear contours, distinct feline whisker orientation, and elliptical eye patterns generated a 92% softmax confidence score.'
  },
  {
    id: 'dog',
    label: 'Dog (Golden Retriever)',
    category: 'Canine Mammal',
    badge: 'Animal',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    fallbackSvg: 'dog',
    detectedFeatures: [
      { name: 'Elongated Snout & Nostril Pattern', category: 'High-Level Structure', weight: 34, box: { top: '45%', left: '30%', width: '40%', height: '40%' } },
      { name: 'Floppy Ear Contour', category: 'High-Level Contour', weight: 26, box: { top: '20%', left: '10%', width: '80%', height: '35%' } },
      { name: 'Canine Eye Angle & Fur Grain', category: 'Mid-Level Pattern', weight: 22, box: { top: '30%', left: '25%', width: '50%', height: '25%' } },
      { name: 'Muzzle Texture & Jawline', category: 'Mid-Level Shape', weight: 18, box: { top: '55%', left: '25%', width: '50%', height: '30%' } }
    ],
    probabilities: [
      { label: 'Dog', percentage: 89, color: '#00F0FF' },
      { label: 'Wolf / Wild Canine', percentage: 7, color: '#6366F1' },
      { label: 'Cat', percentage: 3, color: '#A855F7' },
      { label: 'Other', percentage: 1, color: '#64748B' }
    ],
    prediction: 'DOG',
    confidence: 89,
    explanation: 'Strong structural signals from elongated snout geometry and characteristic canine jawline produced an 89% class confidence.'
  },
  {
    id: 'car',
    label: 'Sports Car (Vehicle)',
    category: 'Automotive',
    badge: 'Object',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    fallbackSvg: 'car',
    detectedFeatures: [
      { name: 'Circular Wheel Hub Geometry', category: 'Geometric Primitive', weight: 35, box: { top: '55%', left: '15%', width: '70%', height: '35%' } },
      { name: 'Metallic Specular Reflection', category: 'Low-Level Luminance', weight: 25, box: { top: '30%', left: '20%', width: '60%', height: '40%' } },
      { name: 'Aerodynamic Chassis Outline', category: 'High-Level Contour', weight: 22, box: { top: '25%', left: '10%', width: '80%', height: '45%' } },
      { name: 'Headlight Symmetry & Grille', category: 'Mid-Level Component', weight: 18, box: { top: '40%', left: '60%', width: '35%', height: '30%' } }
    ],
    probabilities: [
      { label: 'Sports Car', percentage: 95, color: '#00F0FF' },
      { label: 'Truck / SUV', percentage: 3, color: '#6366F1' },
      { label: 'Motorcycle', percentage: 1, color: '#A855F7' },
      { label: 'Other', percentage: 1, color: '#64748B' }
    ],
    prediction: 'SPORTS CAR',
    confidence: 95,
    explanation: 'Circular wheel symmetry, horizontal streamline gradients, and metallic reflectance confirmed vehicle classification with 95% confidence.'
  }
];

export const CONV_LAYERS = [
  {
    name: 'Layer 1: Low-Level Edges & Gradients',
    description: 'Detects horizontal, vertical, diagonal edges, color transitions, and pixel contrast.',
    nodes: 8,
    frequency: 'High'
  },
  {
    name: 'Layer 2: Mid-Level Textures & Patterns',
    description: 'Combines edges into geometric primitives: circles, curves, fur grains, and surface textures.',
    nodes: 12,
    frequency: 'Mid'
  },
  {
    name: 'Layer 3: High-Level Object Parts',
    description: 'Assembles parts into semantic units: ears, eyes, wheels, snouts, chassis, headlights.',
    nodes: 10,
    frequency: 'Semantics'
  },
  {
    name: 'Layer 4: Fully Connected Classification',
    description: 'Calculates softmax probability distribution across trained object classes.',
    nodes: 4,
    frequency: 'Output'
  }
];
