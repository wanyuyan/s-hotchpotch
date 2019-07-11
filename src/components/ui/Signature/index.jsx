import React, { useEffect } from "react";
import { Button } from "antd-mobile";
import SignaturePad from "signature_pad";
import "./index.scss";

let canvas = null;
let signaturePad = null;

export default function Signature() {
  useEffect(() => {
    if (canvas) {
      signaturePad = new SignaturePad(canvas, {
        maxWidth: 1.5,
        backgroundColor: '#eee'
      });
      resizeCanvas();
      window.onresize = resizeCanvas;
    }
    return () => {
      signaturePad.off();
    }
  }, [canvas]);

  function resizeCanvas() {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);

    signaturePad.clear();
  }

  function submit() {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      var dataURL = signaturePad.toDataURL();
      download(dataURL, "signature.png");
    }
  }

  function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      var blob = dataURLToBlob(dataURL);
      var url = window.URL.createObjectURL(blob);
  
      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;
  
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(url);
    }
  }

  function dataURLToBlob(dataURL) {
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  function cancel() {
    signaturePad.clear();
  }

  function undo() {
    var data = signaturePad.toData();
    if (data) {
      data.pop();       // remove the last dot or line
      signaturePad.fromData(data);
    }
  }

  return (
    <div className="signature-wrapper">
      <div className="signature-container">
        <div className="actions" style={{
          width: document.body.clientHeight - 5
        }}>
          <Button className="action" type="primary" onClick={submit}>
            确定
          </Button>
          <Button className="action" onClick={cancel}>
            撤销全部
          </Button>
          <Button className="action" onClick={undo}>
            撤销一步
          </Button>
        </div>
        <canvas ref={node => {canvas = node}} />
      </div>
    </div>
  );
}