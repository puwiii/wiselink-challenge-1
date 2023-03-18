import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/layout";
import { WalletContext } from "../../../context/walletProvider";
import { useRouter } from "next/router";
import Image from "next/image";

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
      <form>
        <label htmlFor="tipo">Tipo de transacción:</label>
        <select id="tipo" value={tipo} onChange={handleTipoChange}>
          <option value="">-- Seleccione una opción --</option>
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </select>

        <>
          <label htmlFor="options">Seleccionar opción:</label>
          <select id="options" onChange={handleOptionChange}>
            <option value="">-- Seleccione una opción --</option>
            {data.map((option) => {
              if (tipo === "venta") {
                if (activos.some((activo) => activo.id === option.id)) {
                  return (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              }
            })}
          </select>
          <div>
            <label htmlFor="myInput">Introduzca un valor:</label>
            <input
              type="float"
              id="myInput"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <p>El valor introducido es: {cantidad}</p>
          </div>
        </>

        {selectedOption ? (
          <>
            <p>La moneda seleccionada seleccionada es: {selectedOption.name}</p>
            <p>Su valor es: {selectedOption.current_price}</p>

            <Image
              src={selectedOption.image}
              width={30}
              height={30}
              alt="Imagen de la moneda"
            />
            <p>
              El precio total es: ${selectedOption.current_price * cantidad}{" "}
            </p>
            <div>
              <label>
                Ingresa una fecha:
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </label>
              <p>La fecha ingresada es: {fecha}</p>
            </div>
            <button type="button" onClick={handleClick}>
              {editar ? "EDITAR" : "AGREGAR"}
            </button>
          </>
        ) : (
          <>
            <h1>Hola</h1>
          </>
        )}
      </form>

      {cartera?.transacciones?.length > 0 ? (
        <div>
          <ol>
            {cartera.transacciones.reverse().map((transaccion) => (
              <li key={transaccion.idT}>
                <div>
                  <Image
                    src={transaccion.image}
                    height={100}
                    width={100}
                    alt={transaccion.name}
                  />
                  <div>
                    <h3>{transaccion.name}</h3>
                    <p>fecha: {transaccion.fecha}</p>
                    <p>Cantidad: {transaccion.cantidad}</p>
                    <p>Precio: {transaccion.precio}</p>
                    <p>Tipo: {transaccion.tipo}</p>
                    <button
                      onClick={() =>
                        eliminarTransaccion(idToUpdate, transaccion.idT)
                      }
                    >
                      Eliminar
                    </button>
                    <button onClick={() => handleEditar(transaccion)}>
                      editar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p>No hay transacciones en esta cartera.</p>
      )}
    </Layout>
  );
}

export default Transacciones;

export async function getServerSideProps() {
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
