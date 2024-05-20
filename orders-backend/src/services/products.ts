import axios from "axios";
import config from "../config/config";

const checkProductAvailability = async (product_id: number, quantity: number) => {
  const res = await axios
    .get(`${config.url_product_services}/products/check-availability`, {
      params: { product_id, quantity },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  return res
}

export default { checkProductAvailability }