"use strict";

/**
 * Immutable value object representing a six-sided polygon.
 */
class Hexagon {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    Object.freeze(this);
  }

  /**
   * Returns vertices for a flat-top hexagon stretched to exact dimensions.
   * @returns {{ x: number, y: number }[]}
   */
  getVertices() {
    const quarterWidth = this.width / 4;
    const halfHeight = this.height / 2;

    return [
      { x: quarterWidth, y: 0 },
      { x: quarterWidth * 3, y: 0 },
      { x: this.width, y: halfHeight },
      { x: quarterWidth * 3, y: this.height },
      { x: quarterWidth, y: this.height },
      { x: 0, y: halfHeight },
    ];
  }
}

/**
 * Owns all canvas drawing behavior.
 */
class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }

  render(hexagon, options = {}) {
    const { backgroundColor = null } = options;
    this.canvas.width = hexagon.width;
    this.canvas.height = hexagon.height;
    this.context.clearRect(0, 0, hexagon.width, hexagon.height);

    if (backgroundColor) {
      this.context.fillStyle = backgroundColor;
      this.context.fillRect(0, 0, hexagon.width, hexagon.height);
    }

    const vertices = hexagon.getVertices();
    this.context.beginPath();
    this.context.moveTo(vertices[0].x, vertices[0].y);

    for (const vertex of vertices.slice(1)) {
      this.context.lineTo(vertex.x, vertex.y);
    }

    this.context.closePath();
    this.context.fillStyle = hexagon.color;
    this.context.fill();
  }
}

/**
 * Centralizes input rules and user-facing validation messages.
 */
class HexagonValidator {
  static MIN_DIMENSION = 16;
  static MAX_DIMENSION = 4096;
  static HEX_PATTERN = /^#[0-9A-F]{6}$/i;

  validateDimension(value, label) {
    if (value.trim() === "") {
      return { valid: false, message: `${label} is required.` };
    }

    const number = Number(value);
    if (!Number.isInteger(number)) {
      return { valid: false, message: `${label} must be a whole number.` };
    }

    if (
      number < HexagonValidator.MIN_DIMENSION ||
      number > HexagonValidator.MAX_DIMENSION
    ) {
      return {
        valid: false,
        message: `Use ${HexagonValidator.MIN_DIMENSION}–${HexagonValidator.MAX_DIMENSION} px.`,
      };
    }

    return { valid: true, value: number, message: "" };
  }

  validateColor(value) {
    const normalized = value.trim().toUpperCase();

    if (!HexagonValidator.HEX_PATTERN.test(normalized)) {
      return {
        valid: false,
        message: "Enter a six-digit hex code, such as #7C5CFC.",
      };
    }

    return { valid: true, value: normalized, message: "" };
  }
}

/**
 * Converts a rendered canvas to a downloadable image.
 */
class ImageExporter {
  constructor(renderer) {
    this.renderer = renderer;
  }

  export(hexagon, format) {
    const isJpeg = format === "jpeg";
    this.renderer.render(hexagon, {
      backgroundColor: isJpeg ? "#FFFFFF" : null,
    });

    const mimeType = isJpeg ? "image/jpeg" : "image/png";
    const extension = isJpeg ? "jpg" : "png";
    const quality = isJpeg ? 0.95 : undefined;

    this.renderer.canvas.toBlob(
      (blob) => {
        if (!blob) {
          throw new Error("The image could not be generated.");
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `hexagon-${hexagon.width}x${hexagon.height}.${extension}`;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        // Restore the transparent preview after a JPG export.
        if (isJpeg) {
          this.renderer.render(hexagon);
        }
      },
      mimeType,
      quality,
    );
  }
}

/**
 * Application controller coordinating form state, rendering, and export.
 */
class HexagonGeneratorApp {
  constructor(documentRoot) {
    this.elements = {
      width: documentRoot.querySelector("#width"),
      height: documentRoot.querySelector("#height"),
      color: documentRoot.querySelector("#color"),
      colorSwatch: documentRoot.querySelector("#color-swatch"),
      previewSize: documentRoot.querySelector("#preview-size"),
      canvas: documentRoot.querySelector("#preview-canvas"),
      exportPng: documentRoot.querySelector("#export-png"),
      exportJpg: documentRoot.querySelector("#export-jpg"),
    };

    this.validator = new HexagonValidator();
    this.renderer = new CanvasRenderer(this.elements.canvas);
    this.exporter = new ImageExporter(this.renderer);
    this.currentHexagon = null;
  }

  initialize() {
    const inputElements = [
      this.elements.width,
      this.elements.height,
      this.elements.color,
    ];

    inputElements.forEach((input) => {
      input.addEventListener("input", () => this.refresh());
      input.addEventListener("blur", () => this.refresh());
    });

    this.elements.color.addEventListener("blur", () => {
      const result = this.validator.validateColor(this.elements.color.value);
      if (result.valid) {
        this.elements.color.value = result.value;
      }
    });

    this.elements.exportPng.addEventListener("click", () => this.export("png"));
    this.elements.exportJpg.addEventListener("click", () => this.export("jpeg"));
    this.refresh();
  }

  refresh() {
    const result = this.readAndValidateInputs();
    if (!result.valid) {
      return;
    }

    this.currentHexagon = new Hexagon(
      result.width,
      result.height,
      result.color,
    );
    this.renderer.render(this.currentHexagon);
    this.elements.previewSize.textContent =
      `${result.width.toLocaleString()} × ${result.height.toLocaleString()} px`;
    this.elements.colorSwatch.style.backgroundColor = result.color;
    document.documentElement.style.setProperty("--accent", result.color);
  }

  readAndValidateInputs() {
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
      valid: width.valid && height.valid && color.valid,
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
    if (!result.valid) {
      return;
    }

    this.currentHexagon = new Hexagon(
      result.width,
      result.height,
      result.color,
    );
    this.exporter.export(this.currentHexagon, format);
  }
}

const app = new HexagonGeneratorApp(document);
app.initialize();
