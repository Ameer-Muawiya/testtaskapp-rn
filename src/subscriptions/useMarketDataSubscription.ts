import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { MarketData } from '../features/ip/types';

const useMarketDataSubscription = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useWebSocket({
    channel: 1,
    enabled: true,
    onMessage: (data: MarketData) => {
      setMarketData(prev => [data, ...prev]);
    },
  });

  return {marketData}
};

export default useMarketDataSubscription;
