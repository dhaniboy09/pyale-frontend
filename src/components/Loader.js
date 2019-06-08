import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

export const Loader = ({isLoading}) => {
  return (
      isLoading ? (
        <div>
          Loading &nbsp;<FontAwesomeIcon icon={faHome} spin size="lg"/>
        </div>
      ): ""
  );
};

