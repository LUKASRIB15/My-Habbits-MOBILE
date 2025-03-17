import { act, fireEvent, render } from "@testing-library/react-native"
import { Input } from "./input"
import { Envelope } from "phosphor-react-native"

describe("InputComponent", ()=>{
  test("The component rendered", ()=>{
    const {getByTestId, getByPlaceholderText} = render(<Input icon={Envelope} placeholder="E-mail"/>)

    const inputPlaceholder = getByPlaceholderText("E-mail")
    const inputIcon = getByTestId("input-icon")

    expect(inputPlaceholder).toBeTruthy()
    expect(inputIcon).toBeTruthy()
  })

  test("The component in error state", ()=>{
    const {getByTestId} = render(<Input icon={Envelope} placeholder="E-mail" errorMessage="E-mail inválido" />)

    const errorMessageInput = getByTestId("message-error-text")
    const inputContainer = getByTestId("input-container")

    expect(errorMessageInput).toBeTruthy()
    expect(inputContainer.props.className).toContain("border-red-500")
  })

  test("The component in focus and blur state", ()=>{

    const {getByTestId} = render(<Input icon={Envelope} placeholder="E-mail"/>)
    const input = getByTestId("input")
    const inputContainer = getByTestId("input-container")

   
    fireEvent(input, "focus")
    expect(inputContainer.props.className).toContain("border-blue-600")

    fireEvent(input, "blur")
    expect(inputContainer.props.className).not.toContain("border-blue-600")
  })
})