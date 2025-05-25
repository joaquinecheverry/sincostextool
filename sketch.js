// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js
/*exported setup draw */

let inputText = ''; 
let canvas; 
let xPatternValue = 72; 
let yPatternValue = 32;
let speedSlider;
const defaultText = "This tool is a part of a project called Abstract Systems by Joaquin Echeverry Braver. The project explores the difference between abstraction and designed abstraction, the functionality of design and objectiveness of it as a communication medium";
let animationSpeed = 0.1; // Animation speed control
let animationOffset = 0; // Animation offset

function setup() {
  // Get the container dimensions 
  const container = document.getElementById('pattern-container'); 
  const containerWidth = container.offsetWidth; 
  const containerHeight = container.offsetHeight;
  
  // Create canvas with container dimensions 
  canvas = createCanvas(containerWidth, containerHeight); 
  canvas.parent('pattern-container');
  
  textSize(16); 
  frameRate(30);
  
  // Set default text
  const input = document.getElementById('textInput');
  input.value = defaultText;
  inputText = defaultText;
  
  // Text input event listener 
  input.addEventListener('input', () => { 
    inputText = input.value; 
  });
  
  // Pattern value inputs 
  const xInput = document.getElementById('xPatternValue'); 
  const yInput = document.getElementById('yPatternValue');
  speedSlider = document.getElementById('speedSlider');


  xInput.addEventListener('input', () => { 
    // Parse as float to allow decimal values 
    xPatternValue = parseFloat(xInput.value) || 72; // Default to 72 if invalid 
  });
  
  yInput.addEventListener('input', () => { 
    // Parse as float to allow decimal values 
    yPatternValue = parseFloat(yInput.value) || 32; // Default to 32 if invalid 
  });
  
  // Resizable panel implementation 
  const resizeHandle = document.getElementById('resize-handle'); 
  const leftPanel = document.getElementById('left');
  
  let isResizing = false;
  
  resizeHandle.addEventListener('mousedown', (e) => { 
    isResizing = true; 
    document.addEventListener('mousemove', handleMouseMove); 
    document.addEventListener('mouseup', () => { 
      isResizing = false; 
      document.removeEventListener('mousemove', handleMouseMove); 
    }); 
  });
  
  function handleMouseMove(e) { 
    if (!isResizing) return;
    
    const newWidth = e.clientX; 
    // Set minimum width to prevent panel from disappearing 
    if (newWidth >= 250 && newWidth <= window.innerWidth - 200) { 
      leftPanel.style.width = `${newWidth}px`; 
      resizeCanvas(container.offsetWidth, container.offsetHeight); 
    } 
  }
  
  // Handle window resize 
  window.addEventListener('resize', windowResized);
  
  // Start animation loop
  loop();
}

function windowResized() { 
  const container = document.getElementById('pattern-container'); 
  resizeCanvas(container.offsetWidth, container.offsetHeight); 
}

function draw() { 
  background(255); 
  fill(0); 
  noStroke();

  if (!inputText) return;

  const count = inputText.length;
  const userSpeed = parseFloat(speedSlider.value);

  animationOffset += userSpeed; // No modulo here

  for (let i = 0; i < count; i++) { 
    const position = i + animationOffset;

    const x = width / 2 + cos(position * xPatternValue * PI / count) * (width * 0.38); 
    const y = height / 2 + sin(position * yPatternValue * PI / count) * (height * 0.47);

    text(inputText[i % count], x, y); 
  } 
}


