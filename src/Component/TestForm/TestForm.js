import React from 'react';
import Modal from 'react-modal';
import './TestForm.css'


Modal.setAppElement('#root');


const TestForm = ({ modalIsOpen, closeModal }) => {

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
        subtitle.style.color = 'red';
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit</h2>

                <div>Please edit products correctly </div>
                <form className="modal">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Name" />

                </form>
                <button onClick={closeModal}>close</button>
            </Modal>

        </div>
    );
};

export default TestForm;