```markdown
# Scroll-Interactive 3D Website with Three.js

This project demonstrates how to integrate a 3D object into a website that reacts to user scroll events. It uses Three.js to render a GLB model in a fixed background while the website’s content scrolls in the foreground. The project also shows how to center a model’s pivot point, adjust the camera, and rotate the object based on scroll.

## What I Learned

- **Setting Up the Environment:**
  - Created a basic project structure with a fixed background container for the Three.js canvas and a scrollable foreground for HTML content.
  - Used Vite (or another local development server) for serving files during development.

- **Three.js Basics:**
  - Created a scene, camera, and renderer.
  - Configured the camera with a perspective view and set its position so that it looks toward the center of the scene.
  - Enabled shadows on the renderer and added ambient and directional lights.

- **Loading and Using a GLB Model:**
  - Utilized the `GLTFLoader` from Three.js to load a GLB model (exported from Tinkercad, for example).
  - Applied material properties like `metalness` and `roughness` to achieve a realistic appearance.
  
- **Centering the Model's Pivot:**
  - Recognized that if the model’s origin isn't at its geometric center, rotations might seem off.
  - Calculated the model’s bounding box and its center.
  - Adjusted the model’s position by subtracting the center vector so that it rotates around its true center.

- **Scroll-based Interactions:**
  - Implemented a scroll event listener that updates the rotation of the 3D model based on the current scroll position.
  - Learned that rotating the model (instead of moving the camera) helps keep it centered on the screen.

- **OrbitControls:**
  - Integrated OrbitControls for optional manual camera navigation.
  - Configured OrbitControls to update the camera view dynamically.

## Folder Structure

```
/3D-Scroll-Website
  ├── index.html         # Main HTML file with website structure and fixed background container.
  ├── README.md          # This file.
  ├── public/
  │   └── RedSquare.glb  # Your 3D model exported as GLB.
  └── src/
      └── main.js        # Main JavaScript file containing Three.js scene, model loading, and scroll interactions.
```

## How It Works

1. **Website Layout:**
   - The HTML file defines a header, footer, and a content section that scrolls.
   - A fixed background container (`#bg-container`) holds the Three.js canvas, ensuring the 3D scene stays in the background while the user scrolls.

2. **Three.js Scene Setup:**
   - The scene is created with a dark background.
   - The camera is set up to view the center of the scene, and its position is defined to provide a good perspective on the 3D object.
   - Ambient and directional lights are added to illuminate the scene and cast shadows.

3. **Model Loading and Centering:**
   - The GLB model is loaded using `GLTFLoader`.
   - The model’s pivot is recentered by computing its bounding box and subtracting the center of that box from the model’s position. This ensures that the model rotates around its center.

4. **Scroll-based Animation:**
   - A scroll event listener captures the window’s scroll position.
   - The model rotates on its Y-axis according to the scroll value, creating an interactive effect where scrolling rotates the object.

5. **Camera and Controls:**
   - OrbitControls are used to allow optional manual adjustment of the camera.
   - The camera and renderer update automatically on window resize.

## How to Run

1. **Install Dependencies:**
   ```bash
   npm init -y
   npm install three vite
   ```
2. **Run the Development Server:**
   ```bash
   npx vite
   ```
3. **Open Your Browser:**
   Navigate to the provided local URL (e.g., http://localhost:5173) to see the 3D scene with scroll-based interactivity.

## Conclusion

By following this project, I learned how to integrate a 3D model into a web page, how to adjust the pivot of a model for proper rotation, and how to make the 3D scene react to scroll events while still allowing standard website content to scroll. This forms the basis for creating dynamic, interactive web experiences with Three.js.

Enjoy exploring and expanding upon this project!
```