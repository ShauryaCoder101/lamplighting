const container = document.getElementById('lanternsContainer');
const lanternCount = 12;
const lanterns = [];
const hindiNames = ['Aasha', 'Shanti', 'Prem', 'Roshni', 'Khushi', 'Aanand', 'Satya', 'Karuna'];

function createLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');

    // Randomize properties for depth and variety
    const size = (Math.random() * (120 - 40) + 40) * 1.5;
    const opacity = Math.random() * (1 - 0.6) + 0.6;
    
    // Determine depth class
    if (size < 90) {
        lantern.classList.add('far');
        lantern.style.setProperty('--z-index', '1');
    } else if (size > 135) {
        lantern.classList.add('near');
        lantern.style.setProperty('--z-index', '10');
    } else {
        lantern.style.setProperty('--z-index', '5');
    }

    lantern.style.width = `${size}px`;
    lantern.style.height = `${size * 1.4}px`;
    lantern.style.opacity = opacity;
    
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('lantern-name');
    nameDiv.innerText = hindiNames[Math.floor(Math.random() * hindiNames.length)];
    lantern.appendChild(nameDiv);

    container.appendChild(lantern);

    return {
        element: lantern,
        size: size,
        width: size,
        height: size * 1.4,
        x: 0,
        y: 0,
        vx: 0,
        vy: -(Math.random() * 1.5 + 0.8), // Upward velocity
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: (Math.random() * 0.02 + 0.01),
        swayAmount: (Math.random() * 0.8 + 0.3),
        zone: 'left'
    };
}

function resetLantern(l) {
    l.y = window.innerHeight + 50 + Math.random() * 200;
    
    // Choose zone: 0-30% or 70-100%
    const zoneWidth = window.innerWidth * 0.25; // 25% on each side
    if (l.zone === 'left') {
        l.x = Math.random() * (zoneWidth - l.width);
    } else {
        l.x = window.innerWidth - zoneWidth + Math.random() * (zoneWidth - l.width);
    }
    
    l.x = Math.max(0, Math.min(window.innerWidth - l.width, l.x));
    l.vx = 0;
}

// Initialization
for (let i = 0; i < lanternCount; i++) {
    const l = createLantern();
    // Randomize initial Y so they aren't all at the bottom
    l.y = Math.random() * window.innerHeight;
    l.zone = i % 2 === 0 ? 'left' : 'right'; // Alternate sides
    
    const zoneWidth = window.innerWidth * 0.25;
    if (l.zone === 'left') {
        l.x = Math.random() * (zoneWidth - l.width);
    } else {
        l.x = window.innerWidth - zoneWidth + Math.random() * (zoneWidth - l.width);
    }
    
    l.x = Math.max(0, Math.min(window.innerWidth - l.width, l.x));
    lanterns.push(l);
}

// Mouse interaction state
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

// Animation Loop
function animate() {
    // Parallax container
    container.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Movement and swaying
    lanterns.forEach(l => {
        l.swayPhase += l.swaySpeed;
        l.x += Math.sin(l.swayPhase) * l.swayAmount;
        l.y += l.vy;
        
        // Apply repulsion velocity
        l.x += l.vx;
        
        // Friction
        l.vx *= 0.9;
        
        // Keep within zones softly
        const zoneWidth = window.innerWidth * 0.28;
        if (l.zone === 'left') {
            if (l.x > zoneWidth - l.width) l.vx -= 0.2;
            if (l.x < 0) l.vx += 0.2;
        } else {
            if (l.x < window.innerWidth - zoneWidth) l.vx += 0.2;
            if (l.x > window.innerWidth - l.width) l.vx -= 0.2;
        }

        // Reset if moved off top
        if (l.y < -l.height - 50) {
            resetLantern(l);
        }
    });

    // Collision detection and "ruffling" response
    for (let i = 0; i < lanterns.length; i++) {
        for (let j = i + 1; j < lanterns.length; j++) {
            const l1 = lanterns[i];
            const l2 = lanterns[j];
            
            const c1x = l1.x + l1.width/2;
            const c1y = l1.y + l1.height/2;
            const c2x = l2.x + l2.width/2;
            const c2y = l2.y + l2.height/2;
            
            const dx = c2x - c1x;
            const dy = c2y - c1y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Collision radius based on width with extra padding to prevent touching
            const minDist = (l1.width + l2.width) / 2 * 1.2; 
            
            if (dist < minDist && dist > 0) {
                // Strong Repulsion effect
                const force = (minDist - dist) / minDist;
                const fx = (dx / dist) * force * 4.0; // Stronger horizontal push
                
                l1.vx -= fx;
                l2.vx += fx;
                
                // Stronger vertical push
                if (dy > 0) {
                    l1.y -= force * 2.5;
                    l2.y += force * 2.5;
                } else {
                    l1.y += force * 2.5;
                    l2.y -= force * 2.5;
                }
            }
        }
    }

    // Render
    lanterns.forEach(l => {
        l.element.style.transform = `translate3d(${l.x}px, ${l.y}px, 0)`;
    });

    requestAnimationFrame(animate);
}

animate();
