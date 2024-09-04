'use client'

function ExtendButton({ isExpanded, setExpand }) {
   return (
      <span onClick={() => setExpand(!isExpanded)}>
         {isExpanded ? '\u2191' : '\u2193'}
      </span>
   );
}

export default ExtendButton;