import React, { useEffect, useRef } from 'react';
import { Cpu, Zap } from 'lucide-react';

export default function NeuralCoreCanvas({ isProcessing = false, currentStep = 0, statusMessage = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement.clientHeight || 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      buildLayers();
    };

    window.addEventListener('resize', handleResize);

    // Multi-layer Neural Network Architecture
    // Layer 0: Input (4 nodes)
    // Layer 1: Feature Extraction (6 nodes)
    // Layer 2: Pattern Recognition (5 nodes)
    // Layer 3: Output Classification (2 nodes)
    const layerSizes = [4, 6, 5, 2];
    let layers = [];
    let signalPackets = [];

    class NetworkNode {
      constructor(x, y, layerIndex, nodeIndex) {
        this.x = x;
        this.y = y;
        this.layerIndex = layerIndex;
        this.nodeIndex = nodeIndex;
        this.baseRadius = layerIndex === 0 || layerIndex === 3 ? 5 : 4;
        this.phase = Math.random() * Math.PI * 2;
        this.intensity = 0.4;
      }

      update(active) {
        this.phase += active ? 0.08 : 0.03;
        this.intensity = active ? 0.6 + Math.sin(this.phase) * 0.4 : 0.3 + Math.sin(this.phase) * 0.15;
      }

      draw() {
        const radius = this.baseRadius + this.intensity * 2.5;
        const color = this.layerIndex === 3 ? '#A855F7' : this.layerIndex === 0 ? '#3B82F6' : '#00F0FF';

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = this.intensity * 18;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Core bright center
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, this.baseRadius * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }
    }

    class Packet {
      constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.025;
        this.color = Math.random() > 0.5 ? '#00F0FF' : '#A855F7';
      }

      update() {
        this.progress += this.speed;
      }

      draw() {
        if (this.progress > 1) return;
        const x = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
        const y = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function buildLayers() {
      layers = [];
      const numLayers = layerSizes.length;
      const xPadding = 45;
      const availableWidth = width - xPadding * 2;
      const xSpacing = availableWidth / (numLayers - 1);

      layerSizes.forEach((size, lIndex) => {
        const layerNodes = [];
        const x = xPadding + lIndex * xSpacing;
        const ySpacing = (height - 60) / (size + 1);

        for (let nIndex = 0; nIndex < size; nIndex++) {
          const y = 30 + (nIndex + 1) * ySpacing;
          layerNodes.push(new NetworkNode(x, y, lIndex, nIndex));
        }
        layers.push(layerNodes);
      });
    }

    buildLayers();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isActive = isProcessing || currentStep === 4;

      // Draw Connections between adjacent layers
      for (let l = 0; l < layers.length - 1; l++) {
        const fromLayer = layers[l];
        const toLayer = layers[l + 1];

        fromLayer.forEach(fromNode => {
          toLayer.forEach(toNode => {
            const alpha = isActive ? 0.35 : 0.12;
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = isActive ? `rgba(0, 240, 255, ${alpha})` : `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = isActive ? 1.2 : 0.8;
            ctx.stroke();

            // Spawn traveling signals when active
            if (isActive && Math.random() < 0.035 && signalPackets.length < 30) {
              signalPackets.push(new Packet(fromNode, toNode));
            }
          });
        });
      }

      // Update and draw packets
      signalPackets = signalPackets.filter(p => p.progress <= 1);
      signalPackets.forEach(p => {
        p.update();
        p.draw();
      });

      // Update and draw nodes
      layers.forEach(layer => {
        layer.forEach(node => {
          node.update(isActive);
          node.draw();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isProcessing, currentStep]);

  return (
    <div className="relative w-full h-64 md:h-72 rounded-2xl glass-card border border-cyan-500/20 shadow-glass-glow flex flex-col justify-between p-4 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isProcessing ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Neural Processing Core
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">Dense 4-Layer Feedforward Topology</p>
          </div>
        </div>

        {isProcessing && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">
            <Zap className="w-3 h-3 text-cyan-400" />
            SYNAPSES FIRING
          </span>
        )}
      </div>

      {/* Center Canvas */}
      <div className="relative flex-1 w-full my-2">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Live Status Message Bar */}
      <div className="z-10 px-3.5 py-2 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-300">
          <span className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
          <span className="truncate">{statusMessage || 'Awaiting activation trigger'}</span>
        </div>
        <span className="text-[10px] text-slate-500 uppercase">Layers: 4 | Weights: 84</span>
      </div>
    </div>
  );
}
