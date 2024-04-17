import React, { useState, useEffect } from 'react';
import './sidebar.css'; // You can remove this line if you no longer need the CSS file
interface HistoryItem {
  id: number;
  content: string;
}

function HistorySidebar(props) {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // This code will be executed only on the client side
  
    const fetchHistoryItems = async () => {
      // Simulated data for demonstration purposes
      const dummyHistory: HistoryItem[] = [
    
      ];
      setHistoryItems(dummyHistory);
    };

    fetchHistoryItems(); // Execute the fetch function
  }, [props]); // Empty dependency array means this effect runs only once, similar to componentDidMount

  return (
    <div className="flex">
      <div className="w-65 bg-white-200 p-0 left-0 absolute h-full">
        <div className='overflow-y-scroll h-screen w-60' id='scrollDiv'>
        <h2 className="p-1 text-xl  text-white w-[180npx]  bg-[#0f172a] dark:bg-[#020817] text-center">Chat History</h2>
        <ul className="list-none p-0 m-0">
          {props.data.map(item => (
            <li className="py-2 px-4 hover:bg-gray-300 dark:hover:bg-[#0f172a] dark:border-[#020817] border-b-4 border-r-4">{item}</li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
}

export default HistorySidebar;
