const TYPES = require("tedious").TYPES;
const moment = require("moment");

let parametrizacion = (data) => {
  console.log(data)
  try {
    let obj = {
      table: [],
    };
    data.forEach((dato) => {
      let nombre = dato.item;
      let valor = dato.datos.valor;
      let tipo = dato.datos.tipo;
      console.log(nombre, valor, tipo)
      if (tipo == "varchar") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.VarChar });
      } else if (tipo == "int") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Int });
      } else if (tipo == "bit") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Bit });
      } else if (tipo == "date") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Date });
      } else if (tipo == "time") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Time });
      } else if (tipo == "char") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Char });
      } else if (tipo == "bigint") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.BigInt });
      }
    });
    return obj.table;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.parametros = (req, tipo) => {
  switch (tipo) {
    case "spInsertCentral":
      return parametrizacion([
        { item: "central", datos: { valor: req.central, tipo: "varchar" } },
        { item: "mercado", datos: { valor: req.mercado, tipo: "varchar" } },
        { item: "pais", datos: { valor: req.pais, tipo: "varchar" } },
      ]);
    case "spUpdateCentral":
      return parametrizacion([
        { item: "id", datos: { valor: req.id, tipo: "int" } },
        { item: "central", datos: { valor: req.central, tipo: "varchar" } },
        { item: "mercado", datos: { valor: req.mercado, tipo: "varchar" } },
        { item: "pais", datos: { valor: req.pais, tipo: "varchar" } },
      ]);
    case "spDeleteCentral":
      return parametrizacion([
        { item: "id", datos: { valor: req.id, tipo: "int" } },
      ]);
    case "spHealthCheck":
      return parametrizacion([
        { item: "form_data", datos: { valor: req.form_data, tipo: "varchar" } },
      ]);

    default:
      break;
  }
  var size = Object.keys(req.body).length;
  if (size == 0) {
    return [];
  }
};
