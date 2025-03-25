import React, { useState, useEffect, useRef } from 'react';

const CryptoPrices = (network) => {
  const [prices, setPrices] = useState({ ETH: null, SOL: null });
  const ws = useRef();
  useEffect(() => {
    
    if(network === 'Eth') {
        ws.current = new WebSocket('wss://stream.binance.com:9443/stream?streams=ethusdt@ticker');
    } 
    else {
        ws.current = new WebSocket('wss://stream.binance.com:9443/stream?streams=solusdt@ticker')
    }
    
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // The structure is: { stream: "ethusdt@ticker", data: { c: "currentPrice", ... } }
      const { stream, data } = message;
      
      if (stream.startsWith('ethusdt')) {
        setPrices((prev) => ({ ...prev, ETH: data.c }));
      } else if (stream.startsWith('solusdt')) {
        setPrices((prev) => ({ ...prev, SOL: data.c }));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on component unmount
    return () => {
      ws.current.close();
    };
  }, []);
  
  return prices;
};

export default CryptoPrices;