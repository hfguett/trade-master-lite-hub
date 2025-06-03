
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Component = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const activities = [
    {
      id: 1,
      activity: "Trading Analysis",
      location: "BTC/USDT",
      date: "Today",
      color: "#4f46e5"
    },
    {
      id: 2,
      activity: "Portfolio Review",
      location: "Dashboard",
      date: "Yesterday",
      color: "#06b6d4"
    },
    {
      id: 3,
      activity: "Risk Assessment",
      location: "Analytics",
      date: "2 days ago",
      color: "#8b5cf6"
    }
  ];

  return (
    <div className="stacked-cards-container">
      <div className="inner_container">
        {activities.map((item, index) => (
          <div 
            key={item.id} 
            className={cn(
              "park_sec", 
              `park_sec${index + 1}`,
              isExpanded && "active"
            )}
          >
            <div className="park_inside">
              <span className="img" style={{ backgroundColor: item.color }}></span>
              <div className="content_sec">
                <h2>{item.activity}</h2>
                <span>{item.location}</span>
              </div>
            </div>
            <span className="date">{item.date}</span>
          </div>
        ))}
        <div className="btn_grp">
          <button 
            className={cn("btn", isExpanded && "active")} 
            onClick={toggleExpand}
          >
            {isExpanded ? "Hide" : "Show All"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .stacked-cards-container {
          position: relative;
          max-width: 700px;
          width: 100%;
          margin: 0px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .inner_container {
          position: relative;
          max-width: 400px;
          width: 100%;
          padding: 15px;
          border-radius: 25px;
          box-sizing: border-box;
        }
        
        .park_sec {
          position: relative;
          max-width: 100%;
          width: 100%;
          padding: 15px;
          border: 2px solid rgba(79, 70, 229, 0.3);
          border-radius: 25px;
          box-sizing: border-box;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 10px;
          transition: all .3s cubic-bezier(.68,-0.55,.27,1.55);
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          box-shadow: 0px 5px 10px rgba(6, 182, 212, 0.3);
        }
        
        .park_sec.active {
          transform: unset;
        }
        
        .park_sec1 {
          z-index: 2;
          transform: translateY(200%) scale(0.95);
        }
        
        .park_sec2 {
          z-index: 1;
          transform: translateY(100%) scale(0.9);
        }
        
        .park_sec3 {
          z-index: 0;
          transform: translateY(0px) scale(0.85);
        }
        
        .park_inside {
          position: relative;
          display: flex;
        }
        
        .content_sec {
          position: relative;
          margin-left: 10px;
        }
        
        .img {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .content_sec h2 {
          position: relative;
          margin: 0px;
          font-size: 16px;
          font-weight: 500;
          color: #f1f5f9;
        }
        
        .content_sec span,
        .park_sec span {
          position: relative;
          color: #cbd5e1;
          font-size: 15px;
        }
        
        .btn_grp {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
        
        .btn {
          position: relative;
          padding: 10px 40px 10px 30px;
          background: #4f46e5;
          color: white;
          border-radius: 20px;
          border: 0px;
          box-sizing: border-box;
          box-shadow: 0px 3px 3.5px rgba(79, 70, 229, 0.5);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0px 5px 5px rgba(79, 70, 229, 0.7);
          background: #6366f1;
        }
        
        .btn::after {
          position: absolute;
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 7px;
          height: 7px;
          right: 23px;
          top: 12px;
          transform: rotate(225deg);
          transition: all .3s linear;
        }
        
        .btn.active::after {
          transform: rotate(45deg);
          top: 17px;
        }
      `}</style>
    </div>
  );
};
