import React from 'react'
import propTypes from 'prop-types'

export default function MemberIndicator({number}) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-primary bg-secondary border-2 border-white rounded-full">
      {number ?? "0"}
    </span>
  );
}

MemberIndicator.propTypes = {
  number: propTypes.number
}