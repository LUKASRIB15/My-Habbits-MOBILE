import { render } from "@testing-library/react-native"
import { ToastMessage } from "./toast-message"

describe("LoadingComponent", ()=>{
  test("The component rendered", ()=>{
    const {getByText} = render(<ToastMessage message="Mensagem de erro" />)
  
    const errorMessage = getByText("Mensagem de erro")

    expect(errorMessage).toBeTruthy()
  })

  test("The message is null", ()=>{
    const {root} = render(<ToastMessage message={undefined}/>)

    expect(root).toBeUndefined()
  })
})