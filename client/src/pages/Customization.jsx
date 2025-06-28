import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { ChromePicker } from "react-color";
import tshirtFront from "../assets/images/Tshirtfront.png";
import tshirtBack from "../assets/images/Tshirtback.png";
import hoodieFront from "../assets/images/sweatfront.png";
import hoodieBack from "../assets/images/sweatback.png";
import sweatshirtFront from "../assets/images/hoodiefront.png";
import sweatshirtBack from "../assets/images/hoodieback.png";
import jacketFront from "../assets/images/jacketfront.png";
import jacketBack from "../assets/images/jacketback.png";
import first from "../assets/images/first.webp";
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import "../styles/customization.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/slices/cartSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const productDetailsMap = {
  tshirt: {
    productName: "Customized T-shirt",
    price: 19.99,
    shortDesc: "This is a short description of the customized T-shirt.",
    description: "This is a detailed description of the customized T-shirt.",
  },
  hoodie: {
    productName: "Customized Sweatshirt",
    price: 39.99,
    shortDesc: "This is a short description of the customized sweatshirt.",
    description: "This is a detailed description of the customized sweatshirt.",
  },
  sweatshirt: {
    productName: "Customized Hoodie",
    price: 29.99,
    shortDesc: "This is a short description of the customized hoodies.",
    description: "This is a detailed description of the customized hoodies.",
  },
  jacket: {
    productName: "Customized Jacket",
    price: 49.99,
    shortDesc: "This is a short description of the customized jacket.",
    description: "This is a detailed description of the customized jacket.",
  },
};

const Customization = () => {
  const [selectedImage, setSelectedImage] = useState(first);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [showLogos, setShowLogos] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [showMainBox, setShowMainBox] = useState(true);
  const [designLogoSize, setDesignLogoSize] = useState(80);
  const [uploadLogoSize, setUploadLogoSize] = useState(80);
  const [currentProduct, setCurrentProduct] = useState({});
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const dispatch = useDispatch();

  const [textElements, setTextElements] = useState([]);
  const [showTextBox, setShowTextBox] = useState(false);
  const [currentText, setCurrentText] = useState({
    id: Date.now(),
    text: "",
    position: { x: 50, y: 50 },
    size: 20,
    color: "#000000",
    font: "Arial",
  });
  const [selectedTextId, setSelectedTextId] = useState(null);

  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const saveToHistory = () => {
    const newState = {
      selectedImage,
      selectedLogo,
      uploadedLogo,
      color,
      isFront,
      designLogoSize,
      uploadLogoSize,
      textElements: [...textElements],
    };
    const newHistory = [...history];
    newHistory.splice(currentHistoryIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  };

  useEffect(() => {
    saveToHistory();
  }, [
    selectedImage,
    selectedLogo,
    uploadedLogo,
    color,
    isFront,
    designLogoSize,
    uploadLogoSize,
    textElements,
  ]);

  const handleImageChange = (event) => {
    let newImage, productKey;
    switch (event.target.value) {
      case "tshirtImage":
        newImage = tshirtFront;
        productKey = "tshirt";
        break;
      case "hoodieImage":
        newImage = hoodieFront;
        productKey = "hoodie";
        break;
      case "sweatshirtImage":
        newImage = sweatshirtFront;
        productKey = "sweatshirt";
        break;
      case "jacketImage":
        newImage = jacketFront;
        productKey = "jacket";
        break;
      default:
        newImage = first;
        productKey = "";
        break;
    }

    setSelectedImage(newImage);
    setIsFront(true);
    setSelectedLogo(null);
    setUploadedLogo(null);
    setCurrentProduct(productDetailsMap[productKey] || {});
  };

  const handleRotate = () => {
    setIsFront(!isFront);
  };

  const handleDesignButtonClick = () => {
    setShowLogos(!showLogos);
  };

  const handleLogoClick = (logo) => {
    setSelectedLogo(logo);
  };

  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedLogo(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextButtonClick = () => {
    setShowTextBox(!showTextBox);
    setSelectedTextId(null);
    const newTextElement = {
      id: Date.now(),
      text: "",
      position: { x: 50, y: 50 },
      size: 20,
      color: "#000000",
      font: "Arial",
    };
    setCurrentText(newTextElement);
    setTextElements([...textElements, newTextElement]);
  };

  const handleTextChange = (event) => {
    const newText = { ...currentText, text: event.target.value };
    setCurrentText(newText);
    setTextElements((elements) =>
      elements.map((el) => (el.id === currentText.id ? newText : el))
    );
  };

  const handleTextSizeChange = (event) => {
    const newSize = { ...currentText, size: event.target.value };
    setCurrentText(newSize);
    setTextElements((elements) =>
      elements.map((el) => (el.id === currentText.id ? newSize : el))
    );
  };

  const handleTextColorChange = (color) => {
    const newColor = { ...currentText, color: color.hex };
    setCurrentText(newColor);
    setTextElements((elements) =>
      elements.map((el) => (el.id === currentText.id ? newColor : el))
    );
  };

  const handleFontFamilyChange = (event) => {
    const newFont = { ...currentText, font: event.target.value };
    setCurrentText(newFont);
    setTextElements((elements) =>
      elements.map((el) => (el.id === currentText.id ? newFont : el))
    );
  };

  const handleDesignLogoSizeChange = (event) => {
    setDesignLogoSize(event.target.value);
  };

  const handleUploadLogoSizeChange = (event) => {
    setUploadLogoSize(event.target.value);
  };

  const handleTextSelect = (id) => {
    const selectedText = textElements.find((el) => el.id === id);
    if (selectedText) {
      setSelectedTextId(id);
      setShowTextBox(true);
      setCurrentText(selectedText);
    }
  };

  const handleDelete = () => {
    if (selectedTextId) {
      setTextElements(textElements.filter((el) => el.id !== selectedTextId));
      setShowTextBox(false);
    } else {
      setColor("#ffffff");
      setSelectedLogo(null);
      setUploadedLogo(null);
      setTextElements([]);
    }
  };

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const previousState = history[currentHistoryIndex - 1];
      setSelectedImage(previousState.selectedImage);
      setSelectedLogo(previousState.selectedLogo);
      setUploadedLogo(previousState.uploadedLogo);
      setColor(previousState.color);
      setIsFront(previousState.isFront);
      setDesignLogoSize(previousState.designLogoSize);
      setUploadLogoSize(previousState.uploadLogoSize);
      setTextElements(previousState.textElements || []);
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      if (nextState) {
        setSelectedLogo(nextState.selectedLogo);
        setUploadedLogo(nextState.uploadedLogo);
        setColor(nextState.color);
        setIsFront(nextState.isFront);
        setDesignLogoSize(nextState.designLogoSize);
        setUploadLogoSize(nextState.uploadLogoSize);
        setTextElements(nextState.textElements || []);
        setCurrentHistoryIndex(currentHistoryIndex + 1);
      }
    }
  };

  useEffect(() => {
    const getImageForSide = () => {
      switch (selectedImage) {
        case tshirtFront:
        case tshirtBack:
          return isFront ? tshirtFront : tshirtBack;
        case hoodieFront:
        case hoodieBack:
          return isFront ? hoodieFront : hoodieBack;
        case sweatshirtFront:
        case sweatshirtBack:
          return isFront ? sweatshirtFront : sweatshirtBack;
        case jacketFront:
        case jacketBack:
          return isFront ? jacketFront : jacketBack;
        default:
          return selectedImage;
      }
    };

    const currentImage = getImageForSide();

    if (currentImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = currentImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
        ctx.drawImage(img, 0, 0);
        applyColorOverlay(ctx, img.width, img.height);
        textElements.forEach((textElement) => {
          ctx.font = `${textElement.size}px ${textElement.font}`;
          ctx.fillStyle = textElement.color;
          ctx.fillText(
            textElement.text,
            textElement.position.x,
            textElement.position.y
          );
        });
      };
    }
  }, [selectedImage, color, isFront, textElements]);

  const applyColorOverlay = (ctx, width, height) => {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const [rColor, gColor, bColor] = [
      parseInt(color.substring(1, 3), 16),
      parseInt(color.substring(3, 5), 16),
      parseInt(color.substring(5, 7), 16),
    ];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 0 && !(r < 50 && g < 50 && b < 50)) {
        const luminance = 0.3 * r + 0.59 * g + 0.11 * b;
        data[i] = (rColor * luminance) / 255;
        data[i + 1] = (gColor * luminance) / 255;
        data[i + 2] = (bColor * luminance) / 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const redrawCanvas = (state) => {
    const currentImage = selectedImage;

    if (currentImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = currentImage;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
        ctx.drawImage(img, 0, 0);
        applyColorOverlay(ctx, img.width, img.height);
        if (state && state.textElements) {
          state.textElements.forEach((textElement) => {
            ctx.font = `${textElement.size}px ${textElement.font}`;
            ctx.fillStyle = textElement.color;
            ctx.fillText(
              textElement.text,
              textElement.position.x,
              textElement.position.y
            );
          });
        }
      };
    }
  };

  const handleOtherButtonClick = () => {
    setShowMainBox(false);
    setShowOtherOptions(true);
  };

  const handleBackButtonClick = () => {
    setShowMainBox(true);
    setShowOtherOptions(false);
  };

  const getRestrictedAreaLogo = () => {
    if (selectedImage === tshirtFront || selectedImage === tshirtBack) {
      return {
        left: -70,
        top: -450,
        right: 80,
        bottom: -100,
      };
    } else if (selectedImage === hoodieFront || selectedImage === hoodieBack) {
      return {
        left: -70,
        top: -450,
        right: 100,
        bottom: -140,
      };
    } else if (
      selectedImage === sweatshirtFront ||
      selectedImage === sweatshirtBack
    ) {
      return {
        left: -50,
        top: -450,
        right: 70,
        bottom: -140,
      };
    } else if (selectedImage === jacketFront || selectedImage === jacketBack) {
      return {
        left: -70,
        top: -420,
        right: 70,
        bottom: -140,
      };
    }
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
  };

  const getRestrictedAreaText = () => {
    if (selectedImage === tshirtFront || selectedImage === tshirtBack) {
      return {
        left: 80,
        top: -450,
        right: 290,
        bottom: -100,
      };
    } else if (selectedImage === hoodieFront || selectedImage === hoodieBack) {
      return {
        left: 100,
        top: -450,
        right: 290,
        bottom: -100,
      };
    } else if (
      selectedImage === sweatshirtFront ||
      selectedImage === sweatshirtBack
    ) {
      return {
        left: 100,
        top: -400,
        right: 290,
        bottom: -100,
      };
    } else if (selectedImage === jacketFront || selectedImage === jacketBack) {
      return {
        left: 90,
        top: -400,
        right: 290,
        bottom: -100,
      };
    }
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
  };

  const restrictMovement = (e, data) => {
    const restrictedArea = getRestrictedAreaLogo();
    const newX = Math.max(
      restrictedArea.left,
      Math.min(data.x, restrictedArea.right)
    );
    const newY = Math.max(
      restrictedArea.top,
      Math.min(data.y, restrictedArea.bottom)
    );
    return { x: newX, y: newY };
  };

  const restrictTextMovement = (e, data) => {
    const restrictedArea = getRestrictedAreaText();
    const newX = Math.max(
      restrictedArea.left,
      Math.min(data.x, restrictedArea.right)
    );
    const newY = Math.max(
      restrictedArea.top,
      Math.min(data.y, restrictedArea.bottom)
    );
    return { x: newX, y: newY };
  };

  const addToCart = () => {
    const canvas = canvasRef.current;
    const imgUrl = canvas.toDataURL("image/png");

    dispatch(
      cartActions.addItem({
        id: Date.now(),
        imgUrl: imgUrl, // this captures the current state of the canvas
        productName: currentProduct.productName,
        price: currentProduct.price,
        quantity: 1,
      })
    );
    toast.success("Product added to cart");
  };

  return (
    <div className="customization-container">
      <h1 className="heading">Customization</h1>
      <div className="sidebar">
        {showMainBox && (
          <div className="button-container main-box">
            <div className="button-group">
              <select onChange={handleImageChange} className="button1">
                <option value="first">Select Product</option>
                <option value="tshirtImage">T-shirt</option>
                <option value="sweatshirtImage">Hoodie</option>
                <option value="hoodieImage">Sweatshirt</option>
                <option value="jacketImage">Jacket</option>
              </select>
              <button onClick={handleOtherButtonClick} className="button9">
                Other
              </button>
            </div>
            <div className="color-picker-section">
              <button className="button10" onClick={handleColorPickerClick}>
                Color Picker
              </button>
              {showColorPicker && (
                <ChromePicker
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              )}
            </div>
          </div>
        )}
        {showOtherOptions && (
          <div className="button-container other-box">
            <button onClick={handleDesignButtonClick} className="button1">
              Design
            </button>
            {showLogos && (
              <div className="logo-options">
                <button
                  className="button1"
                  onClick={() => handleLogoClick(logo1)}
                >
                  Logo 1
                </button>
                <button
                  className="button1"
                  onClick={() => handleLogoClick(logo2)}
                >
                  Logo 2
                </button>
                <button
                  className="button1"
                  onClick={() => handleLogoClick(logo3)}
                >
                  Logo 3
                </button>
                <div>
                  <label>Design Logo Size:</label>
                  <input
                    type="range"
                    value={designLogoSize}
                    onChange={handleDesignLogoSizeChange}
                    min="10"
                    max="200"
                  />
                </div>
              </div>
            )}
            <button onClick={handleTextButtonClick} className="button1">
              Text
            </button>
            {showTextBox && (
              <div className="text-toolbar">
                <input
                  type="text"
                  value={currentText.text}
                  onChange={handleTextChange}
                  className="text-input"
                  placeholder="Enter text"
                />
                <div>
                  <label>Font Size:</label>
                  <input
                    type="number"
                    value={currentText.size}
                    onChange={handleTextSizeChange}
                    min="10"
                    max="100"
                    step="1"
                  />
                </div>
                <div>
                  <label>Text Color:</label>
                  <ChromePicker
                    color={currentText.color}
                    onChangeComplete={handleTextColorChange}
                  />
                </div>
                <div>
                  <label>Font Family:</label>
                  <select
                    value={currentText.font}
                    onChange={handleFontFamilyChange}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Impact">Impact</option>
                    <option value="Lucida Console">Lucida Console</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Arial Black">Arial Black</option>
                    <option value="Palatino Linotype">Palatino Linotype</option>
                    <option value="Book Antiqua">Book Antiqua</option>
                    <option value="Arial Narrow">Arial Narrow</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Arial Rounded MT Bold">
                      Arial Rounded MT Bold
                    </option>
                    <option value="Century Gothic">Century Gothic</option>
                    <option value="Candara">Candara</option>
                    <option value="Courier">Courier</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Brush Script MT">Brush Script MT</option>
                    <option value="Lucida Sans Unicode">
                      Lucida Sans Unicode
                    </option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Gill Sans">Gill Sans</option>
                    <option value="Optima">Optima</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Futura">Futura</option>
                  </select>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="button1"
            />
            <div>
              <label>Upload Logo Size:</label>
              <input
                type="range"
                value={uploadLogoSize}
                onChange={handleUploadLogoSizeChange}
                min="10"
                max="200"
              />
            </div>
            <button onClick={handleBackButtonClick} className="button1">
              Back
            </button>
          </div>
        )}
      </div>
      <div className="main-content">
        <div className="item-selection">
          <div className="item-info">
            <div
              className="image-container"
              style={{
                display: "inline-block",
                width: "300px",
                height: "300px",
                marginLeft: "-6rem",
                marginTop: "-5rem",
              }}
            >
              <canvas ref={canvasRef} className="canvas" />
              {selectedLogo && (
                <Draggable
                  bounds={getRestrictedAreaLogo()}
                  onDrag={restrictMovement}
                >
                  <img
                    src={selectedLogo}
                    className="image10"
                    alt="Selected Logo"
                    ref={logoRef}
                    style={{
                      cursor: "move",
                      position: "absolute",
                      zIndex: 3,
                      width: `${designLogoSize}px`,
                      height: `${designLogoSize}px`,
                    }}
                  />
                </Draggable>
              )}
              {uploadedLogo && (
                <Draggable
                  bounds={getRestrictedAreaLogo()}
                  onDrag={restrictMovement}
                >
                  <img
                    className="image10"
                    src={uploadedLogo}
                    alt="Uploaded Logo"
                    ref={logoRef}
                    style={{
                      cursor: "move",
                      position: "absolute",
                      zIndex: 3,
                      width: `${uploadLogoSize}px`,
                      height: `${uploadLogoSize}px`,
                    }}
                  />
                </Draggable>
              )}
              {textElements.map((textElement) => (
                <Draggable
                  key={textElement.id}
                  position={textElement.position}
                  onStop={(e, data) =>
                    setTextElements((elements) =>
                      elements.map((el) =>
                        el.id === textElement.id
                          ? { ...el, position: { x: data.x, y: data.y } }
                          : el
                      )
                    )
                  }
                  onClick={() => handleTextSelect(textElement.id)}
                  bounds={getRestrictedAreaText()}
                  onDrag={restrictTextMovement}
                >
                  <div
                    className="image10"
                    style={{
                      position: "absolute",
                      cursor: "move",
                      zIndex: 3,
                      fontSize: `${textElement.size}px`,
                      color: textElement.color,
                      fontFamily: textElement.font,
                    }}
                  >
                    {textElement.text}
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </div>
        {currentProduct.productName && (
          <div className="item-details">
            <h2 className="Title">{currentProduct.productName}</h2>
            <p className="short-description">{currentProduct.shortDesc}</p>
            <p className="description">{currentProduct.description}</p>
            <p className="price">${currentProduct.price}</p>
            <motion.button
              whileTap={{ scale: 1.2 }}
              className="add-to-cart-button"
              onClick={addToCart}
            >
              Add to Cart
            </motion.button>
          </div>
        )}
        <div className="action-buttons">
          <button onClick={handleRotate} className="button2">
            Rotate
          </button>
          <button onClick={handleDelete} className="button3">
            Delete
          </button>
          <button onClick={handleUndo} className="button4">
            Undo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customization;
