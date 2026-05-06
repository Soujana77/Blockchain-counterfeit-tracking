import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

export default function QrScanner({ onScan }) {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      }
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);

        scanner.clear();
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div
      id="reader"
      style={{
        width: "300px",
        margin: "auto",
      }}
    />
  );
}