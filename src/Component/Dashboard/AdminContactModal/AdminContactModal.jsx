import React from "react";

const AdminContactModal = ({ item }) => {
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{item?.name} contact with you</h3>
          <p className="py-4">{item?.massage}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AdminContactModal;
