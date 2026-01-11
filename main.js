/** * UI Animations 
 */
gsap.from("h1", { duration: 1.2, y: -100, opacity: 0, ease: "bounce.out" });

// function to swap categories
function updateTable(cat) {
    const body = document.getElementById('vocab-body');
    body.innerHTML = "";

    allData[cat].forEach(i => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${i.en}</strong></td><td>${i.de}</td>`;
        body.appendChild(row);
    });

    gsap.from("#vocab-body tr", {
        duration: 0.4,
        opacity: 0,
        scale: 0.9,
        y: 15,
        stagger: 0.02,
        ease: "power2.out" // changed from the 'back' ease which is very 'AI-style'
    });
}

/** * 3D Scene Setup 
 */
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

function createLayer(path, z) {
    const tex = loader.load(path);
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 70),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true })
    );
    mesh.position.z = z;

    const s = (camera.position.z - z) / camera.position.z;
    mesh.scale.set(s, s, 1);
    scene.add(mesh);
    return mesh;
}

// init layers from json
fetch('./words.json')
    .then(res => res.json())
    .then(data => {
        const p = data.languages.german;
        const sky = createLayer(p.skyLayer, -40);
        const trees = createLayer(p.midLayer, -20);
        const house = createLayer(p.topLayer, 0);

        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            // parallax move
            gsap.to(sky.position, { x: x * 5, y: -y * 2, duration: 1 });
            gsap.to(trees.position, { x: x * 12, y: -y * 4, duration: 1 });
            gsap.to(house.position, { x: x * 25, y: -y * 8, duration: 1 });
        });
    });

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// --- DATA AT BOTTOM TO STAY OUT OF THE WAY ---
const allData = {
    verbs: [
        {en: "to be", de: "sein"}, {en: "have", de: "haben"}, {en: "become", de: "werden"},
        {en: "can", de: "können"}, {en: "must", de: "müssen"}, {en: "say", de: "sagen"},
        {en: "to go", de: "gehen"}, {en: "to make", de: "machen"}, {en: "give", de: "geben"},
        {en: "come", de: "kommen"}, {en: "want", de: "wollen"}, {en: "know", de: "wissen"},
        {en: "see", de: "sehen"}, {en: "let", de: "lassen"}, {en: "stand", de: "stehen"},
        {en: "find", de: "finden"}, {en: "stay", de: "bleiben"}, {en: "lie", de: "liegen"},
        {en: "think", de: "denken"}, {en: "take", de: "nehmen"}, {en: "do", de: "tun"},
        {en: "believe", de: "glauben"}, {en: "hold", de: "halten"}, {en: "call", de: "nennen"},
        {en: "show", de: "zeigen"}
    ],
    nouns: [
        {en: "Time", de: "Zeit"}, {en: "Year", de: "Jahr"}, {en: "Person", de: "Mensch"},
        {en: "Day", de: "Tag"}, {en: "World", de: "Welt"}, {en: "Man", de: "Mann"},
        {en: "Woman", de: "Frau"}, {en: "Child", de: "Kind"}, {en: "Hand", de: "Hand"},
        {en: "Part", de: "Teil"}, {en: "Problem", de: "Problem"}, {en: "Life", de: "Leben"},
        {en: "Eye", de: "Auge"}, {en: "Place", de: "Ort"}, {en: "Case", de: "Fall"},
        {en: "Work", de: "Arbeit"}, {en: "Right", de: "Recht"}, {en: "Point", de: "Punkt"},
        {en: "House", de: "Haus"}, {en: "Side", de: "Seite"}, {en: "Father", de: "Vater"},
        {en: "Mother", de: "Mutter"}, {en: "City", de: "Stadt"}, {en: "Water", de: "Wasser"},
        {en: "Head", de: "Kopf"}
    ],
    pronouns: [
        {en: "I", de: "ich"}, {en: "you", de: "du"}, {en: "he", de: "er"}, {en: "she", de: "sie"},
        {en: "it", de: "es"}, {en: "we", de: "wir"}, {en: "you (plural)", de: "ihr"},
        {en: "they", de: "sie"}, {en: "me", de: "mich"}, {en: "to me", de: "mir"},
        {en: "my", de: "mein"}, {en: "your", de: "dein"}, {en: "who", de: "wer"},
        {en: "what", de: "was"}, {en: "this", de: "dieser"}
    ],
    adjectives: [
        {en: "good", de: "gut"}, {en: "big", de: "groß"}, {en: "new", de: "neu"},
        {en: "old", de: "alt"}, {en: "small", de: "klein"}, {en: "beautiful", de: "schön"},
        {en: "all", de: "all"}, {en: "whole", de: "ganz"}, {en: "first", de: "erst"},
        {en: "long", de: "lang"}, {en: "high", de: "hoch"}, {en: "simple", de: "einfach"},
        {en: "last", de: "letzt"}, {en: "equal", de: "gleich"}, {en: "possible", de: "möglich"},
        {en: "own", de: "eigen"}, {en: "late", de: "spät"}, {en: "important", de: "wichtig"},
        {en: "other", de: "ander"}, {en: "ready", de: "fertig"}, {en: "strong", de: "stark"},
        {en: "right", de: "richtig"}, {en: "young", de: "jung"}, {en: "fast", de: "schnell"},
        {en: "true", de: "wahr"}, {en: "hot", de: "heiß"}, {en: "cold", de: "kalt"},
        {en: "heavy", de: "schwer"}, {en: "light", de: "leicht"}, {en: "happy", de: "glücklich"},
        {en: "sad", de: "traurig"}, {en: "expensive", de: "teuer"}, {en: "cheap", de: "billig"}
    ],
    prepositions: [
        {en: "in", de: "in"}, {en: "with", de: "mit"}, {en: "for", de: "für"},
        {en: "from", de: "von"}, {en: "to", de: "zu"}, {en: "on", de: "auf"}
    ]
};