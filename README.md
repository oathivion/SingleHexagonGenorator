# Polygon Generator

A dependency-free browser application for creating and exporting custom 2D and
3D polygons from three to twenty sides.

## Getting Started

No packages, build tools, or installation steps are required.

1. Download or clone the project.
2. Open the project folder.
3. Double-click `index.html`, or open it with a modern browser.

On Windows, you can also start it from PowerShell:

```powershell
Start-Process .\index.html
```

If your browser restricts local files, serve the folder with a static server.
For example, if Python is installed:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Using the Generator

1. Use the **Render mode** switch to select 2D or 3D.
2. Select a polygon with 3 through 20 sides.
3. Enter the output width and height in pixels.
4. Enter a six-digit color such as `#7C5CFC`.
5. Review the result in the live preview.
6. Select **Export PNG** or **Export JPG** to download the image.

Dimensions must be whole numbers between 16 and 4096 pixels.

### 2D Mode

2D mode creates a flat polygon using the selected width, height, and color.

### 3D Mode

3D mode creates a dice-inspired showcase object. The 3-, 4-, and 5-sided
selections use classic solid forms. Selections from 6 through 20 use unique
custom models that prominently feature the selected polygon.

- Drag with a mouse or touch gesture to rotate the object.
- Focus the viewer and use the arrow keys to rotate it.
- Hold Shift with an arrow key for a larger rotation step.
- Select **Reset view** to restore the original angle.
- Exporting captures the currently displayed angle.

## Export Formats

- **PNG:** Preserves the transparent background.
- **JPG:** Fills transparent areas with white because JPG does not support
  transparency.

Downloaded filenames include the shape, render mode, and dimensions.

## Features

- Triangle through icosagon shape selection
- 2D and interactive 3D rendering modes
- Mouse, touch, and keyboard rotation
- Classic tetrahedron, cube, and dodecahedron forms for 3-5
- Fifteen individually designed showcase solids for 6-20
- Transparent preview and PNG export
- High-quality JPG export
- Responsive and keyboard-accessible interface
- Input validation for dimensions and hex colors
- No external dependencies

## Project Structure

- `index.html` contains the application interface.
- `styles.css` contains the layout, responsive design, and component styling.
- `app.js` contains geometry, mesh creation, rendering, interaction, validation,
  and exporting.

## Modifying the Code

The application uses plain HTML, CSS, and JavaScript.

- Add or rename shape options in `index.html`.
- Update polygon names in `Polygon.NAMES` inside `app.js`.
- Modify 3D designs in `ShowcaseDieFactory.DESIGNS`.
- Adjust colors and layout using the CSS variables near the top of `styles.css`.

Refresh the browser after making changes. No compilation step is necessary.

## Browser Support

Use a current version of Chrome, Edge, Firefox, or Safari with HTML Canvas,
pointer events, and JavaScript enabled.
