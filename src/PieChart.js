import React, { useEffect } from "react";

function PieChart({ canvasRef, pieData, outline }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //clear the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate the total value of the data
    const total = pieData.value.reduce((acc, val) => acc + val, 0);

    // Set the center point and radius of the pie chart
    const centerX = canvas.width / 3.75;
    const centerY = canvas.height / 2;
    const radius = (Math.min(canvas.width, canvas.height) / 2) * 0.85;

    // Define the patterns to use for the chart
    const patterns = ["0", "00", "x", "--", ".", "o", "|", "//", "-", "\\"];

    // Draw each segment of the pie chart
    let startAngle = 0;
    pieData.value.forEach((item, i) => {
      const sliceAngle = (2 * Math.PI * item) / total;
      const endAngle = startAngle + sliceAngle;
      // Create a pattern fill for the segment
      let fillPattern;
      const patternIndex = i % patterns.length;
      const pattern = patterns[patternIndex];
      fillPattern = ctx.createPattern(getPatternCanvas(pattern), "repeat");

      // Draw the segment using the pattern fill
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = fillPattern;
      // ctx.strokeStyle = "black";
      if (outline !== 0) {
        ctx.lineWidth = outline;
        ctx.stroke();
      }
      const spacing = 40;
      const labelSize = 14;
      const boxSize = 25;

      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeRect(500, i * spacing + spacing + 10, boxSize, boxSize);
      ctx.fillRect(500, i * spacing + spacing + 10, boxSize, boxSize);
      ctx.fillStyle = "black";
      ctx.font = `${labelSize}px Helvetica`;
      ctx.textAlign = "left";
      ctx.fillText(
        pieData["label"][i] ? pieData["label"][i].toString() : "",
        500 + boxSize + 10,
        i * spacing + spacing + 10 + boxSize
      );

      // Calculate the angle for the middle of the segment
      const midAngle = (startAngle + endAngle) / 2;

      // Calculate the position of the text
      const textX = centerX + Math.cos(midAngle) * (radius * 0.75);
      const textY = centerY + Math.sin(midAngle) * (radius * 0.75);

      // Draw the percentage with a black background
      const textWidth = ctx.measureText(pieData.label[i]).width;
      ctx.fillStyle = "white";
      ctx.fillRect(textX - textWidth / 2 - 2, textY - 20, textWidth + 4, 30);
      ctx.fillStyle = "black";

      // Set the font and text alignment
      ctx.font = "14px Helvetica";
      ctx.textAlign = "center";

      // Display the percentage and label
      const percent = ((item / total) * 100).toFixed(2);
      ctx.fillText(`${percent}%`, textX, textY - 7);
      ctx.fillText(`${pieData.label[i]}`, textX, textY + 7);

      startAngle = endAngle;
    });
  }, [pieData, outline, canvasRef]);

  // Helper function to create a canvas with a pattern
  const getPatternCanvas = (pattern) => {
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 20;
    patternCanvas.height = 20;

    const patternCtx = patternCanvas.getContext("2d");
    patternCtx.fillStyle = "black";
    patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

    if (pattern === "0") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
    } else if (pattern === "00") {
      patternCtx.fillStyle = "#c7c7c7";
      patternCtx.fillRect(0, 0, 20, 20);
    } else if (pattern === "--") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(10, 0, 10, 20);
      patternCtx.fillRect(0, 0, 20, 19);
    } else if (pattern === "-") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 1, 20, 19);
    } else if (pattern === ".") {
      patternCtx.lineWidth = 12;
      patternCtx.strokeStyle = "white";
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(20, 20);
      patternCtx.stroke();
      patternCtx.beginPath();
      patternCtx.moveTo(20, 0);
      patternCtx.lineTo(0, 20);
      patternCtx.stroke();
    } else if (pattern === "|") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(1, 0, 19, 20);
    } else if (pattern === "//") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
      patternCtx.lineWidth = 1;
      patternCtx.moveTo(0, 10);
      patternCtx.lineTo(10, 0);
      patternCtx.stroke();
    } else if (pattern === "+") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
      patternCtx.lineWidth = 1;
      patternCtx.strokeStyle = "black";
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(20, 20);
      patternCtx.stroke();
    } else if (pattern === "x") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
      patternCtx.lineWidth = 1;
      patternCtx.strokeStyle = "black";
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(5, 5);
      patternCtx.moveTo(5, 0);
      patternCtx.lineTo(0, 5);
      patternCtx.stroke();
    } else if (pattern === "o") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
      patternCtx.beginPath();
      patternCtx.arc(10, 10, 3, 0, 2 * Math.PI);
      patternCtx.stroke();
    } else if (pattern === "\\") {
      patternCtx.fillStyle = "white";
      patternCtx.fillRect(0, 0, 20, 20);
      patternCtx.lineWidth = 1;
      patternCtx.moveTo(10, 0);
      patternCtx.lineTo(20, 10);
      patternCtx.stroke();
    }
    return patternCanvas;
  };

  return <canvas id="canvas" ref={canvasRef} height={450} width={800} />;
}

export default PieChart;
