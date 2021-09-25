import React from "react";
import { default as QRCode0 } from "react-qr-code";

const QRCODE_SIZE = 64;

export default function QRCode({ url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <QRCode0 value={url} size={QRCODE_SIZE} />
    </a>
  );
}
