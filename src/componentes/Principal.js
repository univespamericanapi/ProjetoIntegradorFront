import React from 'react'




const Principal = ({ componenteUm, componenteDois, componenteDoisNew, flag }) => {
  return (
    <div className="container">
      <div className="componente-um">
        {componenteUm}
      </div>


      {flag === 1 ? (
        <div className="componente-dois">
          {componenteDois}
        </div>
      ) : (
        <div className="componente-dois-new">
          {componenteDoisNew}
        </div>
      )}
      
    </div>
  )
}


  
export default Principal