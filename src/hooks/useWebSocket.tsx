import { useEffect, useRef } from 'react';
import config from '../common/config';
import { store } from '../features/store';
import { takeDelay } from '../utils/common';

interface WebSocketOptions {
  channel: number;
  onMessage: (data: any) => void;
  maxRetries?: number;
  enabled: boolean;
}

export const useWebSocket = ({
  channel,
  onMessage,
  maxRetries = 5,
  enabled,
}: WebSocketOptions) => {
  const ws = useRef<WebSocket>(undefined);
  const initRetry = useRef(0);

  const init = () => {
    const token = '';
    initRetry.current += 1;
    console.log(
      `[WebSocket] Attempting to connect to ${channel}, try #${initRetry.current}`,
    );

    ws.current = new WebSocket(config.ws_url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    ws.current.onopen = () => {
      console.log(`✅ WebSocket connected to ${channel}`);
      initRetry.current = 0;

      const subscribePayload = {
        // event: 'pusher:subscribe',
        // data: { channel },
        method: 'SUBSCRIBE',
        params: ['btcusdt@aggTrade'],
        id: channel,
      };

      console.log(`[WebSocket] Sending subscribe event:`, subscribePayload);
      ws.current!.send(JSON.stringify(subscribePayload));
    };

    ws.current.onerror = async error => {
      console.error(`❌ WebSocket error on ${channel}:`, error);
      ws.current?.close();
      if (initRetry.current <= maxRetries) {
        console.log(`[WebSocket] Retrying in 2 seconds...`);
        await takeDelay(2000);
        init();
      } else {
        console.warn(
          `[WebSocket] Max retries reached for ${channel}. Giving up.`,
        );
      }
    };

    ws.current.onclose = event => {
      console.warn(`❌ WebSocket disconnected from ${channel}`, event);
    };

    ws.current.onmessage = async event => {
      try {
        const parsed = JSON.parse(event.data);
        console.log(`[WebSocket] Raw message received on ${channel}:`, parsed);
        if (parsed.result === null) {
          
        }else{
        onMessage(parsed);
        }
      } catch (e) {
        console.error(`❌ Failed to parse WebSocket message on ${channel}:`, e);
      }
    };
  };

  useEffect(() => {
    if (enabled) {
      init();
    } else {
      console.log(
        `[WebSocket] Skipped init: connection disabled for channel ${channel}`,
      );
    }
    return () => ws.current?.close();
  }, [enabled]);
};
