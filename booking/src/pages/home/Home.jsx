import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Navbar from "../../components/navbar/Navbar"
import PropertyList from "../../components/propertyList/PropertyList"
import Special from "../../components/special/Special"
import SpecialProperty from "../../components/specialProperty/SpecialProperty"
import "./home.css"


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        {/* <h1 className="homeTitle">Lưu trú tại các chỗ nghỉ độc đáo hàng đầu</h1> */}
        <Special/>
        <h1 className="homeTitle">Lưu trú tại các chỗ nghỉ độc đáo hàng đầu</h1>
        <PropertyList/>
        <h1 className="homeTitle">Chỗ nghỉ mà khách yêu thích</h1>
        <SpecialProperty/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
