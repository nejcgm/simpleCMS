import { Outlet } from "react-router-dom"
import Navbar from "../templates/found_nav"   
import Frame from "./frame"
import Footer from "../templates/footer"
const Mainlayout = () => {
    return (
      <>
      <Navbar />
      <Frame>
      <Outlet />
      </Frame>
      <Footer />
      </>
    )
  }
  
  export default Mainlayout