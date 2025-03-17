import {render} from "@testing-library/react-native"
import { Button } from "./button"
import { Envelope } from "phosphor-react-native"

describe("ButtonComponent", ()=>{
  test("the component rendered with title and icon", ()=>{
    const {getByTestId, getByText} = render(
      <Button>
        <Button.Icon icon={Envelope}/>
        <Button.Title>Acessar painel</Button.Title>
      </Button>
    )

    const buttonTitle = getByText("Acessar painel")
    const buttonIcon = getByTestId("button-icon")

    expect(buttonTitle).toBeTruthy()
    expect(buttonIcon).toBeTruthy()
  })

  test("the component in loading state", () => {
    const {getByTestId} = render(
      <Button isLoading>
        <Button.Title>Acessar painel</Button.Title>
      </Button>
    )

    const loadingIndicator = getByTestId("loading-indicator")

    expect(loadingIndicator).toBeTruthy()

  })
})