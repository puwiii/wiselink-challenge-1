import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/walletProvider";
import { useRouter } from "next/router";
import SelectTipo from "../../../components/transaccionesComponents/selectTipo";
import SelectOption from "../../../components/transaccionesComponents/selectOption"
import InputCantidad from "../../../components/transaccionesComponents/inputCantidad";
import FormData from "../../../components/transaccionesComponents/formData";
import ListTransaccion from "../../../components/transaccionesComponents/listTransaccion";
import Layout from "../../../components/layout/layout";
import styles from "../../../styles/transacciones.module.css";

function Transacciones({ data }) {
  const [selectedOption, setSelectedOption] = useState();
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));
  const [tipo, setTipo] = useState("");
  const [editar, setEditar] = useState(false);
  const [idTransaccion, setIdtransaccion] = useState(null);

  console.log(selectedOption)

  const router = useRouter();
  const idToUpdate = parseInt(router.query.id);

  const { carteras, editarCartera, eliminarTransaccion } =
    useContext(WalletContext);
  const cartera = carteras.find((c) => c.id === idToUpdate);
  const activos = cartera ? cartera.activos : [];

  const handleOptionChange = (event) => {
    const selectedOptionName = event.target.value;
    const selectedOption = data.find(
      (option) => option.name === selectedOptionName
    );

    if (tipo === "venta") {
      const filteredOptions = data.filter((option) =>
        activos.some((activo) => activo.id === option.id)
      );
      if (
        filteredOptions.find((option) => option.name === selectedOptionName)
      ) {
        setSelectedOption(selectedOption);
        const activoSeleccionado = activos.find(
          (activo) => activo.id === selectedOption.id
        );
        setCantidad(
          activoSeleccionado ? activoSeleccionado.cantidad.toString() : ""
        );
      } else {
        setSelectedOption(undefined);
        setCantidad("");
      }
    } else {
      setSelectedOption(selectedOption);
    }
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  const handleEditar = (transaccion) => {
    setIdtransaccion(transaccion.idT);
    setCantidad(transaccion.cantidad);
    setFecha(transaccion.fecha);
    setTipo(transaccion.tipo);
    setSelectedOption(data.find((option) => option.id === transaccion.id));
    setEditar(true);
  };

 const handleEliminar = (id) =>{

    const confirmacion = window.confirm(
      `¿Estás seguro de que quieres eliminar la cartera "${cartera.nombre}"?`
    );
    if (confirmacion) {
      eliminarTransaccion(idToUpdate, id)
    }
  };

 

  const handleClick = (e) => {
    e.preventDefault();

    setEditar(false);
    if (selectedOption) {
      const { name, current_price, id, image, symbol } = selectedOption;
      let cantidadActualizada = parseFloat(cantidad);
      if (cantidadActualizada < 0 || isNaN(cantidad)) {
        // se verifica si el valor es negativo
        alert("La cantidad debe ser un número positivo");
        return;
      }
      const updatedOption = {
        name: name,
        symbol: symbol,
        id,
        image: image,
        precio: current_price,
        fecha: fecha,
        cantidad: cantidadActualizada,
        tipo: tipo,
      };
      if (editar) {
        const transaccionActualizada = cartera.transacciones.find(
          (transaccion) => transaccion.idT === idTransaccion
        );
        Object.assign(transaccionActualizada, updatedOption);
        editarCartera(cartera, updatedOption);
      } else {
        updatedOption.idT = undefined;
        if (updatedOption.tipo === "compra") {

          editarCartera(idToUpdate, updatedOption);
        } else if (updatedOption.tipo === "venta") {

          const activoSeleccionado = cartera.activos.find(
            (activo) => activo.id === selectedOption.id
          );
          if (cantidadActualizada > activoSeleccionado.cantidad) {
            alert(
              "La cantidad introducida es mayor que la cantidad actual del activo"
            );
          } else {

            editarCartera(idToUpdate, updatedOption);
          }
        }
      }
    }
  };


  return (
    <Layout>
      <div className="fondo">

          <div className={styles.formContainer}>
            <SelectTipo  tipo={tipo} handleTipoChange={handleTipoChange}/>
            <SelectOption className={styles.select} data={data} tipo={tipo} activos={activos} handleOptionChange={handleOptionChange} selectedOption={selectedOption}/>
            <InputCantidad className={styles.input} cantidad={cantidad} setCantidad={setCantidad}/>
          </div>


          {selectedOption ? (
          <FormData selectedOption={selectedOption} cantidad={cantidad} fecha={fecha} setFecha={setFecha} handleClick={handleClick} editar={editar}/>
          ) : (
            <>
              <p>Seleccione una moneda</p>
            </>
          )}


        {cartera?.transacciones?.length > 0 ? (
          <ListTransaccion cartera={cartera} handleEditar={handleEditar} handleEliminar={handleEliminar}/>
        ) : (
          <p>No hay transacciones en esta cartera.</p>
        )}

      </div>
    </Layout>
  );
}

export default Transacciones;

export async function getStaticProps() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}