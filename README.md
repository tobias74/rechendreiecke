# **Rechendreieck Math Game**

A responsive and interactive React application for practicing math with **Rechendreiecke** (calculation triangles). The app allows users, especially children, to solve different difficulty levels of math puzzles in an engaging way.

---

## **Features**

- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Interactive Gameplay**:
  - Three difficulty levels:
    - **Inner Preset Mode**: Focus on sums with preset inner values.
    - **Mixed Mode**: Calculate missing inner and outer values.
    - **Outer Preset Mode**: Solve a system of equations using only outer values.
  - Randomized number generation with adjustable maximum values.
- **User Feedback**:
  - Instant validation of results with visual cues.
  - Confetti effect for correct solutions.
- **Customizable Options**:
  - Choose difficulty modes from a dropdown.
  - Adjust the maximum value of the injected numbers.

---

## **Tech Stack**

- **Frontend**: React + Vite
- **Styling**: TailwindCSS + DaisyUI for UI components
- **Animation**: Confetti effect using a customizable canvas-based solution
- **Build Tool**: Vite

---

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/rechendreieck.git
cd rechendreieck
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Run the Development Server**

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## **Usage**

### **Dropdown for Difficulty**

- Select from:
  - **Inner Preset Mode**
  - **Mixed Mode**
  - **Outer Preset Mode**
  - **Random Mode**: Randomly selects a difficulty level for each new puzzle.

### **Adjust Maximum Value**

- Use the **Max Value** dropdown to control the range of generated numbers.

### **Next Button**

- Press the **Next** button to load a new puzzle.

### **Solve and Validate**

- Fill in the missing values in the **Rechendreieck**.
- Receive instant feedback for correct solutions with a **confetti celebration**!

---

## **Responsive Design**

- The app adjusts automatically to the screen size.
- For mobile, ensure a viewport width of at least `320px`.

---

## **Project Structure**

```plaintext
src/
├── components/
│   ├── AppBar.jsx       # Navigation bar for the app
│   ├── Rechendreieck.jsx # Main game logic and UI
│   ├── InsideInput.jsx   # Input fields for inner values
│   ├── OutsideInput.jsx  # Input fields for outer values
│   ├── ConfettiEffect.jsx # Animated confetti effect
├── utils/
│   ├── rechendreieckUtils.js # Utility functions for geometry and calculations
├── number-injection-strategies/
│   ├── injectEasyMode.js   # Easy mode logic
│   ├── injectMediumMode.js # Medium mode logic
│   ├── injectHardMode.js   # Hard mode logic
├── solution-strategies/
│   ├── sumStrategy.js      # Validation logic for solutions
├── routes/
│   ├── Home.jsx            # Main page
│   ├── About.jsx           # About page
├── styles/
│   ├── main.scss           # Global styles
└── App.jsx                 # Main React component
```

---

## **Customization**

### **Change Colors**

Modify the theme in `tailwind.config.js` to adjust the app’s appearance.

### **Add More Modes**

1. Create a new file in `number-injection-strategies/`.
2. Define a new logic for generating preset numbers.
3. Add the strategy to the dropdown in `Home.jsx`.

---

## **Build for Production**

To create a production-ready build:

```bash
npm run build
```

The build will be available in the `dist` folder.

---

## **License**

This project is licensed under the MIT License.

---

## **Contact**

If you have any questions or feedback, feel free to contact:

**Tobias Gassmann**  
Email: mail@tobiga.com  
Tel: +49 160 96 24 83 98

---
