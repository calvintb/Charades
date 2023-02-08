import axios from "axios";

let words = {};

function cardgrab () {
    axios.get("http://localhost:8000/api/cards/")
    .then((res => {
        words = res.data
        return res.data;
      }));


}
export default words;
