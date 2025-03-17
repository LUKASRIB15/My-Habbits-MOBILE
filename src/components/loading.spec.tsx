import { render } from "@testing-library/react-native"
import { Loading } from "./loading"

describe("LoadingComponent", ()=>{
  test("The component rendered", ()=>{
    const {getByTestId} = render(<Loading />)

    const loadingIndicator = getByTestId("loading-indicator")

    expect(loadingIndicator).toBeTruthy()
  })
})