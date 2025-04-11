import React, { useRef, useEffect } from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { algorithm, type, visualData, currentStep } = useAlgorithmStore();

  // Color palette for visualization
  const colors = {
    default: '#60A5FA', // blue-400
    comparing: '#F59E0B', // yellow-500
    swapping: '#10B981', // emerald-500
    visited: '#8B5CF6', // violet-500
    current: '#EC4899', // pink-500
    wall: '#1F2937', // gray-800
    path: '#34D399', // emerald-400
    text: '#F3F4F6', // gray-100
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth * 0.7;
      canvas.height = Math.min(container.clientWidth * 0.6, 400);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!algorithm || !type || currentStep >= visualData.length) {
      ctx.fillStyle = '#4B5563';
      ctx.font = '16px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'Select an algorithm ',
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }

    const frame = visualData[currentStep];
    if (frame) {
      drawVisualization(ctx, frame, type);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [algorithm, type, visualData, currentStep]);

  const drawVisualization = (
    ctx: CanvasRenderingContext2D,
    frame: any,
    type: string
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    switch (type) {
      case 'sorting':
        drawSortingVisualization(ctx, frame);
        break;
      case 'searching':
        drawSearchingVisualization(ctx, frame);
        break;
      case 'pathfinding':
        drawPathfindingVisualization(ctx, frame);
        break;
      case 'tree':
        drawTreeVisualization(ctx, frame);
        break;
      case 'graph':
        drawGraphVisualization(ctx, frame);
        break;
      case 'linear':
        drawLinearVisualization(ctx, frame);
        break;
    }
  };

  const drawSortingVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { array, comparing, swapping } = frame;
    const padding = 40;
    const availableWidth = ctx.canvas.width - 2 * padding;
    const availableHeight = ctx.canvas.height - 2 * padding;
    const barWidth = availableWidth / array.length;
    const maxValue = Math.max(...array);
    
    array.forEach((value: number, index: number) => {
      const height = (value / maxValue) * availableHeight;
      const x = padding + index * barWidth;
      const y = ctx.canvas.height - padding - height;
      
      // Determine bar color based on state
      ctx.fillStyle = colors.default;
      if (comparing.includes(index)) ctx.fillStyle = colors.comparing;
      if (swapping.includes(index)) ctx.fillStyle = colors.swapping;
      
      // Draw bar
      ctx.fillRect(x, y, barWidth - 2, height);
      
      // Draw value text
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
  };

  // Add this function below the existing visualization functions

  const drawSearchingVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { array, current, target, found, low, high, mid } = frame;
    const padding = 40;
    const availableWidth = ctx.canvas.width - 2 * padding;
    const availableHeight = ctx.canvas.height - 2 * padding;
    const barWidth = availableWidth / array.length;
    const maxValue = Math.max(...array);
  
    array.forEach((value: number, index: number) => {
      const height = (value / maxValue) * availableHeight;
      const x = padding + index * barWidth;
      const y = ctx.canvas.height - padding - height;
  
      // Determine bar color based on state
      ctx.fillStyle = colors.default;
      if (low !== undefined && high !== undefined && mid !== undefined) {
        // Binary Search visualization
        if (index === mid) ctx.fillStyle = colors.current; // Highlight the mid index
        if (index >= low && index <= high) ctx.fillStyle = colors.visited; // Highlight the search range
      } else {
        // Linear Search visualization
        if (index === current) ctx.fillStyle = colors.current; // Highlight the current index
      }
      if (value === target && found) ctx.fillStyle = colors.swapping; // Highlight the found target
  
      // Draw bar
      ctx.fillRect(x, y, barWidth - 2, height);
  
      // Draw value text
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
  
    // Display target value
    ctx.fillStyle = colors.text;
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Target: ${target}`,
      ctx.canvas.width / 2,
      ctx.canvas.height - padding / 2
    );
  };

  const drawPathfindingVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { grid, visited, current, path } = frame;
    if (!grid) return;

    const cellSize = Math.min(
      (ctx.canvas.width - 20) / grid[0].length,
      (ctx.canvas.height - 20) / grid.length
    );
    const offsetX = (ctx.canvas.width - cellSize * grid[0].length) / 2;
    const offsetY = (ctx.canvas.height - cellSize * grid.length) / 2;

    grid.forEach((row: string[], i: number) => {
      row.forEach((cell: string, j: number) => {
        const x = offsetX + j * cellSize;
        const y = offsetY + i * cellSize;

        // Draw cell background
        ctx.fillStyle = colors.default;
        if (cell === '#') ctx.fillStyle = colors.wall;
        if (cell === 'S') ctx.fillStyle = colors.comparing;
        if (cell === 'G') ctx.fillStyle = colors.swapping;
        if (visited?.includes(`${i},${j}`)) ctx.fillStyle = colors.visited;
        if (path?.includes(`${i},${j}`)) ctx.fillStyle = colors.path;
        if (current?.[0] === i && current?.[1] === j) ctx.fillStyle = colors.current;

        ctx.fillRect(x, y, cellSize - 2, cellSize - 2);

        // Draw cell text
        ctx.fillStyle = colors.text;
        ctx.font = `${cellSize / 2}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cell, x + cellSize / 2, y + cellSize / 2);
      });
    });
  };

  const drawTreeVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { tree, visited, current } = frame;
    if (!tree) return;

    const nodeRadius = 20;
    const levelHeight = 60;
    const startX = ctx.canvas.width / 2;
    const startY = nodeRadius + 10;

    const drawNode = (value: number, x: number, y: number, level: number) => {
      // Draw node circle
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      
      // Set node color based on state
      ctx.fillStyle = colors.default;
      if (visited?.includes(value)) ctx.fillStyle = colors.visited;
      if (current === value) ctx.fillStyle = colors.current;
      
      ctx.fill();
      ctx.stroke();

      // Draw value text
      ctx.fillStyle = colors.text;
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), x, y);

      // Draw edges to children if they exist
      const leftChildIndex = 2 * level + 1;
      const rightChildIndex = 2 * level + 2;
      const nextY = y + levelHeight;
      const spread = ctx.canvas.width / Math.pow(2, Math.floor(Math.log2(level + 2)));

      if (leftChildIndex < tree.length) {
        ctx.beginPath();
        ctx.moveTo(x - nodeRadius, y);
        ctx.lineTo(x - spread / 2, nextY - nodeRadius);
        ctx.stroke();
        drawNode(tree[leftChildIndex], x - spread / 2, nextY, leftChildIndex);
      }

      if (rightChildIndex < tree.length) {
        ctx.beginPath();
        ctx.moveTo(x + nodeRadius, y);
        ctx.lineTo(x + spread / 2, nextY - nodeRadius);
        ctx.stroke();
        drawNode(tree[rightChildIndex], x + spread / 2, nextY, rightChildIndex);
      }
    };

    drawNode(tree[0], startX, startY, 0);
  };

  const drawGraphVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { nodes, edges, visited, current } = frame;
    if (!nodes) return;

    const nodeRadius = 20;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Draw edges
    edges?.forEach((edge: any) => {
      const startNode = nodes[edge.from];
      const endNode = nodes[edge.to];
      
      ctx.beginPath();
      ctx.moveTo(startNode.x * width, startNode.y * height);
      ctx.lineTo(endNode.x * width, endNode.y * height);
      ctx.strokeStyle = edge.selected ? colors.path : colors.default;
      ctx.stroke();

      // Draw weight
      const midX = (startNode.x + endNode.x) * width / 2;
      const midY = (startNode.y + endNode.y) * height / 2;
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    nodes.forEach((node: any, index: number) => {
      ctx.beginPath();
      ctx.arc(node.x * width, node.y * height, nodeRadius, 0, Math.PI * 2);
      
      ctx.fillStyle = colors.default;
      if (visited?.includes(index)) ctx.fillStyle = colors.visited;
      if (current === index) ctx.fillStyle = colors.current;
      
      ctx.fill();
      ctx.stroke();

      // Draw node value
      ctx.fillStyle = colors.text;
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index.toString(), node.x * width, node.y * height);
    });
  };

  const drawLinearVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { stack, queue, current, operation } = frame;
    const data = stack || queue;
    if (!data) return;

    const itemWidth = 60;
    const itemHeight = 40;
    const padding = 20;
    const startX = (ctx.canvas.width - itemWidth * data.length) / 2;
    const startY = (ctx.canvas.height - itemHeight) / 2;

    data.forEach((item: string, index: number) => {
      const x = startX + index * itemWidth;
      const y = startY;

      // Draw item box
      ctx.fillStyle = colors.default;
      if (item === current) ctx.fillStyle = colors.current;
      ctx.fillRect(x, y, itemWidth - 2, itemHeight);

      // Draw item text
      ctx.fillStyle = colors.text;
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.toString(), x + itemWidth / 2, y + itemHeight / 2);

      // Draw operation indicator
      if (item === current) {
        ctx.fillStyle = operation === 'push' ? colors.comparing : colors.swapping;
        ctx.beginPath();
        ctx.moveTo(x + itemWidth / 2, y - 15);
        ctx.lineTo(x + itemWidth / 2 - 10, y - 25);
        ctx.lineTo(x + itemWidth / 2 + 10, y - 25);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg bg-gray-900"
      />
    </div>
  );
};

export default Canvas;