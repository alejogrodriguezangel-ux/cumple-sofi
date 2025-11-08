const pistas = [
  "Nació en el 2011 👶",
  "Mide 1.55 cm 📏",
  "Su comida favorita es la pasta 😋",
  "Es una persona muy linda, amable y carismática 💖",
  "¿Ya sabes quién es? 🤔",
  "Bueno, una pista más 😏",
  "Está cumpliendo años hoy 🎉",
  "¿Ahora sí sabes quién es? 😍",
];

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const pistaSection = document.getElementById("pista");
const textoPista = document.getElementById("textoPista");
const contador = document.getElementById("contador");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const final = document.getElementById("final");
const restartBtn = document.getElementById("restart");
const bgMusic = document.getElementById("bgMusic");

let index = 0;

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  pistaSection.style.display = "block";
  bgMusic.play().catch(() => {
    console.log("El navegador bloqueó la reproducción automática hasta que el usuario interactúe.");
  });
  mostrarPista();
});

nextBtn.addEventListener("click", () => {
  index++;
  if (index < pistas.length) {
    mostrarPista();
  } else {
    mostrarFinal();
  }
});

function mostrarPista() {
  textoPista.textContent = pistas[index];
  contador.textContent = `Pista ${index + 1} de ${pistas.length}`;
  progressBar.style.width = `${(index / pistas.length) * 100}%`;
  textoPista.classList.remove("fade");
  void textoPista.offsetWidth;
  textoPista.classList.add("fade");
}

function mostrarFinal() {
  pistaSection.style.display = "none";
  final.style.display = "block";
  lanzarConfeti();
}

restartBtn.addEventListener("click", () => {
  index = 0;
  final.style.display = "none";
  intro.style.display = "block";
  bgMusic.pause();
  bgMusic.currentTime = 0;
});

function lanzarConfeti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confettis = [];

  for (let i = 0; i < 120; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 1 + 1,
      color: `hsl(${Math.random() * 360},100%,70%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
  }

  function update() {
    confettis.forEach((c) => {
      c.y += c.d;
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }
  loop();
}
