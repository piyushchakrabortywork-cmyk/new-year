// 2026 Chaos Orchestrator

const state = {
    phase: 'boot', // boot, entry, execution, arrival, wishes, final
    scrollProgress: 0,
    chaosLevel: 0,
};

const dom = {
    cursorDot: document.getElementById('cursor-dot'),
    cursorOutline: document.getElementById('cursor-outline'),
    bootSection: document.getElementById('boot-sequence'),
    bootText: document.getElementById('boot-text'),
    introText: document.getElementById('intro-text'),
    entrySection: document.getElementById('entry-void'),
    executionSection: document.getElementById('year-execution'),
    year2025: document.getElementById('year-2025'),
    arrivalSection: document.getElementById('arrival-2026'),
    year2026: document.getElementById('year-2026'),
    wishesContainer: document.getElementById('wishes-container'),
    finalSection: document.getElementById('final-takeover'),
    body: document.body,
};

// --- CURSOR LOGIC ---
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let outlineX = mouseX;
let outlineY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // "Weapon" feel - Heavy drag on outline, instant on dot
    const dt = 0.2; // Lerp factor

    cursorX += (mouseX - cursorX) * 1;
    cursorY += (mouseY - cursorY) * 1;

    outlineX += (mouseX - outlineX) * 0.15; // Slow lag
    outlineY += (mouseY - outlineY) * 0.15;

    dom.cursorDot.style.left = `${cursorX}px`;
    dom.cursorDot.style.top = `${cursorY}px`;

    dom.cursorOutline.style.left = `${outlineX}px`;
    dom.cursorOutline.style.top = `${outlineY}px`;

    // Dynamic cursor distortion based on movement speed
    const dist = Math.hypot(mouseX - outlineX, mouseY - outlineY);
    const scale = 1 + dist / 300;

    dom.cursorOutline.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${dist}deg)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();


// --- BOOT SEQUENCE ---
const bootLines = [
    "INITIALIZING 2026.EXE...",
    "ACCESSING CORE SYSTEMS...",
    "BYPASSING SECURITY PROTOCOLS...",
    "PURGING 2025 CACHE...",
    "OVERRIDE ACCEPTED.",
    "WELCOME."
];

async function runBootSequence() {
    for (const line of bootLines) {
        const p = document.createElement('div');
        dom.bootText.appendChild(p);

        // Typewriter effect
        for (let i = 0; i < line.length; i++) {
            p.textContent += line[i];
            await wait(20 + Math.random() * 30);
        }
        await wait(150);
    }

    await wait(500);

    // Hard Cut
    dom.body.style.backgroundColor = 'black';
    dom.bootSection.style.display = 'none';

    // Flash
    await wait(200);
    dom.body.style.backgroundColor = 'white';
    await wait(50);
    dom.body.style.backgroundColor = 'var(--void)';

    // Start Entry
    runEntrySequence();
}

// --- PHASE 1: CHAOS IGNITION (AFTER BOOT) ---
const messages = [
    { text: "READY?", delay: 800 },
    { text: "NO TURNING BACK.", delay: 1500 },
    { text: "2026.", delay: 2200 }
];

async function runEntrySequence() {
    state.phase = 'entry';
    dom.entrySection.classList.remove('hidden');

    // 1. Flicker Background
    dom.body.style.backgroundColor = 'white';
    setTimeout(() => dom.body.style.backgroundColor = 'var(--void)', 50);
    setTimeout(() => dom.body.style.backgroundColor = 'white', 100);
    setTimeout(() => dom.body.style.backgroundColor = 'var(--void)', 150);

    // 2. Play Sequence
    for (const msg of messages) {
        dom.introText.innerText = msg.text;
        dom.introText.style.opacity = 1;

        // Random glitch position
        dom.introText.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;

        await wait(200); // Show for a bit
        dom.introText.style.opacity = 0; // Hide
        dom.introText.innerText = '';

        await wait(msg.delay - 200); // Wait for next
    }

    // 3. Silence
    dom.entrySection.classList.add('hidden');
    await wait(500);

    // 4. Start Phase 2
    startExecutionPhase();
}

function startExecutionPhase() {
    state.phase = 'execution';
    dom.executionSection.classList.remove('hidden');
    // Enable scroll listener for Phase 2
    window.addEventListener('wheel', handleScrollDestruction);
    window.addEventListener('click', handleScrollDestruction); // Also click to destroy

    // Touch Support
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
}

let lastTouchY = 0;
function handleTouchStart(e) {
    lastTouchY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    if (state.phase === 'execution') {
        const currentY = e.touches[0].clientY;
        const delta = Math.abs(lastTouchY - currentY);

        // Emulate scroll destruction
        if (delta > 2) {
            destroy2025(delta > 10 ? 3 : 1);
        }
        lastTouchY = currentY;
    } else if (state.phase === 'wishes' || state.phase === 'arrival') {
        const currentY = e.touches[0].clientY;
        const delta = Math.abs(lastTouchY - currentY);
        scrollVelocity += delta * 0.1;
        lastTouchY = currentY;
    }
}


// --- UTILS ---
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- INIT ---
window.onload = () => {
    runBootSequence();
}

// --- PHASE 2: EXECUTION (2025 DESTRUCTION) ---
let destructionLevel = 0;
const DESTRUCTION_THRESHOLD = 50; // Scrolls/clicks needed

function handleScrollDestruction(e) {
    if (state.phase !== 'execution') return;

    // Normalize delta
    const delta = e.type === 'click' ? 100 : Math.abs(e.deltaY || 100);
    const increment = delta > 50 ? 5 : 2;

    destroy2025(increment);
}

function destroy2025(amount) {
    destructionLevel += amount;

    // Visual Feedback based on level
    const intensity = destructionLevel / DESTRUCTION_THRESHOLD;

    // 1. Shake Text with RGB Split
    const shakeX = (Math.random() - 0.5) * 50 * intensity;
    const shakeY = (Math.random() - 0.5) * 50 * intensity;
    const rotate = (Math.random() - 0.5) * 20 * intensity;

    dom.year2025.style.transform = `translate(${shakeX}px, ${shakeY}px) rotate(${rotate}deg)`;

    // RGB Split intensity
    if (intensity > 0.5) {
        dom.year2025.style.textShadow = `${intensity * 10}px 0 red, -${intensity * 10}px 0 blue`;
    } else {
        dom.year2025.style.textShadow = '';
    }

    dom.year2025.style.color = Math.random() > 0.8 ? 'red' : 'white'; // Flash red

    // 2. Glitch Clips
    const clip1 = `rect(${Math.random() * 100}px, 9999px, ${Math.random() * 100}px, 0)`;
    dom.year2025.style.clipPath = Math.random() > 0.5 ? clip1 : '';

    // 3. Melt at high intensity
    if (intensity > 0.8 && !dom.year2025.classList.contains('melting')) {
        dom.year2025.style.filter = 'blur(2px) contrast(200%)';
    }

    // 4. Check Threshold
    if (destructionLevel >= DESTRUCTION_THRESHOLD) {
        triggerExplosion();
    }
}

async function triggerExplosion() {
    state.phase = 'arrival_transition';
    window.removeEventListener('wheel', handleScrollDestruction);
    window.removeEventListener('click', handleScrollDestruction);

    // Create debris
    const rect = dom.year2025.getBoundingClientRect();
    for (let i = 0; i < 30; i++) {
        createDebris(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // Hide 2025
    dom.year2025.style.display = 'none';
    dom.executionSection.style.backgroundColor = 'white'; // Flash

    await wait(50);
    dom.executionSection.style.backgroundColor = 'var(--void)';

    await wait(200);
    dom.executionSection.classList.add('hidden');

    startArrivalPhase();
}

function createDebris(x, y) {
    const el = document.createElement('div');
    el.classList.add('debris');
    const size = Math.random() * 20 + 5;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.backgroundColor = Math.random() > 0.5 ? 'white' : 'red';

    // Physics
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 10 + 5;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    document.body.appendChild(el);

    let life = 100;
    function update() {
        if (life <= 0) {
            el.remove();
            return;
        }
        life -= 2;
        const currentLeft = parseFloat(el.style.left);
        const currentTop = parseFloat(el.style.top);
        el.style.left = `${currentLeft + dx}px`;
        el.style.top = `${currentTop + dy}px`;
        el.style.opacity = life / 100;
        el.style.transform = `rotate(${life * 10}deg)`;
        requestAnimationFrame(update);
    }
    update();
}


// --- PHASE 3: ARRIVAL (2026 SLAM) ---
async function startArrivalPhase() {
    state.phase = 'arrival';
    dom.arrivalSection.classList.remove('hidden');

    // Wait a brief moment for suspense
    await wait(100);

    // SLAM
    dom.year2026.classList.add('slam-active');
    dom.year2026.style.opacity = 1;
    dom.year2026.style.transform = 'scale(1)';

    // Screen Shake
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 500);

    // Flash Background
    dom.arrivalSection.style.backgroundColor = 'var(--accent)';
    setTimeout(() => dom.arrivalSection.style.backgroundColor = 'var(--void)', 100);

    // Initial scale is handled by CSS class animation, but we set explicit final state
    await wait(1000);

    startWishesPhase();
}

function startWishesPhase() {
    state.phase = 'wishes';
    // Wishes logic needs to be implemented next
    console.log("Starting Wishes Phase...");
    startRandomWishes();
}

function startRandomWishes() {
    const wishes = [
        "NO MORE EXCUSES", "LOCK IN", "OUTWORK EVERYONE", "SLEEP LESS",
        "BUILD MORE", "2026 DOESN'T WAIT", "PURE FOCUS", "DESTROY LIMITS",
        "BE UNSTOPPABLE", "CHAOS IS ENERGY", "WAKE UP"
    ];

    let count = 0;
    const maxWishes = 25;

    // Enable Scroll Weapon for this phase
    window.addEventListener('wheel', handleScrollWeapon);
    // Note: Touch events are globally added in startExecutionPhase and check state.phase

    const interval = setInterval(async () => {
        if (state.phase !== 'wishes') {
            clearInterval(interval);
            return;
        }

        if (count >= maxWishes) {
            clearInterval(interval);
            endWishesPhase();
            return;
        }

        const text = wishes[Math.floor(Math.random() * wishes.length)];
        createWishPopup(text);

        // Random bg flash
        if (Math.random() > 0.7) {
            dom.body.style.filter = 'invert(1)';
            setTimeout(() => dom.body.style.filter = 'invert(0)', 50);
        }

        count++;
    }, 400); // Fast!
}

function createWishPopup(text) {
    const el = document.createElement('div');
    el.classList.add('wish-popup');
    el.innerText = text;

    // Random Position (avoid completely off screen)
    const x = Math.random() * (window.innerWidth - 300);
    const y = Math.random() * (window.innerHeight - 100);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Random Animation Style via transform
    const rot = (Math.random() - 0.5) * 40;
    const scale = 0.5 + Math.random();
    el.style.transform = `rotate(${rot}deg) scale(${scale})`;

    // Random Color Accent
    if (Math.random() > 0.5) {
        el.style.borderColor = 'white';
        el.style.color = 'white';
    }

    dom.wishesContainer.appendChild(el);

    // Remove after short time
    setTimeout(() => {
        el.style.opacity = 0;
        setTimeout(() => el.remove(), 200);
    }, 1500);
}

// --- SCROLL WEAPON ---
let scrollVelocity = 0;
function handleScrollWeapon(e) {
    scrollVelocity += Math.abs(e.deltaY) * 0.05;
}

// Continuously decay velocity and apply effect
function updateScrollPhysics() {
    if (state.phase === 'wishes' || state.phase === 'arrival') {
        scrollVelocity *= 0.9; // Decay

        if (scrollVelocity > 0.1) {
            const skew = Math.min(scrollVelocity * 0.5, 20); // Cap skew
            const scale = 1 + Math.min(scrollVelocity * 0.005, 0.2);

            // Apply to the active section container (Arrival/Wishes)
            dom.arrivalSection.style.transform = `perspective(1000px) skewX(${skew}deg) scale(${scale})`;

            // Also color shift
            if (scrollVelocity > 50) {
                dom.year2026.style.textShadow = `0 0 ${scrollVelocity}px red`;
            }
        } else {
            dom.arrivalSection.style.transform = `perspective(1000px) skewX(0deg) scale(1)`;
        }
    }
    requestAnimationFrame(updateScrollPhysics);
}
updateScrollPhysics();

async function endWishesPhase() {
    state.phase = 'final_transition';

    // Clear all wishes
    dom.wishesContainer.innerHTML = '';

    await wait(500);

    // Transition to Final
    dom.arrivalSection.classList.add('hidden');
    dom.finalSection.classList.remove('hidden');

    startFinalPhase();
}

function startFinalPhase() {
    state.phase = 'final';
    dom.finalSection.classList.remove('hidden');

    // Logic for final button interaction
    const btn = document.getElementById('enter-btn');

    // Magnetic Pull on Button
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Stronger pull
        btn.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.1)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });

    btn.addEventListener('click', () => {
        // Violent feedback
        document.body.style.filter = 'invert(1) contrast(200%)';
        document.body.style.transform = 'scale(1.1) rotate(2deg)';

        setTimeout(() => {
            location.reload();
        }, 150);
    });
}

