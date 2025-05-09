let inputText = ''; 
let canvas; 
let xPatternValue = 72; 
let yPatternValue = 32;
const defaultText = "This tool is a part of a project called Abstract Systems by Joaquin Echeverry Braver. The project explores the difference between abstraction and designed abstraction, the functionality of design and objectiveness of it as a communication medium";

function setup() {
  // Get the container dimensions 
  const container = document.getElementById('pattern-container'); 
  const containerWidth = container.offsetWidth; 
  const containerHeight = container.offsetHeight;
  
  // Create canvas with container dimensions 
  canvas = createCanvas(containerWidth, containerHeight); 
  canvas.parent('pattern-container');
  
  textFont('sans-serif'); 
  textSize(16); 
  noLoop();
  
  // Set default text
  const input = document.getElementById('textInput');
  input.value = defaultText;
  inputText = defaultText;
  
  // Text input event listener 
  input.addEventListener('input', () => { 
    inputText = input.value; 
    redraw(); 
  });
  
  // Pattern value inputs 
  const xInput = document.getElementById('xPatternValue'); 
  const yInput = document.getElementById('yPatternValue');
  
  xInput.addEventListener('input', () => { 
    // Parse as float to allow decimal values 
    xPatternValue = parseFloat(xInput.value) || 72; // Default to 72 if invalid 
    redraw(); 
  });
  
  yInput.addEventListener('input', () => { 
    // Parse as float to allow decimal values 
    yPatternValue = parseFloat(yInput.value) || 32; // Default to 32 if invalid 
    redraw(); 
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
      redraw(); 
    } 
  }
  
  // Handle window resize 
  window.addEventListener('resize', windowResized);
  
  // Draw the initial pattern with default text
  redraw();
}

function windowResized() { 
  const container = document.getElementById('pattern-container'); 
  resizeCanvas(container.offsetWidth, container.offsetHeight); 
  redraw(); 
}

function draw() { 
  background(255); 
  fill(0); 
  noStroke();

  if (!inputText) return;

  let count = inputText.length; 
  for (let i = 0; i < count; i++) { 
    // Use the dynamic pattern values 
    const x = width/2 + cos(i * xPatternValue * PI / count) * (width * 0.38); 
    const y = height/2 + sin(i * yPatternValue * PI / count) * (height * 0.47);

    text(inputText[i], x, y); 
  } 
}
