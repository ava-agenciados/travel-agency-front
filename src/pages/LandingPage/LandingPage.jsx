import NavBar from "../../components/Navbar/NavBar";
import HeroSection from "./components/HeroSection";
import DayOffers from "./components/DayOffers"
import BannerPackage from "./components/BannerPackage";
import DiscountBanner from "./components/DiscountBanner";
import RegionalDiscountBanner from "./components/RegionalDiscountBanner";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
    return <>
        <NavBar/>

        <HeroSection/>

        <DayOffers/>

        <BannerPackage/>

        <DiscountBanner/>

        <RegionalDiscountBanner/>

        <Footer/>
    </>
}

export default LandingPage;