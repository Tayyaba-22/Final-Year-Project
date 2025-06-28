import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { fabric } from "fabric";
import "../styles/customization.css";

const Customization = () => {
  const [activeTab, setActiveTab] = useState("options");
  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas("tshirt-canvas");
    canvasRef.current = canvas;

    // Load and add a t-shirt image to the canvas
    fabric.Image.fromURL(
      "https://example.com/path/to/tshirt-image.png",
      (img) => {
        img.set({
          left: canvas.width / 2 - img.width / 2,
          top: canvas.height / 2 - img.height / 2,
          selectable: false, // Make the image non-selectable
        });
        canvas.add(img);
        canvas.sendToBack(img); // Ensure the t-shirt image is at the back
      }
    );

    // Add a sample text object to demonstrate color change
    const text = new fabric.Text("Sample Text", {
      left: 100,
      top: 100,
      fill: "#000000", // Default color
      selectable: true,
    });
    canvas.add(text);

    return () => {
      canvas.dispose(); // Clean up the canvas on component unmount
    };
  }, []);

  const handleGravatarClick = () => {
    console.log("Gravatar button clicked");
    // Add logic for Gravatar button here
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
    setShowColorPicker(true);
  };

  const handleRotateClick = () => {
    console.log("Rotate view button clicked");
    // Add logic to rotate the view here
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    console.log("Color selected:", color.hex);
    const canvas = canvasRef.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color.hex);
      canvas.renderAll();
    } else {
      console.log("No active object selected");
    }
  };

  return (
    <div className="customization-container">
      <h1>Customize T-Shirt</h1>
      <div className="tabs">
        <button
          className={activeTab === "options" ? "active" : ""}
          onClick={() => setActiveTab("options")}
        >
          T-Shirt Options
        </button>
        <button
          className={activeTab === "gravatar" ? "active" : ""}
          onClick={() => setActiveTab("gravatar")}
        >
          Gravatar
        </button>
      </div>
      <div className="row">
        {activeTab === "options" && (
          <div className="col-md-4 options-container">
            <h2>T-Shirt Options</h2>
            <button onClick={handleGravatarClick}>Gravatar</button>
            <button onClick={handleNextClick}>Next</button>
            <button onClick={handleRotateClick}>Rotate View</button>
            {showColorPicker && (
              <div className="color-picker">
                <SketchPicker
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              </div>
            )}
          </div>
        )}
        {activeTab === "gravatar" && (
          <div className="col-md-4 gravatar-container">
            {/* Gravatar specific content here */}
            <h2>Gravatar Options</h2>
          </div>
        )}
        <div className="col-md-4 canvas-container">
          <canvas id="tshirt-canvas" width={500} height={500} />
        </div>
        <div className="col-md-4 size-selection-container">
          <h2>Select Sizes</h2>
          {/* Size options */}
          <div>
            <label>
              <input type="checkbox" /> S
            </label>
            <input type="number" defaultValue="1" />
          </div>
          <div>
            <label>
              <input type="checkbox" /> M
            </label>
            <input type="number" defaultValue="1" />
          </div>
          <div>
            <label>
              <input type="checkbox" /> L
            </label>
            <input type="number" defaultValue="1" />
          </div>
          <div>
            <label>
              <input type="checkbox" /> XL
            </label>
            <input type="number" defaultValue="1" />
          </div>
          <div>
            <label>
              <input type="checkbox" /> XXL
            </label>
            <input type="number" defaultValue="1" />
          </div>
          <button>Add to bag</button>
        </div>
      </div>
    </div>
  );
};

export default Customization;
