import { useEffect } from "react";
import { useMyContext } from "../context/MyContext";

import AOS from 'aos';
import 'aos/dist/aos.css';


function Section1(){
    const { isLogin, setIsLogin } = useMyContext();
    const { isAdmin, setIsAdmin } = useMyContext();
    const {tusername, setTUsername} = useMyContext();
  
  
  
    useEffect(() => {
        AOS.init();
      // alert('gfhfdh')setTUsername(localStorage.getItem('username'))
      setTUsername(localStorage.getItem('username'))
  
  
      if (localStorage.getItem('islogin') === null || localStorage.getItem('islogin') === undefined || localStorage.getItem('islogin') === "undefined") {
        setIsLogin(0);
    } else {
        setIsLogin(localStorage.getItem('islogin'));
    }
    if (localStorage.getItem('isadmin') === null || localStorage.getItem('isadmin') === undefined || localStorage.getItem('isadmin') === "undefined") {
      setIsAdmin(0);
  } else {
      setIsAdmin(localStorage.getItem('isadmin'));
  }
    }, [])

return(

<section>
<div class="container mt-5">

<div class="row align-items-center">

    <div class="col-md-6"
     >
        <h4  class="fw-normal"
        data-aos="fade-right"
        data-aos-delay="300"
        > Improve the world ! </h4>
        <h4  class="fw-normal text-primary mt-4"
        data-aos="fade-left"
        data-aos-delay="500"
        >Karma.io </h4>
            <p class="mt-4"
            data-aos="fade-right"
            data-aos-delay="700"
            >
            Is a system that allows users to improve the world (fighting climate change, ending wars, and the like). The system is built on the idea that users can post new ideas about how to improve the world
               
            </p>
            {isLogin ? (
                <div data-aos="fade-right"
                data-aos-delay="900">
                <a class="btn btn-info"  href="/addidea">Add Idea</a>
            <a class="btn btn-outline-secondary ms-3">View Ideas</a>
            </div>
            ):(<>
              <a
              data-aos="fade-right"
              data-aos-delay="1200"
              class="btn btn-info" href="/login">Login to View/Add idea</a>
            </>)}
            
    </div>
    <div class="col-md-6" data-aos="fade-up"
    data-aos-delay="1500">
       <img   class="img-fluid mx-auto d-block  mt-5 mt-md-0" src="./img/hero-img.svg"/>
</div>

</div>
</div>

</section>

)



}

export default Section1;