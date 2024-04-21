export const useWebSocket = ({ url, settings, stream }) => {
  const ws = useState("ws", () => null);

  const connectHandler = () => {
    if (!ws.value) return;

    ws.value.send(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: [`${String(settings.value.symbol).toLowerCase()}@depth`],
        id: 1,
      })
    );
  };

  const errorHandler = (event) => {
    console.log("web socket error", event);
  };

  const messageHandler = (event) => {
    if (!event?.data) return;
    const message = JSON.parse(event.data);
    if (!message?.data) return;

    if (!stream.value) {
      stream.value = {
        bids: [],
        asks: [],
      };
    }

    stream.value.lastUpdateId = message.data.U;
    stream.value.bids = [...message.data.b, ...stream.value.bids]
      .filter((el) => +el[1] !== 0)
      .slice(0, settings.value.limit);
    stream.value.asks = [...message.data.a, ...stream.value.asks]
      .filter((el) => +el[1] !== 0)
      .slice(0, settings.value.limit);
  };

  const closeHandler = () => {
    if (!ws.value) return;

    ws.value.send(
      JSON.stringify({
        method: "UNSUBSCRIBE",
        params: [`${String(settings.value.symbol).toLowerCase()}@depth`],
        id: 1,
      })
    );
  };

  onMounted(() => {
    if (!ws.value) {
      ws.value = new WebSocket(url);
    } else {
      connectHandler();
    }

    ws.value.addEventListener("open", connectHandler);
    ws.value.addEventListener("error", errorHandler);
    ws.value.addEventListener("message", messageHandler);
  });

  onBeforeUnmount(() => {
    closeHandler();

    ws.value.removeEventListener("open", connectHandler);
    ws.value.removeEventListener("error", errorHandler);
    ws.value.removeEventListener("message", messageHandler);
  });

  return {
    ws,
    connectHandler,
    errorHandler,
    messageHandler,
  };
};
