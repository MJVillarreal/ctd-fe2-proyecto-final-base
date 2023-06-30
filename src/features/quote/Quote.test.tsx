import { screen } from "@testing-library/react";
import { render } from "../../test-utils";
import { server } from "../../mocks/server";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Cita", () => {
  it("Se renderiza el componente Cita", () => {
    render(<Cita />);

    expect(screen.getByText("No se encontro ninguna cita")).toBeTruthy();
    expect(
      screen.getByPlaceholderText("Ingresa el nombre del autor")
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Obtener cita aleatoria" })
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Borrar" })).toBeTruthy();
  });



  it("Se debe renderizar una cita aleatoria", async () => {
    render(<Cita />);

    const btnCitaAleatoria = screen.getByRole("button", {
      name: "Obtener cita aleatoria",
    });
    userEvent.click(btnCitaAleatoria);

    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
    expect(await screen.findByText("Homer Simpson")).toBeInTheDocument();
    expect(await screen.findByText("Gah, stupid sexy Flanders!")
    ).toBeInTheDocument();
  });



  it("Se debe renderizar una cita del autor buscado", async () => {
    render(<Cita />);

    await userEvent.type(screen.getByRole("textbox"), "Bart Simpson");

    const btnBuscarCita = screen.getByRole("button", { name: "Obtener Cita" });
    userEvent.click(btnBuscarCita);

    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
    expect(await screen.findByText("Bart Simpson")).toBeInTheDocument();
    expect(await screen.findByText("Eat my shorts")).toBeInTheDocument();
  });




  it("Se debe renderizar un mensaje de error al ingresar un numero en el input de autor", async () => {
    render(<Cita />);

    await userEvent.type(screen.getByRole("textbox"), "1");

    const btnBuscarCita = screen.getByRole("button", { name: "Obtener Cita" });
    userEvent.click(btnBuscarCita);

    expect(
      await screen.findByText("Por favor ingrese un nombre válido")
    ).toBeInTheDocument();
  });




  it("Se debe borrar la cita y el input se debe vaciar al apretar el boton Borrar", async () =>{
    render(<Cita />);
     
    await userEvent.type(screen.getByRole("textbox"), "Bart Simpson");

    const btnBuscarCita = screen.getByRole("button", { name: "Obtener Cita" });
    userEvent.click(btnBuscarCita);

    expect(await screen.findByText("Eat my shorts")).toBeInTheDocument();

    const btnBorrar = screen.getByRole("button", {name: "Borrar"});
    userEvent.click(btnBorrar);

    expect( await screen.findByText("No se encontro ninguna cita")).toBeTruthy();
    expect( screen.getAllByPlaceholderText("Ingresa el nombre del autor")
    ).toBeTruthy();
  });



  
  it("Se debe renderizar una cita aleatoria al ingresar solo espacios en el input y darle al boton Obtener Cita", async () =>{
    render(<Cita />);

    await userEvent.type(screen.getByRole("textbox"), "    ");

    const btnBuscarCita = screen.getByRole("button", { name: "Obtener Cita" });
    userEvent.click(btnBuscarCita);

    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
    expect(await screen.findByText("Homer Simpson")).toBeInTheDocument();
    expect(
       await screen.findByText("Gah, stupid sexy Flanders!")
    ).toBeInTheDocument();
  });
});
