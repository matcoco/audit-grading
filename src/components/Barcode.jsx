import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        displayValue: false,
        fontSize: 18
      });
    }
  }, [value]);

  return <svg ref={barcodeRef}></svg>;
};

export default Barcode;
