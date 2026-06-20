"use strict";

class Polygon {
  static NAMES = Object.freeze({
    3: "Triangle", 4: "Square", 5: "Pentagon", 6: "Hexagon",
    7: "Heptagon", 8: "Octagon", 9: "Nonagon", 10: "Decagon",
    11: "Hendecagon", 12: "Dodecagon", 13: "Tridecagon",
    14: "Tetradecagon", 15: "Pentadecagon", 16: "Hexadecagon",
    17: "Heptadecagon", 18: "Octadecagon", 19: "Enneadecagon",
    20: "Icosagon",
  });

  constructor(sides, width, height, color) {
    this.sides = sides;
    this.width = width;
    this.height = height;
    this.color = color;
    Object.freeze(this);
  }

  get name() {
    return Polygon.NAMES[this.sides];
  }

  getNormalizedVertices() {
    const rotation =
      this.sides % 2 === 0
        ? -Math.PI / 2 + Math.PI / this.sides
        : -Math.PI / 2;
    const vertices = Array.from({ length: this.sides }, (_, index) => {
      const angle = rotation + (index * Math.PI * 2) / this.sides;
      return { x: Math.cos(angle), y: Math.sin(angle) };
    });
    const xs = vertices.map(({ x }) => x);
    const ys = vertices.map(({ y }) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return vertices.map(({ x, y }) => ({
      x: (x - minX) / (maxX - minX),
      y: (y - minY) / (maxY - minY),
    }));
  }

  getVertices2D() {
    return this.getNormalizedVertices().map(({ x, y }) => ({
      x: x * this.width,
      y: y * this.height,
    }));
  }

  get solidName() {
    return ShowcaseDieFactory.getName(this.sides);
  }

  getMesh3D() {
    return ShowcaseDieFactory.create(this.sides, this.width, this.height);
  }
}

class ShowcaseDieFactory {
  static DESIGNS = Object.freeze({
    3: { name: "Tetra Die", platonic: 3 },
    4: { name: "Cube Die", platonic: 4 },
    5: { name: "Dodeca Die", platonic: 5 },
    6: {
      name: "Hex Crystal",
      rings: [[0.72, 0.82, 0], [1, 0.32, 0], [0.88, -0.28, 0.5]],
      bottomPoint: -0.9,
    },
    7: {
      name: "Hepta Crown",
      rings: [[0.68, 0.9, 0], [1, 0.48, 0], [0.82, -0.12, 0.5], [0.94, -0.62, 0]],
      bottomCap: true,
    },
    8: {
      name: "Octa Lantern",
      rings: [[0.62, 0.94, 0], [0.92, 0.58, 0.5], [1, 0, 0], [0.92, -0.58, 0.5], [0.62, -0.94, 0]],
      bottomCap: true,
    },
    9: {
      name: "Nona Twist",
      rings: [[0.7, 0.9, 0], [1, 0.36, 0.5], [0.92, -0.32, 1], [0.64, -0.88, 1.5]],
      bottomCap: true,
    },
    10: {
      name: "Deca Barrel",
      rings: [[0.72, 0.9, 0], [0.96, 0.56, 0], [1, -0.38, 0.5], [0.68, -0.9, 0.5]],
      bottomCap: true,
    },
    11: {
      name: "Hendeca Comet",
      rings: [[0.66, 0.92, 0], [1, 0.38, 0.5], [0.82, -0.18, 1]],
      bottomPoint: -1,
    },
    12: {
      name: "Dodeca Reactor",
      rings: [[0.58, 0.94, 0], [0.9, 0.66, 0.5], [1, 0.12, 0], [0.88, -0.56, 0.5], [0.58, -0.94, 0]],
      bottomCap: true,
    },
    13: {
      name: "Trideca Vortex",
      rings: [[0.64, 0.92, 0], [0.92, 0.54, 0.5], [1, 0, 1], [0.86, -0.58, 1.5]],
      bottomPoint: -1,
    },
    14: {
      name: "Tetradeca Shield",
      rings: [[0.76, 0.9, 0], [1, 0.42, 0], [0.94, -0.18, 0.5], [0.72, -0.84, 0]],
      bottomCap: true,
    },
    15: {
      name: "Pentadeca Starcore",
      rings: [[0.56, 0.96, 0], [0.94, 0.64, 0.5], [1, 0, 0], [0.8, -0.48, 0.5]],
      bottomPoint: -0.96,
    },
    16: {
      name: "Hexadeca Halo",
      rings: [[0.68, 0.92, 0], [0.9, 0.7, 0.5], [1, 0.18, 0], [0.96, -0.38, 0.5], [0.66, -0.92, 0]],
      bottomCap: true,
    },
    17: {
      name: "Heptadeca Spire",
      rings: [[0.6, 0.96, 0], [1, 0.46, 0.5], [0.9, -0.12, 1]],
      bottomPoint: -1.08,
    },
    18: {
      name: "Octadeca Turbine",
      rings: [[0.62, 0.94, 0], [0.9, 0.62, 0.5], [1, 0.08, 1], [0.9, -0.54, 1.5], [0.6, -0.94, 2]],
      bottomCap: true,
    },
    19: {
      name: "Enneadeca Nova",
      rings: [[0.58, 0.96, 0], [0.94, 0.58, 0.5], [1, -0.02, 1], [0.76, -0.56, 1.5]],
      bottomPoint: -1.02,
    },
    20: {
      name: "Icosa Vault",
      rings: [[0.7, 0.94, 0], [0.94, 0.68, 0.5], [1, 0.12, 0], [0.92, -0.46, 0.5], [0.68, -0.94, 0]],
      bottomCap: true,
    },
  });

  static getName(sides) {
    return ShowcaseDieFactory.DESIGNS[sides].name;
  }

  static create(sides, width, height) {
    const design = ShowcaseDieFactory.DESIGNS[sides];
    if (design.platonic) {
      return PlatonicMeshFactory.create(design.platonic, width, height);
    }

    const radius = Math.min(width, height) * 0.42;
    const rotation =
      sides % 2 === 0 ? -Math.PI / 2 + Math.PI / sides : -Math.PI / 2;
    const rings = design.rings.map(([radiusScale, zScale, twist]) => ({
      radius: radius * radiusScale,
      z: radius * zScale,
      rotation: rotation + (twist * Math.PI) / sides,
    }));
    const vertices = rings.flatMap((ring) =>
      Array.from({ length: sides }, (_, index) => {
        const angle = ring.rotation + (index * Math.PI * 2) / sides;
        return {
          x: Math.cos(angle) * ring.radius,
          y: Math.sin(angle) * ring.radius,
          z: ring.z,
        };
      }),
    );
    const ring = (ringIndex) =>
      Array.from({ length: sides }, (_, index) => ringIndex * sides + index);
    const faces = [ring(0)];

    for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex += 1) {
      for (let index = 0; index < sides; index += 1) {
        const next = (index + 1) % sides;
        const currentStart = ringIndex * sides;
        const nextStart = (ringIndex + 1) * sides;
        faces.push([
          currentStart + index,
          currentStart + next,
          nextStart + next,
          nextStart + index,
        ]);
      }
    }

    const finalRing = ring(rings.length - 1);
    if (design.bottomCap) {
      faces.push([...finalRing].reverse());
    } else {
      const pointIndex = vertices.length;
      vertices.push({ x: 0, y: 0, z: radius * design.bottomPoint });
      for (let index = 0; index < sides; index += 1) {
        const next = (index + 1) % sides;
        faces.push([finalRing[index], finalRing[next], pointIndex]);
      }
    }

    return { vertices, faces };
  }
}

class PlatonicMeshFactory {
  static create(faceSides, width, height) {
    const phi = (1 + Math.sqrt(5)) / 2;
    const inversePhi = 1 / phi;
    const sourceVertices = {
      3: [
        { x: 1, y: 1, z: 1 },
        { x: -1, y: -1, z: 1 },
        { x: -1, y: 1, z: -1 },
        { x: 1, y: -1, z: -1 },
      ],
      4: [-1, 1].flatMap((x) =>
        [-1, 1].flatMap((y) => [-1, 1].map((z) => ({ x, y, z }))),
      ),
      5: [
        ...[-1, 1].flatMap((x) =>
          [-1, 1].flatMap((y) => [-1, 1].map((z) => ({ x, y, z }))),
        ),
        ...[-1, 1].flatMap((y) =>
          [-1, 1].map((z) => ({ x: 0, y: y * inversePhi, z: z * phi })),
        ),
        ...[-1, 1].flatMap((x) =>
          [-1, 1].map((y) => ({ x: x * inversePhi, y: y * phi, z: 0 })),
        ),
        ...[-1, 1].flatMap((x) =>
          [-1, 1].map((z) => ({ x: x * phi, y: 0, z: z * inversePhi })),
        ),
      ],
    }[faceSides];
    const radius = Math.min(width, height) * 0.42;
    const maxLength = Math.max(
      ...sourceVertices.map(({ x, y, z }) => Math.hypot(x, y, z)),
    );
    const vertices = sourceVertices.map(({ x, y, z }) => ({
      x: (x / maxLength) * radius,
      y: (y / maxLength) * radius,
      z: (z / maxLength) * radius,
    }));
    return {
      vertices,
      faces: PlatonicMeshFactory.findFaces(vertices, faceSides),
    };
  }

  static findFaces(vertices, expectedSides) {
    const tolerance = 1e-6;
    const faces = new Map();
    for (let a = 0; a < vertices.length - 2; a += 1) {
      for (let b = a + 1; b < vertices.length - 1; b += 1) {
        for (let c = b + 1; c < vertices.length; c += 1) {
          const normal = PlatonicMeshFactory.normal(
            vertices[a],
            vertices[b],
            vertices[c],
          );
          if (Math.hypot(normal.x, normal.y, normal.z) < tolerance) continue;
          const offset = PlatonicMeshFactory.dot(normal, vertices[a]);
          const distances = vertices.map(
            (vertex) => PlatonicMeshFactory.dot(normal, vertex) - offset,
          );
          if (
            !distances.every((distance) => distance <= tolerance) &&
            !distances.every((distance) => distance >= -tolerance)
          ) continue;
          const indices = distances
            .map((distance, index) =>
              Math.abs(distance) <= tolerance ? index : -1,
            )
            .filter((index) => index >= 0);
          if (indices.length !== expectedSides) continue;
          faces.set(
            [...indices].sort((first, second) => first - second).join(","),
            PlatonicMeshFactory.orderFace(indices, vertices),
          );
        }
      }
    }
    return [...faces.values()];
  }

  static orderFace(indices, vertices) {
    const center = indices.reduce(
      (sum, index) => ({
        x: sum.x + vertices[index].x / indices.length,
        y: sum.y + vertices[index].y / indices.length,
        z: sum.z + vertices[index].z / indices.length,
      }),
      { x: 0, y: 0, z: 0 },
    );
    let normal = PlatonicMeshFactory.normal(
      vertices[indices[0]],
      vertices[indices[1]],
      vertices[indices[2]],
    );
    if (PlatonicMeshFactory.dot(normal, center) < 0) {
      normal = { x: -normal.x, y: -normal.y, z: -normal.z };
    }
    normal = PlatonicMeshFactory.normalize(normal);
    const axis = PlatonicMeshFactory.normalize({
      x: vertices[indices[0]].x - center.x,
      y: vertices[indices[0]].y - center.y,
      z: vertices[indices[0]].z - center.z,
    });
    const perpendicular = PlatonicMeshFactory.cross(normal, axis);
    return [...indices].sort((first, second) => {
      const angle = (index) => {
        const direction = {
          x: vertices[index].x - center.x,
          y: vertices[index].y - center.y,
          z: vertices[index].z - center.z,
        };
        return Math.atan2(
          PlatonicMeshFactory.dot(direction, perpendicular),
          PlatonicMeshFactory.dot(direction, axis),
        );
      };
      return angle(first) - angle(second);
    });
  }

  static normal(a, b, c) {
    return PlatonicMeshFactory.cross(
      { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z },
      { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z },
    );
  }

  static cross(first, second) {
    return {
      x: first.y * second.z - first.z * second.y,
      y: first.z * second.x - first.x * second.z,
      z: first.x * second.y - first.y * second.x,
    };
  }

  static dot(first, second) {
    return first.x * second.x + first.y * second.y + first.z * second.z;
  }

  static normalize(vector) {
    const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
    return {
      x: vector.x / length,
      y: vector.y / length,
      z: vector.z / length,
    };
  }
}

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  prepareCanvas(polygon, backgroundColor) {
    this.canvas.width = polygon.width;
    this.canvas.height = polygon.height;
    this.context.clearRect(0, 0, polygon.width, polygon.height);
    if (backgroundColor) {
      this.context.fillStyle = backgroundColor;
      this.context.fillRect(0, 0, polygon.width, polygon.height);
    }
  }
}

class Polygon2DRenderer extends Renderer {
  render(polygon, options = {}) {
    this.prepareCanvas(polygon, options.backgroundColor);
    const vertices = polygon.getVertices2D();
    this.context.beginPath();
    this.context.moveTo(vertices[0].x, vertices[0].y);
    vertices.slice(1).forEach(({ x, y }) => this.context.lineTo(x, y));
    this.context.closePath();
    this.context.fillStyle = polygon.color;
    this.context.fill();
  }
}

class Polygon3DRenderer extends Renderer {
  static DEFAULT_ROTATION = Object.freeze({ x: -0.42, y: 0.55 });

  constructor(canvas) {
    super(canvas);
    this.rotation = { ...Polygon3DRenderer.DEFAULT_ROTATION };
  }

  resetRotation() {
    this.rotation = { ...Polygon3DRenderer.DEFAULT_ROTATION };
  }

  rotate(deltaX, deltaY) {
    this.rotation.y += deltaX;
    this.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, this.rotation.x + deltaY),
    );
  }

  render(polygon, options = {}) {
    this.prepareCanvas(polygon, options.backgroundColor);
    const mesh = polygon.getMesh3D();
    const transformed = mesh.vertices.map((vertex) => this.transform(vertex));
    const projected = this.projectAndFit(transformed, polygon);

    this.createFaces(mesh.faces, projected, transformed, polygon)
      .sort((faceA, faceB) => faceA.depth - faceB.depth)
      .forEach((face) => this.drawFace(face));
  }

  transform(vertex) {
    const cosY = Math.cos(this.rotation.y);
    const sinY = Math.sin(this.rotation.y);
    const xAfterY = vertex.x * cosY + vertex.z * sinY;
    const zAfterY = -vertex.x * sinY + vertex.z * cosY;
    const cosX = Math.cos(this.rotation.x);
    const sinX = Math.sin(this.rotation.x);
    return {
      x: xAfterY,
      y: vertex.y * cosX - zAfterY * sinX,
      z: vertex.y * sinX + zAfterY * cosX,
    };
  }

  projectAndFit(vertices, polygon) {
    const cameraDistance = Math.max(polygon.width, polygon.height) * 3.2;
    const projected = vertices.map((vertex) => {
      const perspective = cameraDistance / (cameraDistance - vertex.z);
      return {
        x: vertex.x * perspective,
        y: vertex.y * perspective,
        z: vertex.z,
      };
    });
    const xs = projected.map(({ x }) => x);
    const ys = projected.map(({ y }) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const padding = Math.max(1, Math.min(polygon.width, polygon.height) * 0.1);
    const scale = Math.min(
      (polygon.width - padding * 2) / (maxX - minX),
      (polygon.height - padding * 2) / (maxY - minY),
    );
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return projected.map((vertex) => ({
      x: (vertex.x - centerX) * scale + polygon.width / 2,
      y: (vertex.y - centerY) * scale + polygon.height / 2,
      z: vertex.z,
    }));
  }

  createFaces(faceIndices, projected, transformed, polygon) {
    const averageDepth = (vertices) =>
      vertices.reduce((sum, vertex) => sum + vertex.z, 0) / vertices.length;
    return faceIndices.map((indices) => {
      const transformedFace = indices.map((index) => transformed[index]);
      const normal = this.calculateNormal(transformedFace);
      const light = Math.max(
        0,
        normal.x * -0.35 + normal.y * -0.55 + normal.z * 0.76,
      );
      return {
        points: indices.map((index) => projected[index]),
        depth: averageDepth(transformedFace),
        color: Color.adjust(polygon.color, -0.38 + light * 0.46),
      };
    });
  }

  calculateNormal([a, b, c]) {
    const first = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const second = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const normal = {
      x: first.y * second.z - first.z * second.y,
      y: first.z * second.x - first.x * second.z,
      z: first.x * second.y - first.y * second.x,
    };
    const length = Math.hypot(normal.x, normal.y, normal.z) || 1;
    return {
      x: normal.x / length,
      y: normal.y / length,
      z: normal.z / length,
    };
  }

  drawFace(face) {
    this.context.beginPath();
    this.context.moveTo(face.points[0].x, face.points[0].y);
    face.points.slice(1).forEach(({ x, y }) => this.context.lineTo(x, y));
    this.context.closePath();
    this.context.fillStyle = face.color;
    this.context.fill();
    this.context.strokeStyle = "rgba(255, 255, 255, 0.13)";
    this.context.lineWidth = Math.max(1, this.canvas.width / 900);
    this.context.stroke();
  }
}

class Color {
  static adjust(hex, amount) {
    const value = Number.parseInt(hex.slice(1), 16);
    const channels = [
      (value >> 16) & 255,
      (value >> 8) & 255,
      value & 255,
    ].map((channel) =>
      Math.round(
        amount >= 0
          ? channel + (255 - channel) * amount
          : channel * (1 + amount),
      ),
    );
    return `rgb(${channels[0]}, ${channels[1]}, ${channels[2]})`;
  }
}

class PolygonValidator {
  static MIN_SIDES = 3;
  static MAX_SIDES = 20;
  static MIN_DIMENSION = 16;
  static MAX_DIMENSION = 4096;
  static HEX_PATTERN = /^#[0-9A-F]{6}$/i;

  validateSides(value) {
    const sides = Number(value);
    const valid =
      Number.isInteger(sides) &&
      sides >= PolygonValidator.MIN_SIDES &&
      sides <= PolygonValidator.MAX_SIDES;
    return { valid, value: valid ? sides : undefined };
  }

  validateDimension(value, label) {
    if (value.trim() === "") {
      return { valid: false, message: `${label} is required.` };
    }
    const number = Number(value);
    if (!Number.isInteger(number)) {
      return { valid: false, message: `${label} must be a whole number.` };
    }
    if (
      number < PolygonValidator.MIN_DIMENSION ||
      number > PolygonValidator.MAX_DIMENSION
    ) {
      return {
        valid: false,
        message:
          `Use ${PolygonValidator.MIN_DIMENSION}-` +
          `${PolygonValidator.MAX_DIMENSION} px.`,
      };
    }
    return { valid: true, value: number, message: "" };
  }

  validateColor(value) {
    const normalized = value.trim().toUpperCase();
    if (!PolygonValidator.HEX_PATTERN.test(normalized)) {
      return {
        valid: false,
        message: "Enter a six-digit hex code, such as #7C5CFC.",
      };
    }
    return { valid: true, value: normalized, message: "" };
  }
}

class ImageExporter {
  export(renderer, polygon, format, mode) {
    const isJpeg = format === "jpeg";
    renderer.render(polygon, {
      backgroundColor: isJpeg ? "#FFFFFF" : null,
    });
    const extension = isJpeg ? "jpg" : "png";
    renderer.canvas.toBlob(
      (blob) => {
        if (!blob) throw new Error("The image could not be generated.");
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          `${polygon.name.toLowerCase()}-${mode}-` +
          `${polygon.width}x${polygon.height}.${extension}`;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        if (isJpeg) renderer.render(polygon);
      },
      isJpeg ? "image/jpeg" : "image/png",
      isJpeg ? 0.95 : undefined,
    );
  }
}

class ViewerController {
  constructor(canvas, renderer, onChange) {
    this.canvas = canvas;
    this.renderer = renderer;
    this.onChange = onChange;
    this.enabled = false;
    this.dragging = false;
    this.lastPointer = { x: 0, y: 0 };
  }

  initialize() {
    this.canvas.addEventListener("pointerdown", (event) => {
      if (!this.enabled) return;
      this.dragging = true;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.canvas.setPointerCapture(event.pointerId);
    });
    this.canvas.addEventListener("pointermove", (event) => {
      if (!this.enabled || !this.dragging) return;
      const deltaX = (event.clientX - this.lastPointer.x) * 0.012;
      const deltaY = (event.clientY - this.lastPointer.y) * 0.012;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.renderer.rotate(deltaX, deltaY);
      this.onChange();
    });
    const stopDragging = () => {
      this.dragging = false;
    };
    this.canvas.addEventListener("pointerup", stopDragging);
    this.canvas.addEventListener("pointercancel", stopDragging);
    this.canvas.addEventListener("keydown", (event) => {
      if (!this.enabled || !event.key.startsWith("Arrow")) return;
      event.preventDefault();
      const step = event.shiftKey ? 0.2 : 0.08;
      const rotations = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };
      this.renderer.rotate(...rotations[event.key]);
      this.onChange();
    });
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.canvas.classList.toggle("is-interactive", enabled);
  }
}

class PolygonGeneratorApp {
  constructor(documentRoot) {
    this.elements = {
      mode: documentRoot.querySelector("#mode-toggle"),
      mode2DLabel: documentRoot.querySelector("#mode-2d-label"),
      mode3DLabel: documentRoot.querySelector("#mode-3d-label"),
      sides: documentRoot.querySelector("#sides"),
      width: documentRoot.querySelector("#width"),
      height: documentRoot.querySelector("#height"),
      color: documentRoot.querySelector("#color"),
      colorSwatch: documentRoot.querySelector("#color-swatch"),
      previewSize: documentRoot.querySelector("#preview-size"),
      canvas: documentRoot.querySelector("#preview-canvas"),
      viewerHint: documentRoot.querySelector("#viewer-hint"),
      resetView: documentRoot.querySelector("#reset-view"),
      exportPng: documentRoot.querySelector("#export-png"),
      exportJpg: documentRoot.querySelector("#export-jpg"),
    };
    this.validator = new PolygonValidator();
    this.renderers = {
      "2d": new Polygon2DRenderer(this.elements.canvas),
      "3d": new Polygon3DRenderer(this.elements.canvas),
    };
    this.exporter = new ImageExporter();
    this.currentPolygon = null;
    this.viewer = new ViewerController(
      this.elements.canvas,
      this.renderers["3d"],
      () => this.renderCurrent(),
    );
  }

  get mode() {
    return this.elements.mode.checked ? "3d" : "2d";
  }

  get activeRenderer() {
    return this.renderers[this.mode];
  }

  initialize() {
    [
      this.elements.sides,
      this.elements.width,
      this.elements.height,
      this.elements.color,
    ].forEach((input) => {
      input.addEventListener("input", () => this.refresh());
      input.addEventListener("blur", () => this.refresh());
    });
    this.elements.mode.addEventListener("change", () => {
      this.updateModeInterface();
      this.refresh();
    });
    this.elements.color.addEventListener("blur", () => {
      const result = this.validator.validateColor(this.elements.color.value);
      if (result.valid) this.elements.color.value = result.value;
    });
    this.elements.resetView.addEventListener("click", () => {
      this.renderers["3d"].resetRotation();
      this.renderCurrent();
      this.elements.canvas.focus();
    });
    this.elements.exportPng.addEventListener("click", () => this.export("png"));
    this.elements.exportJpg.addEventListener("click", () => this.export("jpeg"));
    this.viewer.initialize();
    this.updateModeInterface();
    this.refresh();
  }

  updateModeInterface() {
    const is3D = this.mode === "3d";
    this.elements.mode2DLabel.classList.toggle("is-active", !is3D);
    this.elements.mode3DLabel.classList.toggle("is-active", is3D);
    this.elements.viewerHint.hidden = !is3D;
    this.elements.resetView.hidden = !is3D;
    this.viewer.setEnabled(is3D);
  }

  refresh() {
    const result = this.readAndValidateInputs();
    if (!result.valid) return;
    this.currentPolygon = new Polygon(
      result.sides,
      result.width,
      result.height,
      result.color,
    );
    this.renderCurrent();
    this.elements.previewSize.textContent =
      `${this.mode === "3d" ? this.currentPolygon.solidName : this.currentPolygon.name} - ` +
      `${this.mode.toUpperCase()} - ` +
      `${result.width.toLocaleString()} x ${result.height.toLocaleString()} px`;
    if (this.mode === "3d") {
      this.elements.viewerHint.textContent =
        `${this.currentPolygon.solidName} - ${this.currentPolygon.name} showcase face`;
    }
    this.elements.canvas.setAttribute(
      "aria-label",
      `${this.mode === "3d" ? this.currentPolygon.solidName : this.currentPolygon.name} ` +
        `${this.mode.toUpperCase()} preview` +
        (this.mode === "3d" ? ". Drag or use arrow keys to rotate." : ""),
    );
    this.elements.colorSwatch.style.backgroundColor = result.color;
    document.documentElement.style.setProperty("--accent", result.color);
  }

  renderCurrent() {
    if (this.currentPolygon) this.activeRenderer.render(this.currentPolygon);
  }

  readAndValidateInputs() {
    const sides = this.validator.validateSides(this.elements.sides.value);
    const width = this.validator.validateDimension(
      this.elements.width.value,
      "Width",
    );
    const height = this.validator.validateDimension(
      this.elements.height.value,
      "Height",
    );
    const color = this.validator.validateColor(this.elements.color.value);
    this.showValidationState(this.elements.width, width);
    this.showValidationState(this.elements.height, height);
    this.showValidationState(this.elements.color, color);
    return {
      valid: sides.valid && width.valid && height.valid && color.valid,
      sides: sides.value,
      width: width.value,
      height: height.value,
      color: color.value,
    };
  }

  showValidationState(input, result) {
    const container = input.closest(".input-with-unit, .color-input");
    const errorElement = document.querySelector(`#${input.id}-error`);
    container.classList.toggle("has-error", !result.valid);
    input.setAttribute("aria-invalid", String(!result.valid));
    errorElement.textContent = result.message;
  }

  export(format) {
    const result = this.readAndValidateInputs();
    if (!result.valid) return;
    this.currentPolygon = new Polygon(
      result.sides,
      result.width,
      result.height,
      result.color,
    );
    this.exporter.export(
      this.activeRenderer,
      this.currentPolygon,
      format,
      this.mode,
    );
  }
}

new PolygonGeneratorApp(document).initialize();
