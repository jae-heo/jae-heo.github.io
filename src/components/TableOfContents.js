// components/TableOfContents.js
import React from 'react';

const TableOfContents = ({ items }) => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="table-of-contents-container">
      <h3 className="toc-title">목차</h3>
      <ul className="toc-list">
        {items.map((item, index) => (
          <li key={index} className="toc-item">
            <a 
              href={`#${item.id}`}
              className={`toc-link level-${item.level}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;