import React from 'react';

import NavLink from 'Components/Atoms/NavLink';

const HelpLink: React.FC = () => {
  return (
    <NavLink to="/help" color="blue.700">
      Preciso de ajuda!
    </NavLink>
  );
};

export default HelpLink;
