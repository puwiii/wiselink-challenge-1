import { useEffect, useState } from "react";
import React from "react";

export const WalletContext = React.createContext();

export const WalletProvider = ({ children }) => {
  const carterasLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carteras")) ?? []
      : [];
  const [carteras, setCarteras] = useState(carterasLS);
  const [paginaLista, setPaginaLista] = useState(false);

  useEffect(() => {
    setPaginaLista(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("carteras", JSON.stringify(carteras));
  }, [carteras]);

  const editarNombreCartera = (id, nombre) => {
    const carterasActualizado = carteras.map((cartera) => {
      if (cartera.id === id) {
        return { ...cartera, nombre: nombre };
      } else {
        return cartera;
      }
    });
    setCarteras(carterasActualizado);
    localStorage.setItem("carteras", JSON.stringify(carterasActualizado));
  };

  const agregarCartera = (cartera) => {
    if (
      cartera &&
      carteras.some((carteraState) => carteraState.id === cartera.id)
    ) {
      const carterasActualizado = carteras.map((carteraState) => {
        if (carteraState.id === cartera.id) {
          return { ...carteraState, cantidad: cartera.cantidad };
        }
        return carteraState;
      });
      setCarteras(carterasActualizado);
      localStorage.setItem("carteras", JSON.stringify(carterasActualizado));
    } else {
      setCarteras([...carteras, cartera]);
      localStorage.setItem("carteras", JSON.stringify([...carteras, cartera]));
    }
  };

  const eliminarCartera = (id) => {
    const carterasActualizado = carteras.filter((cartera) => cartera.id !== id);
    setCarteras(carterasActualizado);
    localStorage.setItem("carteras", JSON.stringify(carterasActualizado));
  };



  const compararCantidad = (a, b) => b.cantidad - a.cantidad;

  const agregarOActualizarActivo = (cartera, transaccion, tipo) => {
    const activoExistente = cartera.activos.find(
      (activo) => activo.id === transaccion.id
    );
    let activosActualizados;
    if (activoExistente) {
      // Si el activo ya existe en la cartera actualizao su cantidad
      activosActualizados = cartera.activos
        .map((activo) => {
          if (activo.id === transaccion.id) {
            const nuevaCantidad =
              tipo === "compra"
                ? activo.cantidad + transaccion.cantidad
                : activo.cantidad - transaccion.cantidad;
            if (nuevaCantidad === 0) {
              // Si la cantidad del activo es 0 lo elimino
              return null;
            } else {
              return {
                ...activo,
                cantidad: nuevaCantidad,
              };
            }
          } else {
            return activo;
          }
        })
        .filter((activo) => activo !== null)
        .sort(compararCantidad);
    } else {
      // Si el activo no existe en la cartera lo agrego
      activosActualizados = [
        ...cartera.activos,
        {
          nombre: transaccion.name,
          symbol: transaccion.symbol,
          id: transaccion.id,
          image: transaccion.image,
          cantidad:
            tipo === "compra" ? transaccion.cantidad : -transaccion.cantidad,
          precio: transaccion.precio,
        },
      ].sort(compararCantidad);
    }
    return activosActualizados;
  };

  const editarCartera = (id, transaccion) => {
    const carterasActualizado = carteras.map((cartera) => {
      if (cartera.id === id) {
        const transaccionExistente = cartera.transacciones.find(t => t.idT === transaccion.idT);
        if (transaccionExistente) {
          const transaccionesActualizadas = cartera.transacciones.map(t => {
            if (t.idT === transaccion.idT) {
              return {
                ...t,
                name: transaccion.name,
                cantidad: transaccion.cantidad,
                precio: transaccion.precio,
                fecha: transaccion.fecha,
                tipo: transaccion.tipo,
                image: transaccion.image,
              };
            } else {
              return t;
            }
          });
          const activosActualizados = agregarOActualizarActivo(
            cartera,
            transaccionExistente,
            transaccionExistente.tipo

          );
          console.log(activosActualizados)
          return {
            ...cartera,
            activos: activosActualizados,
            transacciones: transaccionesActualizadas,
          };
        } else {
          const nuevaTransaccion = {
            id: transaccion.id,
            idT: Math.random().toString(36).substr(2, 18),
            name: transaccion.name,
            cantidad: transaccion.cantidad,
            precio: transaccion.precio,
            fecha: transaccion.fecha,
            tipo: transaccion.tipo,
            image: transaccion.image,
            symbol: transaccion.symbol,
          };
          const activosActualizados = agregarOActualizarActivo(
            cartera,
            nuevaTransaccion,
            nuevaTransaccion.tipo
          );
          const transaccionesActualizadas = [
            ...cartera.transacciones,
            nuevaTransaccion,
          ];
          return {
            ...cartera,
            activos: activosActualizados,
            transacciones: transaccionesActualizadas,
          };
        }
      } else {
        return cartera;
      }
    });
    setCarteras(carterasActualizado);
    localStorage.setItem("carteras", JSON.stringify(carterasActualizado));
  };

  function eliminarTransaccion(carteraId, idT) {
    const carteraIndex = carteras.findIndex((c) => c.id === carteraId);
  
    if (carteraIndex === -1) {
      console.log(`No se encontró la cartera con id ${carteraId}`);
      return;
    }
  
    const cartera = carteras[carteraIndex];
    const transaccionIndex = cartera.transacciones.findIndex(
      (t) => t.idT === idT
    );
  
    if (transaccionIndex === -1) {
      console.log(
        `No se encontró la transacción con id ${idT} en la cartera con id ${carteraId}`
      );
      return;
    }
  
    const transaccion = cartera.transacciones[transaccionIndex];
    const activoIndex = cartera.activos.findIndex(
      (a) => a.id === transaccion.id
    );
  
    if (activoIndex === -1) {
      console.log(
        `No se encontró el activo con id ${transaccion.id} en la cartera con id ${carteraId}`
      );
      return;
    }
  
    const activo = cartera.activos[activoIndex];
  
    if (transaccion.tipo === "compra") {
      activo.cantidad -= transaccion.cantidad;
    } else if (transaccion.tipo === "venta") {
      activo.cantidad += transaccion.cantidad;
    }
  
    if (activo.cantidad === 0) {
      cartera.activos.splice(activoIndex, 1);
      console.log(
        `Activo con id ${activo.id} eliminado de la cartera con id ${carteraId}`
      );
    }
  
    cartera.transacciones.splice(transaccionIndex, 1);
    console.log(
      `Transacción con id ${idT} eliminada de la cartera con id ${carteraId}`
    );
  
    carteras[carteraIndex] = cartera;
    localStorage.setItem('carteras', JSON.stringify(carteras));
  }

  console.log(carteras)
  

  return paginaLista ? (
    <WalletContext.Provider
      value={{
        carteras,
        setCarteras,
        agregarCartera,
        eliminarCartera,
        editarCartera,
        editarNombreCartera,
        eliminarTransaccion,
      }}
    >
      {children}
    </WalletContext.Provider>
  ) : null;
};
