import { useState, useEffect } from 'react';

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [isOpen]);

  return (
    <div className="dropdown relative">
      <div className="dropdown-toggle" onClick={toggle}>
        {props.trigger}
      </div>
      {isOpen && (
        <div className="dropdown-menu" onClick={toggle}>
          {props.children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
