import React, { useRef, useEffect, useState } from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const { algorithm, type, visualData, currentStep } = useAlgorithmStore();

  const colors = {
    default: '#60A5FA', // blue-400
    comparing: '#F59E0B', // yellow-500
    swapping: '#10B981', // emerald-500
    visited: '#8B5CF6', // violet-500
    current: '#EC4899', // pink-500
    wall: '#1F2937', // gray-800
    path: '#34D399', // emerald-400
    text: '#F3F4F6', // gray-100
    notFound: 'red',
    top: '#ffd700',    // yellow
    front: '#90ee90',  // green
    back: '#add8e6',   // blue
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
    ctx.setTransform(zoom, 0, 0, zoom, 0, 0); // <-- FIXED HERE!
  
    if (!algorithm || !type || currentStep >= visualData.length) {
      const zoomCenterX = canvas.width / 2;
      const zoomCenterY = canvas.height / 2;
  
      ctx.translate(zoomCenterX, zoomCenterY);
      ctx.translate(-zoomCenterX, -zoomCenterY);
  
      ctx.fillStyle = '#4B5563';
      ctx.font = `${16}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'Select an algorithm',
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }
  
    const frame = visualData[currentStep];
    if (frame) {
      drawVisualization(ctx, frame, type);
    }
  
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [algorithm, type, visualData, currentStep, zoom]); // <-- Don't forget to add zoom in dependencies
  

  
  const drawVisualization = (
    ctx: CanvasRenderingContext2D,
    frame: any,
    type: string
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    switch (type) {
      case 'sorting':
        drawSortingVisualization(ctx, frame, currentStep === visualData.length - 1);
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
      case 'linkedStructures':
        drawLinkedVisualization(ctx, frame);
        break;
      case 'dynamic':
        
        break;
      case 'backtracking':
        
        break;
      default:
    }
  };

  const drawSortingVisualization = (ctx: CanvasRenderingContext2D, frame: any, isFinalFrame: boolean) => {
    const { array, comparing = [], swapping = [] } = frame;
    const padding = 40;
    const availableWidth = ctx.canvas.width - 2 * padding;
    const availableHeight = ctx.canvas.height - 2 * padding;
    const barWidth = availableWidth / array.length;
    const maxValue = Math.max(...array);
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous frame
  
    array.forEach((value: number, index: number) => {
      const height = (value / maxValue) * availableHeight;
      const x = padding + index * barWidth;
      const y = ctx.canvas.height - padding - height;
  
      ctx.fillStyle = colors.default;
      if (comparing.includes(index)) ctx.fillStyle = colors.comparing;
      if (swapping.includes(index)) ctx.fillStyle = colors.swapping;
  
      ctx.fillRect(x, y, barWidth - 2, height);
  
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
  
    // ✅ Show completion message
    if (isFinalFrame) {
      ctx.fillStyle = '#00FF00'; // Bright green
      ctx.font = 'bold 28px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Array Sorted!!', ctx.canvas.width / 2, padding);
    }
  };
  

  const drawLinkedVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { type, nodes = [], currentIndex, slowIndex, fastIndex, loopTo } = frame;
  
    const boxWidth = 60;
    const boxHeight = 40;
    const spacing = 80;
    const startX = 50;
    const startY = 100;
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    nodes.forEach((value: string, index: number) => {
      const x = startX + index * spacing;
      const y = startY;
  
      // Box
      ctx.beginPath();
      ctx.rect(x, y, boxWidth, boxHeight);
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
  
      // Value
      ctx.fillText(value, x + boxWidth / 2, y + boxHeight / 2);
  
      // Next arrow
      if (index < nodes.length - 1 || (type === 'Cycle Detection' && index === nodes.length - 1 && typeof loopTo === 'number')) {
        const arrowX = x + boxWidth;
        const arrowY = y + boxHeight / 2;
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX + 20, arrowY);
        ctx.stroke();
        ctx.closePath();
  
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(arrowX + 20, arrowY);
        ctx.lineTo(arrowX + 15, arrowY - 5);
        ctx.lineTo(arrowX + 15, arrowY + 5);
        ctx.fill();
        ctx.closePath();
      }
  
      // Double arrow for doubly linked list
      if (type === 'Doubly Linked List' && index > 0) {
        const backArrowX = x;
        const backArrowY = y + boxHeight / 2 + 10;
        ctx.beginPath();
        ctx.moveTo(backArrowX, backArrowY);
        ctx.lineTo(backArrowX - 20, backArrowY);
        ctx.stroke();
        ctx.closePath();
  
        ctx.beginPath();
        ctx.moveTo(backArrowX - 20, backArrowY);
        ctx.lineTo(backArrowX - 15, backArrowY - 5);
        ctx.lineTo(backArrowX - 15, backArrowY + 5);
        ctx.fill();
        ctx.closePath();
      }
  
      // Current traversal highlight
      if (index === currentIndex) {
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(x - 2, y - 2, boxWidth + 4, boxHeight + 4);
      }
  
      // Slow pointer (Cycle Detection)
      if (type === 'Cycle Detection' && index === slowIndex) {
        ctx.fillStyle = 'green';
        ctx.fillText('S', x + boxWidth / 2, y - 15);
        ctx.fillStyle = 'black';
      }
  
      // Fast pointer (Cycle Detection)
      if (type === 'Cycle Detection' && index === fastIndex) {
        ctx.fillStyle = 'red';
        ctx.fillText('F', x + boxWidth / 2, y - 30);
        ctx.fillStyle = 'black';
      }
    });
  
    // Draw loop curve (Cycle Detection)
    if (type === 'Cycle Detection' && typeof loopTo === 'number' && loopTo >= 0 && loopTo < nodes.length) {
      const fromX = startX + (nodes.length - 1) * spacing + boxWidth;
      const toX = startX + loopTo * spacing;
      const controlY = startY + 100;
      ctx.beginPath();
      ctx.moveTo(fromX, startY + boxHeight / 2);
      ctx.bezierCurveTo(fromX + 60, controlY, toX - 60, controlY, toX, startY + boxHeight / 2);
      ctx.strokeStyle = 'orange';
      ctx.stroke();
      ctx.closePath();
  
      // Arrowhead at the end of loop
      ctx.beginPath();
      ctx.moveTo(toX, startY + boxHeight / 2);
      ctx.lineTo(toX - 5, startY + boxHeight / 2 - 5);
      ctx.lineTo(toX - 5, startY + boxHeight / 2 + 5);
      ctx.fill();
      ctx.closePath();
    }
  };
  
  

  const drawSearchingVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { array, current, target, found, low, high, mid, done, lastMid, lastDirection } = frame;
    const padding = 40;
    const availableWidth = ctx.canvas.width - 2 * padding;
    const availableHeight = ctx.canvas.height - 2 * padding;
    const barWidth = availableWidth / array.length;
    const maxValue = Math.max(...array);
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas each frame
  
    array.forEach((value: number, index: number) => {
      const height = (value / maxValue) * availableHeight;
      const x = padding + index * barWidth;
      const y = ctx.canvas.height - padding - height;
  
      // Set default color
      ctx.fillStyle = colors.default;
  
      if (low !== undefined && high !== undefined && mid !== undefined) {
        // Binary Search Visualization
        if (index >= low && index <= high) ctx.fillStyle = colors.visited; // Search range
        if (index === mid) ctx.fillStyle = colors.current; // Mid index
      } else if (current !== undefined) {
        // Linear Search Visualization
        if (index === current) ctx.fillStyle = colors.current; // Currently checking
      }
  
      if (value === target && found) {
        ctx.fillStyle = colors.swapping; // Target found highlight
      }
  
      ctx.fillRect(x, y, barWidth - 2, height);
  
      // Draw value label
      ctx.fillStyle = colors.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
  
    // Display Target Info
    ctx.fillStyle = colors.text;
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(`Target: ${target}`, ctx.canvas.width / 2, padding / 2);
  
    // Show Result Text or Status
    if (done) {
      ctx.font = '20px system-ui';
      ctx.fillStyle = found ? colors.swapping : colors.notFound;
  
      if (low !== undefined && high !== undefined && mid !== undefined) {
        // Binary Search Completion Message
        ctx.fillText(
          found ? `🎯 Target Found at index ${mid}` : '❌ Target Not Found in Binary Search',
          ctx.canvas.width / 2,
          ctx.canvas.height - padding / 2
        );
      } else {
        // Linear Search Completion Message
        ctx.fillText(
          found ? `🎯 Target Found at index ${current}` : '❌ Target Not Found in Linear Search',
          ctx.canvas.width / 2,
          ctx.canvas.height - padding / 2
        );
      }
    } else if (low !== undefined && high !== undefined && mid !== undefined) {
      // Binary Search explanation during animation
      ctx.font = '16px system-ui';
      ctx.fillStyle = colors.text;
      let explanation = '';
  
      if (array[mid] < target) {
        explanation = `🔍 ${array[mid]} < ${target} → Going Right`;
      } else if (array[mid] > target) {
        explanation = `🔍 ${array[mid]} > ${target} → Going Left`;
      } else {
        explanation = `🎯 Found ${target} at index ${mid}`;
      }
  
      ctx.fillText(explanation, ctx.canvas.width / 2, ctx.canvas.height - padding);
    }
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
    const { nodes, edges, visited = [], current = null } = frame;
    if (!nodes || !edges) return;
  
    const nodeRadius = 20;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
  
    ctx.clearRect(0, 0, width, height);
  
    // Apply zoom effect
    ctx.save(); // Save the current context state
    ctx.scale(zoom, zoom); // Scale the canvas based on the zoom level
  
    // Draw edges
    edges.forEach((edge: any) => {
      const startNode = nodes[edge.from];
      const endNode = nodes[edge.to];
  
      ctx.beginPath();
      ctx.moveTo(startNode.x * width, startNode.y * height);
      ctx.lineTo(endNode.x * width, endNode.y * height);
  
      ctx.strokeStyle = edge.selected ? colors.path : colors.default;
      ctx.lineWidth = edge.selected ? 3 : 1;
      ctx.stroke();
  
      // Draw weight at midpoint
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
  
      if (current === index) {
        ctx.fillStyle = colors.current;
      } else if (visited.includes(index)) {
        ctx.fillStyle = colors.visited;
      } else {
        ctx.fillStyle = colors.default;
      }
  
      ctx.fill();
      ctx.stroke();
  
      // Draw node label (number)
      ctx.fillStyle = colors.text;
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index.toString(), node.x * width, node.y * height);
    });
  
    ctx.restore(); // Restore the context state
  };
  

  const drawLinearVisualization = (ctx: CanvasRenderingContext2D, frame: any) => {
    const { stack, queue, current, operation } = frame;
    const isStack = !!stack;
    const data = stack || queue;
  
    if (!data) return;
  
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    const itemWidth = 80;
    const itemHeight = 40;
    const padding = 10;
  
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
  
    // Text at the top describing what's happening
    ctx.fillStyle = colors.text;
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(
      isStack
        ? `Operation: ${operation.toUpperCase()} ${current} on Stack`
        : `Operation: ${operation.toUpperCase()} ${current} on Queue`,
      centerX,
      30
    );
  
    if (isStack) {
      // Stack (vertical layout)
      const totalHeight = data.length * (itemHeight + padding);
      const startY = centerY - totalHeight / 2;
  
      data.forEach((item: string, index: number) => {
        const x = centerX - itemWidth / 2;
        const y = startY + index * (itemHeight + padding);
  
        // Highlight top item
        if (index === data.length - 1) {
          ctx.fillStyle = colors.top || '#ffd700';
          ctx.font = '14px system-ui';
          ctx.fillText('Top', x - 30, y + itemHeight / 2);
        }
  
        // Draw item
        ctx.fillStyle = item === current ? colors.current : colors.default;
        ctx.fillRect(x, y, itemWidth, itemHeight);
  
        // Text
        ctx.fillStyle = colors.text;
        ctx.font = '16px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.toString(), x + itemWidth / 2, y + itemHeight / 2);
      });
  
      // Draw base line
      ctx.strokeStyle = '#ccc';
      ctx.beginPath();
      ctx.moveTo(centerX - itemWidth / 2 - 10, startY + data.length * (itemHeight + padding));
      ctx.lineTo(centerX + itemWidth / 2 + 10, startY + data.length * (itemHeight + padding));
      ctx.stroke();
    } else {
      // Queue (horizontal layout)
      const totalWidth = data.length * (itemWidth + padding);
      const startX = centerX - totalWidth / 2;
  
      data.forEach((item: string, index: number) => {
        const x = startX + index * (itemWidth + padding);
        const y = centerY;
  
        // Highlight front and back
        if (index === 0) {
          ctx.fillStyle = colors.front || '#90ee90';
          ctx.font = '14px system-ui';
          ctx.fillText('Front', x + itemWidth / 2, y - 20);
        } else if (index === data.length - 1) {
          ctx.fillStyle = colors.back || '#add8e6';
          ctx.font = '14px system-ui';
          ctx.fillText('Back', x + itemWidth / 2, y - 20);
        }
  
        // Draw item
        ctx.fillStyle = item === current ? colors.current : colors.default;
        ctx.fillRect(x, y, itemWidth, itemHeight);
  
        // Text
        ctx.fillStyle = colors.text;
        ctx.font = '16px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.toString(), x + itemWidth / 2, y + itemHeight / 2);
      });
  
      // Draw base line
      ctx.strokeStyle = '#ccc';
      ctx.beginPath();
      ctx.moveTo(startX - 10, centerY + itemHeight + 10);
      ctx.lineTo(startX + totalWidth + 10, centerY + itemHeight + 10);
      ctx.stroke();
    }
  };
  

  return (
    <div className="bg-blue-600 rounded-lg p-2 shadow-lg">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg bg-gray-900"
      />
      {type === 'graph' && (
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
      <button
        className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))} // Max zoom level: 2
      >
        +
      </button>
      <button
        className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))} // Min zoom level: 0.5
      >
        −
      </button>
    </div>
  )}
      
      
    </div>
  );
};

export default Canvas;