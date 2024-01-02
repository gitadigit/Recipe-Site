import { useSelector } from "react-redux";
import '../style.css'
const HomePage = () => {

  const userName = useSelector(state => state?.user.Name);

  return <div style={{color:"white"}}>
   
   {<h1 > Hello {userName} WellCome</h1>} 
   
   <br></br>
   <br></br>


   <h4>הגעתם לאתר המתכונים בו תוכלו  לגלות מתכונים חדשים </h4>
   <h4>תוכלו להוסיף או למחוק מתכון </h4>

  </div>

}
export default HomePage;