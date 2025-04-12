import React, { useState } from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const InputArea: React.FC = () => {
  const [input, setInput] = useState('');
  const { type, algorithm, setInput: setStoreInput } = useAlgorithmStore();
  let processedInput: any[] | { array: number[]; target: number } = [];
  const processInput = () => {
    if (!type || !algorithm) {
      alert('Please select an algorithm first');
      return;
    }
  
    try {
      let processedInput: any[] | { array: number[]; target: number } = [];
      
      switch (type) {
        case 'sorting': {
          processedInput = input
            .split(/[,\s]+/)
            .map(num => {
              const parsed = parseInt(num.trim(), 10);
              if (isNaN(parsed)) throw new Error('Invalid number');
              return parsed;
            })
            .filter(num => !isNaN(num));
  
          if (processedInput.length < 2) {
            throw new Error('Please enter at least 2 numbers');
          }
          break;
        }
  
        case 'searching': {
          const [arrayInput, targetInput] = input.split('|').map(part => part.trim());
        
          // Parse the array
          const array = arrayInput
            .split(/[,\s]+/)
            .map(num => {
              const parsed = parseInt(num.trim(), 10);
              if (isNaN(parsed)) throw new Error('Invalid number in array');
              return parsed;
            })
            .filter(num => !isNaN(num));
        
          if (array.length < 2) {
            throw new Error('Please enter at least 2 numbers in the array');
          }
        
          // Parse the target value
          const target = parseInt(targetInput, 10);
          if (isNaN(target)) {
            throw new Error('Invalid target value');
          }
        
          // Sort the array for Binary Search
          processedInput = { array: array.sort((a, b) => a - b), target };
          break;
        }
        
  
        case 'pathfinding': {
          // Split the input into rows and trim whitespace
          processedInput = input
            .split('\n')
            .map(line => line.trim().split(''))
            .filter(line => line.length > 0);
        
          // Validate that the grid is rectangular
          const isRectangular = processedInput.every(
            row => Array.isArray(processedInput) && row.length === processedInput[0].length
          );
          if (!isRectangular) {
            throw new Error('The grid must be rectangular (all rows must have the same length).');
          }
        
          // Validate that the grid contains exactly one 'S' and one 'G'
          const flatGrid = processedInput.flat();
          const startCount = flatGrid.filter(cell => cell === 'S').length;
          const goalCount = flatGrid.filter(cell => cell === 'G').length;
        
          if (startCount !== 1 || goalCount !== 1) {
            throw new Error(
              'The grid must contain exactly one Start point (S) and one Goal point (G).'
            );
          }
        
          // Validate that the grid contains only valid characters
          const validCharacters = new Set(['S', 'G', '#', '.']);
          const hasInvalidCharacters = flatGrid.some(cell => !validCharacters.has(cell));
          if (hasInvalidCharacters) {
            throw new Error(
              'The grid contains invalid characters. Use only S, G, #, and .'
            );
          }
        
          break;
        }
  
        case 'tree': {
          processedInput = input
            .split(/[,\s]+/)
            .map(num => {
              const parsed = parseInt(num.trim(), 10);
              if (isNaN(parsed)) throw new Error('Invalid number');
              return parsed;
            })
            .filter(num => !isNaN(num));
          
          if (processedInput.length === 0) {
            throw new Error('Please enter at least one node');
          }
          break;
        }
  
        case 'graph': {
          processedInput = input
            .split('\n')
            .map(line => {
              const [from, to, weight] = line.trim().split(/[,\s]+/);
              return {
                from: parseInt(from),
                to: parseInt(to),
                weight: parseInt(weight) || 1
              };
            });
          break;
        }
  
        case 'linear': {
          processedInput = input
            .split(/[,\s]+/)
            .map(item => item.trim())
            .filter(item => item.length > 0);
          break;
        }
      }
  
      setStoreInput(Array.isArray(processedInput) ? processedInput : [processedInput]);
      generateVisualization(Array.isArray(processedInput) ? processedInput : [processedInput], algorithm, type);
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Invalid input format');
    }
  };
  const getPlaceholder = () => {
    if (!type) return 'Select an algorithm first';
    
    switch (type) {
      case 'sorting':
        return 'Enter numbers separated by commas or spaces (e.g., 64, 34, 25, 12, 22, 11, 90)';
        case 'searching':
          return 'Enter array and target separated by | (e.g., 10, 20, 30, 40, 50 | 30)';
      case 'pathfinding':
        return 'Enter grid using S(start), G(goal), #(wall), .(path)\nExample:\nS.#..\n.#...\n..#.G';
      case 'tree':
        return 'Enter numbers for tree nodes (e.g., 5, 3, 7, 1, 4, 6, 8)';
      case 'graph':
        return 'Enter edges as: fromNode, toNode, weight\nExample:\n1, 2, 4\n2, 3, 2\n1, 3, 5';
      case 'linear':
        return 'Enter values separated by commas (e.g., A, B, C, D)';
      default:
        return 'Select an algorithm first';
    }
  };

  const generateVisualization = (data: any[], algorithm: string, type: string) => {
    let visualData: any[] = [];
    let pseudocode: string[] = [];

    switch (algorithm) {
      case 'Bubble Sort': {
        const arr = [...data];
        pseudocode = [
          'for i from 0 to n-1',
          '  for j from 0 to n-i-1',
          '    if arr[j] > arr[j+1]',
          '      swap arr[j] and arr[j+1]'
        ];
        
        visualData.push({ array: [...arr], comparing: [], swapping: [] });
        
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            visualData.push({ array: [...arr], comparing: [j, j + 1], swapping: [] });
            
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              visualData.push({ array: [...arr], comparing: [], swapping: [j, j + 1] });
            }
          }
        }
        break;
      }

      case 'Quick Sort': {
        const arr = [...data];
        pseudocode = [
          'function quickSort(arr, low, high)',
          '  if low < high',
          '    pivot = partition(arr, low, high)',
          '    quickSort(arr, low, pivot - 1)',
          '    quickSort(arr, pivot + 1, high)'
        ];

        const quickSort = (arr: number[], low: number, high: number) => {
          if (low < high) {
            const pivot = partition(arr, low, high);
            quickSort(arr, low, pivot - 1);
            quickSort(arr, pivot + 1, high);
          }
        };

        const partition = (arr: number[], low: number, high: number) => {
          const pivot = arr[high];
          let i = low - 1;

          for (let j = low; j < high; j++) {
            visualData.push({ array: [...arr], comparing: [j, high], swapping: [] });
            
            if (arr[j] <= pivot) {
              i++;
              [arr[i], arr[j]] = [arr[j], arr[i]];
              visualData.push({ array: [...arr], comparing: [], swapping: [i, j] });
            }
          }

          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          visualData.push({ array: [...arr], comparing: [], swapping: [i + 1, high] });
          
          return i + 1;
        };

        visualData.push({ array: [...arr], comparing: [], swapping: [] });
        quickSort(arr, 0, arr.length - 1);
        break;
      }

      case 'Merge Sort': {
        const arr = [...data];
        pseudocode = [
          'function mergeSort(arr)',
          '  if length of arr <= 1',
          '    return arr',
          '  mid = length of arr / 2',
          '  left = mergeSort(arr[0...mid])',
          '  right = mergeSort(arr[mid...end])',
          '  return merge(left, right)'
        ];

        const merge = (left: number[], right: number[]) => {
          const result: number[] = [];
          let i = 0, j = 0;

          while (i < left.length && j < right.length) {
            visualData.push({ 
              array: [...result, ...left.slice(i), ...right.slice(j)],
              comparing: [i, left.length + j],
              swapping: []
            });

            if (left[i] <= right[j]) {
              result.push(left[i]);
              i++;
            } else {
              result.push(right[j]);
              j++;
            }
          }

          return [...result, ...left.slice(i), ...right.slice(j)];
        };

        const mergeSort = (arr: number[]): number[] => {
          if (arr.length <= 1) return arr;

          const mid = Math.floor(arr.length / 2);
          const left = mergeSort(arr.slice(0, mid));
          const right = mergeSort(arr.slice(mid));

          return merge(left, right);
        };

        visualData.push({ array: [...arr], comparing: [], swapping: [] });
        mergeSort(arr);
        break;
      }
      case 'Linear Search': {
        const { array, target } = data[0]; // Extract array and target from input
        pseudocode = [
          'for i from 0 to n-1',
          '  if arr[i] == target',
          '    return i',
          'return -1'
        ];
      
        for (let i = 0; i < array.length; i++) {
          visualData.push({
            array: [...array],
            current: i,
            target,
            found: array[i] === target
          });
      
          if (array[i] === target) {
            break; // Stop visualization once the target is found
          }
        }
      
        break;
      }

      case 'Binary Search': {
        const { array, target } = data[0]; // Extract array and target from input
        pseudocode = [
          'low = 0, high = n-1',
          'while low <= high:',
          '  mid = (low + high) / 2',
          '  if arr[mid] == target:',
          '    return mid',
          '  else if arr[mid] < target:',
          '    low = mid + 1',
          '  else:',
          '    high = mid - 1',
          'return -1'
        ];
      
        let low = 0;
        let high = array.length - 1;
      
        while (low <= high) {
          const mid = Math.floor((low + high) / 2);
      
          visualData.push({
            array: [...array],
            low,
            high,
            mid,
            target,
            found: array[mid] === target
          });
      
          if (array[mid] === target) {
            break; // Stop visualization once the target is found
          } else if (array[mid] < target) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
      
        break;
      }
      

      case "Dijkstra's Algorithm": {
        const grid = data;
        let start: [number, number] = [0, 0];
        let goal: [number, number] = [0, 0];
      
        // Find start and goal positions
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'S') start = [i, j];
            if (grid[i][j] === 'G') goal = [i, j];
          }
        }
      
        pseudocode = [
          'Initialize distances to Infinity',
          'Set distance to start = 0',
          'While unvisited nodes exist:',
          '  Select node with minimum distance',
          '  Mark node as visited',
          '  Update distances to neighbors',
          '  If goal is reached, stop'
        ];
      
        // Initialize distances and visited set
        const distances: number[][] = grid.map(row => row.map(() => Infinity));
        const visited: boolean[][] = grid.map(row => row.map(() => false));
        const previous: ([number, number] | null)[][] = grid.map(row =>
          row.map(() => null)
        );
      
        distances[start[0]][start[1]] = 0;
      
        const directions = [
          [0, 1], // Right
          [1, 0], // Down
          [0, -1], // Left
          [-1, 0] // Up
        ];
      
        const priorityQueue: [number, number, number][] = [[...start, 0]]; // [x, y, distance]
      
        while (priorityQueue.length > 0) {
          // Sort the queue by distance and pick the node with the smallest distance
          priorityQueue.sort((a, b) => a[2] - b[2]);
          const [x, y, dist] = priorityQueue.shift()!;
      
          // Skip if already visited
          if (visited[x][y]) continue;
          visited[x][y] = true;
      
          // Store the current state for visualization
            visualData.push({
            grid: grid.map((row: string[], i: number) =>
              row.map((cell: string, j: number) => {
              if (i === x && j === y) return 'C'; // Current node
              if (visited[i][j]) return 'V'; // Visited node
              return cell;
              })
            ),
            visited: visited.map((row: boolean[]) => [...row]),
            current: [x, y] as [number, number],
            path: [] as [number, number][] // Path will be reconstructed later
            });
      
          // If the goal is reached, reconstruct the path
          if (x === goal[0] && y === goal[1]) {
            let path: [number, number][] = [];
            let current: [number, number] | null = goal;
      
            while (current) {
              path.push(current);
              current = previous[current[0]][current[1]];
            }
      
            path.reverse();
      
            visualData.push({
              grid: grid.map((row, i) =>
                row.map((cell: any, j: number) => {
                  if (path.some(([px, py]) => px === i && py === j)) return 'P'; // Path node
                  if (i === start[0] && j === start[1]) return 'S'; // Start node
                  if (i === goal[0] && j === goal[1]) return 'G'; // Goal node
                  return cell;
                })
              ),
              visited: visited.map(row => [...row]),
              current: goal,
              path
            });
      
            break;
          }
      
          // Explore neighbors
          for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
      
            // Check bounds and if the cell is walkable
            if (
              nx >= 0 &&
              ny >= 0 &&
              nx < grid.length &&
              ny < grid[0].length &&
              grid[nx][ny] !== '#' &&
              !visited[nx][ny]
            ) {
              const newDist = dist + 1; // Assume uniform cost for simplicity
              if (newDist < distances[nx][ny]) {
                distances[nx][ny] = newDist;
                previous[nx][ny] = [x, y];
                priorityQueue.push([nx, ny, newDist]);
              }
            }
          }
        }
      
        break;
      }

      case 'A* Algorithm': {
        // Similar to Dijkstra's but with heuristic
        pseudocode = [
          'Initialize open and closed sets',
          'Add start node to open set',
          'While open set is not empty:',
          '  current = node with lowest f_score',
          '  if current is goal, return path',
          '  Add neighbors to open set'
        ];
        break;
      }

      case 'DFS': {
        const values = [...data];
        pseudocode = [
          'function DFS(node)',
          '  if node is null',
          '    return',
          '  visit node',
          '  DFS(node.left)',
          '  DFS(node.right)'
        ];

        // Create binary tree from array
        class TreeNode {
          value: number;
          left: TreeNode | null;
          right: TreeNode | null;
          constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
          }
        }

        const buildTree = (values: number[], index: number = 0): TreeNode | null => {
          if (index >= values.length) return null;
          const node = new TreeNode(values[index]);
          node.left = buildTree(values, 2 * index + 1);
          node.right = buildTree(values, 2 * index + 2);
          return node;
        };

        const root = buildTree(values);
        const dfs = (node: TreeNode | null, visited: number[] = []) => {
          if (!node) return;
          visited.push(node.value);
          visualData.push({ tree: values, visited: [...visited], current: node.value });
          dfs(node.left, visited);
          dfs(node.right, visited);
        };

        dfs(root);
        break;
      }

      case 'BFS': {
        const values = [...data];
        pseudocode = [
          'function BFS(root)',
          '  if root is null',
          '    return',
          '  queue = [root]',
          '  while queue is not empty',
          '    node = queue.shift()',
          '    visit node',
          '    add node.left to queue',
          '    add node.right to queue'
        ];

        class TreeNode {
          value: number;
          left: TreeNode | null;
          right: TreeNode | null;
          constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
          }
        }

        const buildTree = (values: number[], index: number = 0): TreeNode | null => {
          if (index >= values.length) return null;
          const node = new TreeNode(values[index]);
          node.left = buildTree(values, 2 * index + 1);
          node.right = buildTree(values, 2 * index + 2);
          return node;
        };

        const root = buildTree(values);
        const bfs = (root: TreeNode | null) => {
          if (!root) return;
          const queue: TreeNode[] = [root];
          const visited: number[] = [];

          while (queue.length > 0) {
            const node = queue.shift()!;
            visited.push(node.value);
            visualData.push({ tree: values, visited: [...visited], current: node.value });

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
          }
        };

        bfs(root);
        break;
      }

      case 'Inorder Traversal': {
        const values = [...data];
        pseudocode = [
          'function inorder(node)',
          '  if node is null',
          '    return',
          '  inorder(node.left)',
          '  visit node',
          '  inorder(node.right)'
        ];

        class TreeNode {
          value: number;
          left: TreeNode | null;
          right: TreeNode | null;
          constructor(value: number) {
            this.value = value;
            this.left = null;
            this.right = null;
          }
        }

        const buildTree = (values: number[], index: number = 0): TreeNode | null => {
          if (index >= values.length) return null;
          const node = new TreeNode(values[index]);
          node.left = buildTree(values, 2 * index + 1);
          node.right = buildTree(values, 2 * index + 2);
          return node;
        };

        const root = buildTree(values);
        const inorder = (node: TreeNode | null, visited: number[] = []) => {
          if (!node) return;
          inorder(node.left, visited);
          visited.push(node.value);
          visualData.push({ tree: values, visited: [...visited], current: node.value });
          inorder(node.right, visited);
        };

        inorder(root);
        break;
      }

      case "Kruskal's Algorithm": {
        pseudocode = [
          'Sort edges by weight',
          'Initialize disjoint sets',
          'For each edge (u,v):',
          '  if u and v are in different sets:',
          '    add edge to MST',
          '    union sets of u and v'
        ];

        const edges = [...data];
        // Implementation would go here
        break;
      }

      case "Prim's Algorithm": {
        pseudocode = [
          'Start with vertex 0',
          'While MST is not complete:',
          '  Find minimum weight edge',
          '  Add edge if it doesn\'t create cycle',
          '  Update minimum edges for new vertex'
        ];

        const edges = [...data];
        // Implementation would go here
        break;
      }

      case 'Stack Operations': {
        const operations = [...data];
        pseudocode = [
          'Stack operations:',
          'push(item): add to top',
          'pop(): remove from top',
          'peek(): view top item'
        ];

        let stack: string[] = [];
        operations.forEach(op => {
          visualData.push({ stack: [...stack], current: op, operation: 'push' });
          stack.push(op);
        });
        break;
      }

      case 'Queue Operations': {
        const operations = [...data];
        pseudocode = [
          'Queue operations:',
          'enqueue(item): add to back',
          'dequeue(): remove from front',
          'peek(): view front item'
        ];

        let queue: string[] = [];
        operations.forEach(op => {
          visualData.push({ queue: [...queue], current: op, operation: 'enqueue' });
          queue.push(op);
        });
        break;
      }
    }

    useAlgorithmStore.setState({
      visualData,
      pseudocode,
      currentStep: 0,
      totalSteps: visualData.length - 1
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Input Area</h2>
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={getPlaceholder()}
        />
        <button
          onClick={processInput}
          disabled={!type || !algorithm}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Process Input
        </button>
      </div>
    </div>
  );
};

export default InputArea;