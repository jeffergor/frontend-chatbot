var vertices = [
    // Cara delantera
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
  
    // Cara trasera
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
  
    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
  
    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
  
    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
  
    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ];
  var colors = [
    [1.0, 1.0, 1.0, 1.0], // Cara delantera: blanco
    [1.0, 0.0, 0.0, 1.0], // Cara trasera: rojo
    [0.0, 1.0, 0.0, 1.0], // Cara superior: verde
    [0.0, 0.0, 1.0, 1.0], // Cara inferior: azul
    [1.0, 1.0, 0.0, 1.0], // Cara derecha: amarillo
    [1.0, 0.0, 1.0, 1.0], // Cara izquierda: morado
  ];
  
  var generatedColors = [];
  
  for (j = 0; j < 6; j++) {
    var c = colors[j];
  
    for (var i = 0; i < 4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }
  
  var cubeVerticesColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(generatedColors),
    gl.STATIC_DRAW,
  );
  var cubeVerticesIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  
  // Este arrelgo define cada cara como 2 triángulos utilizando
  // los índices dentro de cada arreglo de vértices
  // para especificar cada posición en los tríangulos.
  
  var cubeVertexIndices = [
    0,
    1,
    2,
    0,
    2,
    3, // enfrente
    4,
    5,
    6,
    4,
    6,
    7, // atrás
    8,
    9,
    10,
    8,
    10,
    11, // arriba
    12,
    13,
    14,
    12,
    14,
    15, // fondo
    16,
    17,
    18,
    16,
    18,
    19, // derecha
    20,
    21,
    22,
    20,
    22,
    23, // izquierda
  ];
  
  // Ahora enviamos el elemento arreglo a  GL
  
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(cubeVertexIndices),
    gl.STATIC_DRAW,
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        