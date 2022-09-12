import Header from "@/components/Header"
import Footer from "@/components/Footer"

type ContainerProps = {
  children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div tw="font-base">
      <Header />
      <div tw="flex">{children}</div>
      <Footer />
    </div>
  )
}

export default Container
