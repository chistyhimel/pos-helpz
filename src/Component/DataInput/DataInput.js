import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import './DataInput.css'
import { GrEdit, GrAddCircle } from "react-icons/gr";
import TestForm from '../TestForm/TestForm';
import AddProductModal from '../AddProductModal/AddProductModal';
import DataTable from '../DataTable/DataTable';
import CartBottom from '../CartBottom/CartBottom';

const DataInput = () => {
    const history = useHistory();

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
        // history.push("/TextForm");
    };

    const [dataChange, setDataChange] = useState([]);
    // console.log(dataChange);
    const handleChange = (e) => {
        setDataChange(e.target.value);
    }

    //modals requirement for edit
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    //modals requirement for AddProductModal
    const [addModalIsOpen, setAddIsOpen] = useState(false);
    function AddOpenModal() {
        setAddIsOpen(true);
    }
    function AddCloseModal() {
        setAddIsOpen(false);
    }



    return (
        <div className="dataInputBody">
            {/* <Header /> */}
            <div className="inputHeader dataInput">
                <form onChange={handleSubmit(onSubmit)} className="Pos Manager">
                    <select ref={register} name="Pos-Manager" className="Pos-Manager">
                        <option value="null">Pos Manager</option>
                        <option value="Asif">Asif</option>
                        <option value="Udhvob">Udhvob</option>
                        <option value="Hemel">Hemel</option>
                    </select>
                </form>
                <div>
                    <button onClick={openModal}><GrEdit /></button>

                    <TestForm modalIsOpen={modalIsOpen} closeModal={closeModal} />
                    <AddProductModal addModalIsOpen={addModalIsOpen} AddCloseModal={AddCloseModal} />

                </div>
            </div>

            <DataTable />
            <CartBottom />


        </div>
    );
};

export default DataInput;