import React from 'react';
import './AddProductModal.css'
import Modal from 'react-modal';



Modal.setAppElement('#root');

const AddProductModal = ({ addModalIsOpen, AddCloseModal }) => {


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    var subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'green';
    }

    return (
        <div>
            <Modal
                isOpen={addModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={AddCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add</h2>

                <div>Please add products correctly </div>
                <form className="modal">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />

                </form>
                <button onClick={AddCloseModal}>close</button>
            </Modal>

        </div >
    );
};

export default AddProductModal;