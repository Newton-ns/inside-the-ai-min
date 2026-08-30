import React, { useEffect, useRef } from 'react';

/**
 * Interactive Neural Network Canvas Background
 * Renders glowing nodes, pulsing connections, and data particles that react subtly to mouse movements.
 */
export default function NeuralBackground({ interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: width / 2, y: height / 2, radius: 160 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Node & Particle setup
    let nodes = [];
    const numNodes = Math.min(65, Math.floor((width * height) / 18000));

    class Node {
      constructor(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2.5 + 1.5;
        this.baseRadius = this.radius;
        this.color = Math.random() > 0.6 ? '#00F0FF' : Math.random() > 0.3 ? '#3B82F6' : '#A855F7';
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.pulse += this.pulseSpeed;

        // Subtle mouse pull
        if (interactive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
          }
        }
      }

      draw() {
        const currentRadius = this.baseRadius + Math.sin(this.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Traveling Signal Packets
    class SignalParticle {
      constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.progress = 0;
        this.speed = 0.008 + Math.random() * 0.012;
        this.color = '#00F0FF';
      }

      update() {
        this.progress += this.speed;
      }

      draw() {
        if (this.progress > 1) return;
        const currentX = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
        const currentY = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let signals = [];

    function initNodes() {
      nodes = [];
      for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
      }
    }

    initNodes();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Randomly spawn traveling signals
            if (Math.random() < 0.0008 && signals.length < 15) {
              signals.push(new SignalParticle(nodes[i], nodes[j]));
            }
          }
        }
      }

      // Update and draw signal particles
      signals = signals.filter(s => s.progress <= 1);
      signals.forEach(s => {
        s.update();
        s.draw();
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
