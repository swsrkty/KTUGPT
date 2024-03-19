import React, { useState, useEffect } from 'react';
import './sidebar.css'; // You can remove this line if you no longer need the CSS file
interface HistoryItem {
  id: number;
  content: string;
}

function HistorySidebar() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // This code will be executed only on the client side
    const fetchHistoryItems = async () => {
      // Simulated data for demonstration purposes
      const dummyHistory: HistoryItem[] = [
        { id: 1, content: 'History item 1' },
        { id: 2, content: 'History item 2' },
        { id: 3, content: 'History item 3' },
        { id: 4, content: 'History item 4' },
        { id: 5, content: 'History item 5' },
        { id: 6, content: 'History item 6' },
        { id: 7, content: 'History item 7' },
        { id: 8, content: 'History item 8' },
        { id: 9, content: 'History item 9' },
        { id: 10, content: 'History item 10' },
        { id: 11, content: 'History item 11' },
        { id: 12, content: 'History item 12' },
        { id: 13, content: 'History item 13' },
        { id: 14, content: 'History item 14' },
        { id: 15, content: 'History item 15' },
        { id: 16, content: 'History item 4' },
        { id: 17, content: 'History item 5' },
        { id: 18, content: 'History item 6' },
        

      ];
      setHistoryItems(dummyHistory);
    };

    fetchHistoryItems(); // Execute the fetch function
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  return (
    <div className="flex">
      <div className="w-72 bg-white-200 border border-gray-300 rounded-lg p-10 left-0 fixed h-full">
        <div className='overflow-y-scroll h-[550px] w-60' id='scrollDiv'>
        <h2 className="text-xl  text-white w-[180npx] mb-4 bg-black rounded-lg text-center">Chat History</h2>
        <ul className="list-none p-0 m-0">
          {historyItems.map(item => (
            <li key={item.id} className="py-2 px-4   hover:bg-gray-300 rounded-lg">{item.content}</li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default HistorySidebar;
