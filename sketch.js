let trees = []; // Array para armazenar as árvores plantadas
let treeCount = 0; // Contador de árvores plantadas
let level = 1; // Nível inicial
let backgroundColor; // Cor do fundo (muda conforme o nível)
let treeTypes = []; // Armazenará os tipos de árvores para os diferentes níveis

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(0, 0, 255); // Cor inicial do fundo (azul)
  treeTypes = [drawTreeType1, drawTreeType2, drawTreeType3, drawTreeType4]; // Funções para desenhar as árvores de diferentes níveis
}

function draw() {
  // Calcula a cor do fundo conforme o nível (de azul para roxo)
  let lerpValue = map(level, 1, 30, 0, 1); // Gradualmente de 0 (azul) para 1 (roxo)
  backgroundColor = lerpColor(color(0, 0, 255), color(128, 0, 128), lerpValue);
  background(backgroundColor);

  // Desenha todas as árvores
  for (let tree of trees) {
    tree.display();
  }

  // Texto mostrando quantas árvores plantou e o nível
  fill(0);
  textSize(32);
  textAlign(RIGHT, TOP);
  text(`Árvores plantadas: ${treeCount}`, width - 20, 20);
  text(`Nível: ${level}`, width - 20, 60);
}

function keyPressed() {
  if (keyCode === ENTER) {
    // Ao apertar Enter, planta uma árvore
    plantTree();
  }
}

function plantTree() {
  let x = random(width);
  let y = random(height);
  let tree = new Tree(x, y);

  trees.push(tree);
  treeCount++;

  // A cada 6 árvores plantadas, sobe de nível e muda o tipo da árvore
  if (treeCount % 6 === 0 && level < 30) {
    level++;
  }
}

// Função para desenhar as árvores conforme o nível
function drawTreeType1(x, y) {
  fill(0, 255, 0); // Folhagem verde
  ellipse(x, y - 20, 50, 50); // Folhagem (circular)

  fill(139, 69, 19); // Tronco marrom
  rect(x - 10, y, 20, 40); // Tronco reto
}

function drawTreeType2(x, y) {
  fill(34, 139, 34); // Folhagem mais escura
  triangle(x - 25, y - 20, x + 25, y - 20, x, y - 60); // Folhagem triangular

  fill(139, 69, 19); // Tronco marrom
  rect(x - 10, y, 20, 50); // Tronco reto
}

function drawTreeType3(x, y) {
  fill(60, 179, 113); // Folhagem verde claro
  ellipse(x, y - 30, 60, 60); // Folhagem maior

  fill(139, 69, 19); // Tronco marrom
  rect(x - 12, y, 24, 50); // Tronco reto
}

function drawTreeType4(x, y) {
  fill(0, 128, 0); // Folhagem escura
  beginShape();
  vertex(x - 20, y - 10);
  vertex(x + 20, y - 10);
  vertex(x, y - 50);
  endShape(CLOSE); // Folhagem de forma irregular

  fill(139, 69, 19); // Tronco marrom
  rect(x - 8, y, 16, 60); // Tronco reto e mais alto
}

// Classe que representa uma árvore
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    // Chama a função de acordo com o nível para desenhar a árvore
    treeTypes[(level - 1) % treeTypes.length](this.x, this.y);
  }
}
