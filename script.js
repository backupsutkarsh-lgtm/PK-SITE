// ==========================================
// FOR SOMEONE SPECIAL ✨
// CONFIG + ELEMENTS + GLOBALS
// ==========================================

const MAX_NO_CLICKS = 4; 
const MAX_BACKGROUND_QUOTES = 6;

const body = document.body;
const intro = document.getElementById("intro");
const card = document.getElementById("card");
const content = document.getElementById("content");
const stars = document.getElementById("stars");
const romanticBg = document.getElementById("romanticBg");
const shootingStars = document.getElementById("shootingStars");
const floatingHearts = document.getElementById("floatingHearts");
const heartExplosion = document.getElementById("heartExplosion");
const confetti = document.getElementById("confetti");
const popupContainer = document.getElementById("popupContainer");
const backgroundQuotes = document.getElementById("backgroundQuotes");
const touchGlow = document.getElementById("touchGlow");
const touchRippleContainer = document.getElementById("touchRippleContainer");

let noClicks = 0;
let storyIndex = 0;
let allowTap = false;
let shootingInterval = null;
let heartInterval = null;
let quoteInterval = null;
let activeQuotes = [];

// Story Flow
const story = [
    { title: "Hey PK 👋🏻", text: "" },
    { title: "", text: "I made something. 😅\nHopefully you'll find it more funny than weird. 😂" },
    { title: "", text: "Btw, please don't judge me after this. 😭😂" },
    { title: "", text: "You said what you did back then was cringe. 😂\nI guess it's my turn now. 😅" },
    { title: "", text: "So... here goes nothing. 🤞🏻" }
];

// Helper log function wrapper
function track(eventName, payload = {}) {
    if (window.tracker && window.tracker.logEvent) {
        window.tracker.logEvent(eventName, payload);
    }
}

// ==========================================
// FAST LOADER (1 SECOND) + INIT
// ==========================================

window.addEventListener("load", () => {
    createStars();
    setTimeout(() => {
        intro.style.opacity = "0";
        setTimeout(() => {
            intro.remove();
            body.classList.remove("loading");
            startStory();
        }, 400);
    }, 1000);
});

function createStars() {
    stars.innerHTML = "";
    for (let i = 0; i < 140; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = Math.random() * 2 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDelay = Math.random() * 5 + "s";
        stars.appendChild(star);
    }
    stars.style.opacity = 1;
}

document.addEventListener("pointerdown", (e) => {
    createRipple(e.clientX, e.clientY);
    createTouchGlow(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "touchRipple";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    touchRippleContainer.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 700);
}

function createTouchGlow(x, y) {
    touchGlow.style.left = x + "px";
    touchGlow.style.top = y + "px";
    touchGlow.classList.remove("animateGlow");
    void touchGlow.offsetWidth;
    touchGlow.classList.add("animateGlow");
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// STORY ENGINE
// ==========================================

function startStory() {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
    storyIndex = 0;
    track("Story started");
    showStory();
}

async function showStory() {
    allowTap = false;
    const page = story[storyIndex];

    content.innerHTML = `
        <div class="storyPage">
            ${page.title ? `<h1 id="storyTitle" class="fadeItem">${page.title}</h1>` : ""}
            ${page.text ? `<p id="storyText" class="fadeItem">${page.text.replace(/\n/g,"<br>")}</p>` : ""}
            <small id="tapHint" class="fadeItem">
                Tap anywhere to continue
            </small>
        </div>
    `;

    const items = document.querySelectorAll(".fadeItem");
    for (const item of items) {
        await wait(250);
        item.classList.add("show");
    }
    allowTap = true;
}

document.addEventListener("click", nextStory);
document.addEventListener("touchstart", nextStory);

async function nextStory(e) {
    if (!allowTap) return;
    if (e.target.tagName === "BUTTON") return;

    allowTap = false;
    const items = document.querySelectorAll(".fadeItem");
    items.forEach(item => item.classList.remove("show"));

    await wait(500);
    storyIndex++;

    if (storyIndex >= story.length) {
        track("Story completed");
        changeTheme();
        return;
    }
    showStory();
}

// ==========================================
// THEME + PROPOSAL
// ==========================================

async function changeTheme() {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    await wait(900);

    romanticBg.style.opacity = "1";
    body.classList.add("romantic");

    launchThemeStars();
    startFloatingMix();

    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
    showProposal();
}

function launchThemeStars() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => { createShootingStar(); }, i * 250);
    }
    if (shootingInterval) clearInterval(shootingInterval);
    shootingInterval = setInterval(() => { createShootingStar(); }, 3000);
}

function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shootingStar";
    star.style.left = (60 + Math.random() * 35) + "vw";
    star.style.top = (Math.random() * 35) + "vh";
    shootingStars.appendChild(star);
    setTimeout(() => { star.remove(); }, 1800);
}

function startFloatingMix() {
    if (heartInterval) clearInterval(heartInterval);
    
    heartInterval = setInterval(() => {
        const item = document.createElement("div");
        item.className = "floatingHeart";
        
        const elements = ["✨", "✨", "⭐", "💫", "❤️", "💖"];

        item.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = (16 + Math.random() * 14) + "px";
        item.style.animationDuration = (8 + Math.random() * 4) + "s";

        floatingHearts.appendChild(item);
        setTimeout(() => { item.remove(); }, 13000);
    }, 2500); 
}

function showProposal() {
    track("Proposal screen reached");
    content.innerHTML = `
        <div class="proposalScene">
            <div class="proposalStar hidden">✨</div>
            <p class="proposalIntro hidden">So... 🫣</p>
            <h1 class="proposalQuestion hidden">Would you like to go on a date with me?</h1>
            <div class="buttonGroup">
                <button id="yesBtn" class="hidden">YES! ✨</button>
                <button id="noBtn" class="hidden">NO 💫</button>
            </div>
        </div>
    `;
    animateProposal();
}

async function animateProposal() {
    const items = document.querySelectorAll(".hidden");
    for (const item of items) {
        await wait(350);
        item.classList.remove("hidden");
        item.classList.add("show");
    }
    document.getElementById("yesBtn").onclick = yesClicked;
    document.getElementById("noBtn").onclick = noClicked;
}

// ==========================================
// YES / NO + POPUPS
// ==========================================

async function yesClicked() {
    if (!window.tracker.firstClicked) {
        window.tracker.firstClicked = "YES";
    }

    track("YES button clicked", {
        firstButtonClicked: window.tracker.firstClicked,
        totalNoClicks: noClicks,
        finalResult: "YES"
    });

    stopBackgroundQuotes();
    explodeSparks(); 
    launchConfetti();

    const scene = document.querySelector(".proposalScene");
    scene.style.opacity = "0";
    scene.style.transform = "scale(.95)";
    await wait(1000);
    showFinalPage();
}

function noClicked() {
    noClicks++;
    if (!window.tracker.firstClicked) {
        window.tracker.firstClicked = "NO";
    }

    track("NO button clicked", {
        noClickCount: noClicks,
        firstButtonClicked: window.tracker.firstClicked
    });

    if (noClicks === 1) startBackgroundQuotes();

    if (noClicks >= MAX_NO_CLICKS) {
        track("Final result reached", {
            finalResult: "FINAL_NO",
            totalNoClicks: noClicks,
            firstButtonClicked: window.tracker.firstClicked
        });

        stopBackgroundQuotes();
        showFinalNoPopup("Okay then... worth a try. 😂😂<br>It's all good.<br>Thanks for checking this out. 😅👋🏻");
        document.getElementById("yesBtn").disabled = true;
        document.getElementById("noBtn").disabled = true;
        return;
    }

    const messages = [
        "Ek baar soch to lo, Madam Ji. 🥹",
        "Arre yaar... iss janam mein milna likha hi nahi hai kya? 😭😂",
        "Okay... bas ek aur baar soch lo. 🥹"
    ];

    const currentMessage = messages[noClicks - 1];
    const displayDuration = Math.max(2500, currentMessage.length * 70);

    showPopup(currentMessage, displayDuration);
}

function showPopup(text, duration = 2500) {
    popupContainer.innerHTML = "";
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = text;
    popupContainer.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translateY(20px)";
        setTimeout(() => { popup.remove(); }, 400);
    }, duration);
}

function showFinalNoPopup(text) {
    popupContainer.innerHTML = "";
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = text;
    popupContainer.appendChild(popup);
}

function startBackgroundQuotes() {
    if (quoteInterval) return;
    createBackgroundQuote();
    quoteInterval = setInterval(() => { createBackgroundQuote(); }, 900);
}

function stopBackgroundQuotes() {
    clearInterval(quoteInterval);
    quoteInterval = null;
    activeQuotes.forEach(q => q.remove());
    activeQuotes = [];
}

function createBackgroundQuote() {
    const emojis = ["💫", "😂", "✨", "🙃", "⭐", "👀"];
    const quote = document.createElement("div");
    quote.className = "backgroundQuote";
    quote.innerHTML = "Iss janam mein... " + emojis[Math.floor(Math.random() * emojis.length)];

    let left, top;
    do {
        left = 5 + Math.random()*85;
        top = 5 + Math.random()*85;
    } while(left > 25 && left < 75 && top > 20 && top < 75);

    quote.style.left = left + "%";
    quote.style.top = top + "%";
    backgroundQuotes.appendChild(quote);
    activeQuotes.push(quote);

    if (activeQuotes.length > MAX_BACKGROUND_QUOTES) {
        const old = activeQuotes.shift();
        old.remove();
    }
    setTimeout(() => {
        quote.remove();
        activeQuotes = activeQuotes.filter(q => q !== quote);
    }, 9000);
}

// ==========================================
// FINAL PAGE + EFFECTS
// ==========================================

async function showFinalPage(){
    track("Final page reached");

    content.innerHTML = `
    <div class="finalScene">
        <div class="finalHeart fadeItem">❤️</div>
        <h1 class="fadeItem">You have no idea how happy this just made me. 😭😂❤️</h1>
    </div>
    `;

    const items = document.querySelectorAll(".fadeItem");
    for(const item of items){
        await wait(700);
        item.classList.add("show");
    }

    explodeSparks();
    launchConfetti();
}

function explodeSparks(){
    const emojis = ["✨", "⭐", "💫", "❤️", "💖", "✨"];
    for(let i=0; i<70; i++){
        const spark = document.createElement("div");
        spark.className = "explodeHeart";
        spark.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

        const angle = Math.random()*Math.PI*2;
        const distance = 120 + Math.random()*300;

        spark.style.setProperty("--x", Math.cos(angle)*distance+"px");
        spark.style.setProperty("--y", Math.sin(angle)*distance+"px");
        heartExplosion.appendChild(spark);

        setTimeout(()=>{ spark.remove(); }, 2200);
    }
}

function launchConfetti(){
    confetti.innerHTML="";
    for(let i=0; i<100; i++){
        const piece = document.createElement("div");
        piece.className = "confettiPiece";
        piece.style.left = Math.random()*100+"vw";
        piece.style.animationDelay = Math.random()+"s";
        confetti.appendChild(piece);

        setTimeout(()=>{ piece.remove(); }, 5000);
    }
}

document.addEventListener("pointerdown", (e)=>{
    const button = e.target.closest("button");
    if(button){
        button.style.transform = "scale(.94)";
        setTimeout(()=>{ button.style.transform = ""; }, 150);
    }
});

window.addEventListener("beforeunload", ()=>{
    clearInterval(shootingInterval);
    clearInterval(heartInterval);
    clearInterval(quoteInterval);
});
