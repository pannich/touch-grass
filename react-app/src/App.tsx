import { useState, useEffect } from "react";

function App() {
  const [hp, setHp] = useState(0);
  const [objects, setObjects] = useState<
    { id: number; type: string; hpPerSecond: number }[]
  >([]);
  const [notifications, setNotifications] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  type ObjectType = "butterfly" | "snail" | "worm" | "bird";


  const objectTypes: Record<ObjectType, { emoji: string; animation: string }> = {
    "butterfly": { emoji: "🦋", animation: "animate-butterfly" },
    "snail": { emoji: "🐌", animation: "animate-snail" },
    "worm": { emoji: "🐛", animation: "animate-worm" },
    "bird": { emoji: "🐦", animation: "animate-bird" },
  };


  useEffect(() => {
    console.log("Objects array:", objects);
  }, [objects]);

  const increaseHP = (e: React.MouseEvent) => {
    setHp((prev) => prev + 1);

    const newId = Date.now();
    const x = e.clientX;
    const y = e.clientY;

    setNotifications((prev) => [...prev, { id: newId, x, y }]);

    // Remove after 1 second
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newId));
    }, 1000);
  };

  const addObject = (type: ObjectType, hpPerSecond: number) => {
    const id = Date.now();
    setObjects((prev) => [...prev, { id, type, hpPerSecond }]);

    const interval = setInterval(() => {
      setHp((prev) => prev + hpPerSecond);
    }, 1000);

    // Remove object after 50 seconds
    setTimeout(() => {
      setObjects((prev) => prev.filter((obj) => obj.id !== id));
      clearInterval(interval);
    }, 50000);
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Main Element */}
      <div
        onClick={increaseHP}
        className="bg-game flex-1 flex flex-col items-center justify-center cursor-pointer"
      >
        <h1 className="text-2xl mb-4 text-gray-500"> {hp}</h1>
        <p className="mb-6 text-white text-2xl">Touch Grass</p>

        {notifications.map((note) => (
          <div
            key={note.id}
            className="fixed text-sm text-lime-100 text-[1em] font-bold pointer-events-none animate-floatUp"
            style={{ left: note.x, top: note.y }}
          >
            🖐️
          </div>
        ))}
      </div>

      {/* Bottom Element */}
      <div className="h-[100px] bg-black flex gap-4 items-center justify-center shadow-md">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addObject("butterfly", 5);
          }}
          className="px-4 py-2 bg-green-500 text-blue-400 text-[2em] rounded"
        >
          🦋
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addObject("snail", 2); // slow, less HP
          }}
          className="px-4 py-2 bg-green-500 text-blue-400 text-[2em] rounded"
        >
          🐌
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addObject("worm", 2); // slow, less HP
          }}
          className="px-4 py-2 bg-green-500 text-blue-400 text-[2em] rounded"
        >
          🐛
        </button>

        {objects.map((obj) => {
          const config = objectTypes[obj.type as ObjectType];
          if (!config) return null; // skip unknown types

          return (
            <div
              key={obj.id}
              className={`fixed top-[400px] left-0 text-[2em] ${config.animation}`}
            >
              {config.emoji}
            </div>
          );
        })}
      </div>

      <div
      className="bg-black text-center text-[#242424] mt-2"
      > Nichada W. </div>
    </div>
  );
}

export default App;
