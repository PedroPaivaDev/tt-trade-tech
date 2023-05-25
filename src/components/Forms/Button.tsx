import React from 'react';

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  statusSubmit?: StatusSubmit;
  setStatusSubmit?: React.Dispatch<React.SetStateAction<StatusSubmit>>;
}

const Button = ({children, statusSubmit, setStatusSubmit, className, ...props}:PropsButton) => {
  React.useEffect(() => {
    if(statusSubmit?.status) {
      setTimeout(() => {
        setStatusSubmit && setStatusSubmit({
          status: null,
          msg: null
        })
      }, 2000);
    }
  }, [statusSubmit, setStatusSubmit]);

  return (
    <div className={className}>
      {statusSubmit?.status && <h6 className={`status ${statusSubmit.status}`}>{statusSubmit.msg}</h6>}
      <button {...props}>
        {children}
      </button>
    </div>
  )
}

export default Button;