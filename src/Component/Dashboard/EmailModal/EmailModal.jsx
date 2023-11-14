import React from "react";

const EmailModal = ({ items, title }) => {
  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{title}</h3>
          {items.map((item) => {
            return (
              <span>
                {` ${
                  item?.promotions?.email
                    ? item?.promotions?.email
                    : item?.promotions?.phone_number
                }`}
                ,
              </span>
            );
          })}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmailModal;
