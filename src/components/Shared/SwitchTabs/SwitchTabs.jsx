import PropTypes from "prop-types";
import { useState } from "react";

const SwitchTabs = ({ data, onChangeTab }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (item, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onChangeTab(item, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, index) => (
          <div
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(item, index)}
          >
            {item}
          </div>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

SwitchTabs.propTypes = {
  data: PropTypes.array,
  onChangeTab: PropTypes.func,
};

export default SwitchTabs;
